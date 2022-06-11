const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const {auth} = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const {initializeDatabase} = require('./config/database');

require('./config/handlebars')(app);

app.use(cookieParser());

app.use('/static', express.static('public'));

app.use(bodyParser.json());

app.use(express.urlencoded({extended: false}));

app.use(auth);  

app.use(routes);

initializeDatabase()
    .then(() => {
        app.listen(5000, () => console.log('App is listening on port 5000...'));
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('Cannot connect to DB: ', err);
    });