const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const database = require('./models/database');
const mainController = require('./controllers/mainController');

const app = express();

app.set('view engine', 'ejs');


// Set up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'access-request-form', resave: false, saveUninitialized: true }));



// Set up routes
app.get('/', mainController.getMainPage);
app.get('/skyward', mainController.getSkywardForm);
app.post('/skyward', mainController.postSkywardForm);
app.post('/skyward/save', mainController.postSaveAndExit);
app.get('/confirmation', mainController.getConfirmation);
app.get('/status', mainController.getRequestStatus);

// Set up database
database.connectDB();

// Start the server
const port = 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
