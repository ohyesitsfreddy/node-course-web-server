const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
// Set View Engine
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maitenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

// Handlebar Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Handlebar Helpers
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

// Create a route -> /bad send back json with errorMessage 
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Site not found!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
