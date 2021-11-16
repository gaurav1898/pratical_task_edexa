const tokenServe = require('./genToken');

module.exports = function permits(...roles) {

    return async (req, res, next) => {
        const reqRole = roles;
        const finalToken = (req.headers.authorization || req.headers.Authorization || '').split('JWT ').pop();

        const reqToken = finalToken.replace('"', '');
        console.log(reqToken);

        //If token not exist Unauthorized error

        if (!reqToken) {
            return next(
                res.status(401).json({
                    status: false,
                    message: "unauthorized access"
                })
            )
        }

        try {
            const decodedToken = await tokenServe.verifyToken(reqToken);
            req.tokenData = decodedToken;
            const userRoles = decodedToken.data.roles;
            console.log(userRoles);

            const intersection = reqRole.filter(element => userRoles.includes(element));
            if (intersection > -1) {
                return next(
                    res.json({
                        message: "You are not authorized"
                    })
                )
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}