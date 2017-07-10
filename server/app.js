var express = require('express');
var bodyParser = require('body-parser');
//var handleErrors = require('error-handler'); // to do, implement error handling

var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = module.exports = express();

var sms = require('./routes/send-sms');

// Configuration

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('../client')); //serve static content from client

//API routes

app.get('/', function(req, res) {
  res.status(200).end();
});  // client root

app.post('/user-signup', api.userSignUp); // creates an admin user, mvp doesn't have other user roles yet
app.post('/user-signin', api.userSignIn); // user login end point
app.post('/create-order', api.createOrder); // when a create order request is made
app.put('/update-order', api.updateOrder); // when an order is updated
app.delete('/delete-order/:id', api.deleteOrder);// when an order is deleted
app.get('/get-orders', api.getOrders);
app.get('/get-unclaimed', api.getUnclaimed);
app.get('/get-completed/:phone', api.getCompleted);
app.get('/get-my-created/:userName', api.getMyCreated);
app.get('/get-my-in-progress/:phone', api.getMyInProgress);
app.get('/get-orders-username/:username', api.getOrdersUsername);

// new GET to get User data on Accept Work Order click
app.get('/get-user-info/:username', api.getUser);

app.put('/update-user', api.updateUser);//can update photo url or any other user data

app.get('/all-users', api.getAll); //testing purposes only

// SMS routes
app.post('/sms', function(req, res) {
  // send phone number and job status
  // console.log('req.body', req.body);
  sms.sms(req.body);

  // res.send(req.body.id);
  // res.end();
});

app.post('/message', function(req, res) {
  console.log(req.body);
  sms.message(req.body, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      res.send(`
      <Response>
        <Message>
          -\n\nWork Order: ${data.job_info} (Order#: ${data.id}) was successfully closed.
        </Message>
      </Response>
      `);
    }
  });
});

console.log(Date()); // log date when server restarts
// Start server
http.createServer(app).listen(app.get('port'), function (req, res) {
  console.log('Express server listening on port ' + app.get('port'));
//to do - error handling
});
;