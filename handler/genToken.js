const jwt = require('jsonwebtoken');
var config = require('config');

module.exports.generateToken = async function (user) {
    const token = jwt.sign({
        data: {
            _id: user._id,
            name: user.name,
            proPic: user.proPic,
            email: user.email
        }
    }, config.get('App.SECRET_CODE'),
        {
            expiresIn: config.get('App.TokenExpiresIn')
        }
    );
}

module.exports.verifyToken = async function (token) {
    if (!token) {
        const error = new TypeError('Token Should Not be empty');
        throw error;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, config.get('App.SECRET_CODE'), (error, decodedToken) => {
            if (error) {
                error.status = 401;
                reject(error);
            }
            else {
                resolve(decodedToken);
            }
        })
    })
}