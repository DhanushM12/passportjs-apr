require('dotenv').config()

const express = require('express');
const port = 8000;
const app = express();
const passport = require('passport')
const bcrypt = require('bcrypt')
const session = require('express-session')
const users = [];

const initialize = require('./config/passportLocal');
initialize(passport, 
    email => users.find(user => user.email == email),
    id => users.find(user => user.id == id)
    );

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

passport.use(passport.initialize());
passport.use(passport.session());

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "april22"})
})


app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
        return;
    }
    console.log(`Server is up and running on port: ${port}`)

})