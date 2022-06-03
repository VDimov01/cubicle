const express = require('express');
const app = express();
const routes = require('./routes');
const {initializeDatabase} = require('./config/database');

require('./config/handlebars')(app);

app.use('/static', express.static('public'));

app.use(express.urlencoded({extended: false}));


app.use(routes);

initializeDatabase()
    .then(() => {
        app.listen(5000, () => console.log('App is listening on port 5000...'));
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('Cannot connect to DB: ', err);
    });