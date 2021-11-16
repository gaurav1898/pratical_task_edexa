const mongoose = require('mongoose');

// Mongoose Config

mongoose.connect('mongodb://localhost:27017/tip_manager', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully to Tip Manager");
}).catch(err => {
    console.log("Some error occured", err);
});
