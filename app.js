const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const session = require('express-session')

require('./config/auth')(passport);

const indexRouter = require('./routes/index');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30 * 60 * 1000},
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

app.use('/', indexRouter);

module.exports = app;
