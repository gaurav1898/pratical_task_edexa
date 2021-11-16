const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

//Connecting to DB
require('./handler/db');

const app = express();


const PORT = config.get('App.PORT') || 5000;

app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());
app.use('/api', require('./routes'));
app.listen(PORT, () => {
    console.log("Server Started on PORT " + PORT);

})