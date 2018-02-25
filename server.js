require('dotenv').config();
var express = require('express');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
let session=require('express-session');
let MongoStore=require('connect-mongo')(session);


var port = process.env.PORT || 3001;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/QSapien", { useMongoClient: true });
let db=mongoose.Connection;
app.use(session({
    secret:process.env.SESSION_SECRET||'qsapien_session_secret',
    resave:false,
    saveUninitialized:true,
    store:MongoStore({mongooseConnection:db});
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.listen(port, function () {
    chalk.green(console.log("server is listening at PORT: " + port));
});