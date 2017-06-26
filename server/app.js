var express = require('express');
var bodyParser = require('body-parser');
var handleErrors = require('error-handler');

var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', 8080);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(express.static(path.join(__dirname, 'server')));

// var env = process.env.NODE_ENV || 'development';

// // development only
// if (env === 'development') {
//   app.use(express.errorHandler());
// }

// // production only
// if (env === 'production') {
//   // TODO
// }


/**
 * Routes
 */
// JSON API


app.get('/', api.root);  // client root

app.post('/user-signup', api.userSignUp); // creates an admin user, mvp doesn't have other user roles yet
app.post('/user-signin', api.userSignIn); // user login end point
app.post('/create-order', api.createOrder); // when a create order request is made
app.put('/update-order', api.updateOrder); // when an order is updated
app.put('/complete-order', api.completeOrder); // when an order is completed
app.delete('/delete-order', api.deleteOrder);// when an order is deleted


app.get('*', api.root); // redirect all others to the site root




/**
 * Start Server
 */
 //log date to show at server restarts
console.log(Date());

http.createServer(app).listen(app.get('port'), function (req, res) {
  console.log('Express server listening on port ' + app.get('port'));
  //add basic default error handling for all requests/ res
  handleErrors(req, res, errorHandler);
});
