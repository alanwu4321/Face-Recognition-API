var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
var uploadRouter = require('./routes/upload');
var usersRouter = require('./routes/users');
var nunjucks = require('nunjucks');
var app = express();


nunjucks.configure('views', { autoescape: true,express: app });
app.use(bodyParser.json({limit: '150mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','nunjucks');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', uploadRouter);
app.use('/users', usersRouter);

app.get('/', function (req, res, next) {
  
  res.status(200).json({"status":"success"})
  // res.render('index.html', { title: 'Express' });
});


module.exports = app;
