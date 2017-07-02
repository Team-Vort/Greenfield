var express = require('express');
var bodyParser = require('body-parser');
//var handleErrors = require('error-handler');

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

app.use(express.static('../client'));

//basic error handler fn
// function errorHandler (req, res, err) {
//     console.log(err);
//     res.writeHead(500).send();
// };



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

// exports.root = (req, res) => {
//   app.use(express.static('../client'))
//   res.status(200).send( fileToServe.paths.root );
// };


app.get('/', function(req, res) {
  res.status(200).end();
});  // client root

app.post('/user-signup', api.userSignUp); // creates an admin user, mvp doesn't have other user roles yet
app.post('/user-signin', api.userSignIn); // user login end point
app.post('/create-order', api.createOrder); // when a create order request is made
app.put('/update-order', api.updateOrder); // when an order is updated
app.delete('/delete-order/:id', api.deleteOrder);// when an order is deleted
app.get('/get-orders', api.getOrders);
app.get('/get-orders-selective/:isDone', api.getOrdersSelective);
app.get('get-orders-username/:username', api.getOrdersUsername);
app.put('/update-user', api.updateUser);//can update photo url or any other user data

app.get('/all-users', api.getAll); //testing purposes only

// app.get('*', api.root); // redirect all others to the site root




/**
 * Start Server
 */
 //log date to show at server restarts
console.log(Date());

http.createServer(app).listen(app.get('port'), function (req, res) {
  console.log('Express server listening on port ' + app.get('port'));
  //add basic default error handling for all requests/ res
  //handleErrors(req, res, errorHandler);
});
