var createError = require('http-errors');

var express = require('express');
var bodyParser=require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
config = require('./DB');

var categoryRoute=require('./routes/categories.route')

//var indexRouter = require('./routes/users/users.routes');
var app = express();
mongoose.connect('mongodb://localhost/Todo', {useNewUrlParser: true,  useUnifiedTopology: true}).then(result=>{
  console.log('DB Is Connected');
}).catch(err=>{
  console.log(err);
})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);
app.use('/category',categoryRoute)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
