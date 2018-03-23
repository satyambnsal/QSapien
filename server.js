require('dotenv').config();

var express = require('express');
var chalk = require('chalk');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let userRoute = require('./server/routes/user');
let { challengeHandler } = require('./server/sockethandler');
let io = require('socket.io');
var app = express();
let server = require('http').createServer(app);
io = io.listen(server);

var port = process.env.SERVER_PORT || 3001;
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/QSapien";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });
let db = mongoose.connection;
app.use(session({
    secret: process.env.SESSION_SECRET || 'qsapien_session_secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/user', userRoute);


io.on('connection', (socket) => {
    console.log('connection is open');
    console.log('socket id::' + socket.id);
    socket.on('sendChallenge', values => {
        challengeHandler(values, (response) => {
            console.log('response::' + response.message);
        });
    })
})

server.listen(port, function () {
    chalk.green(console.log("server is listening at PORT: " + port));
});