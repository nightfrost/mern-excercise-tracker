//Libraries, from top to bottom: Express, web framework. Cors, ressource sharing. Mongoose, connect/administer mongoDB.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//ENV file for ports etc.
require('dotenv').config();

//Create Express application - get PORT
const app = express();
const port = process.env.PORT || 5000;

//Attach middleware (Cross-origin Ressource sharing + Json)
app.use(cors());
app.use(express.json());

//Open connection to database with Mongoose, using DOTENV ATLAS_URI. The driver was re-written or something like that, use the newURL parser. Automatic Index true.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
//Test the connection, log if good.
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

//import/require exercises and users routes, from routes.
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Make the Express app use the routes.
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//Start the server/Passive listen to port.
app.listen(port, () => {
    console.log('server is running on port: ${port}');
});