/*
 * Serve JSON to our AngularJS client
 */

var fileToServe = require('../utility/paths');
var dbHelpers = require('../utility/dbquery');


exports.userSignUp = (req, res) => {

  dbHelpers.addUser(req.body, (user) => {
    res.send(user);
  });


};

exports.userSignIn = (req, res) => {
  dbHelpers.getUser(req.body, (user) => {
    res.send(user);
  });

};

exports.createOrder = (req, res) => {
  dbHelpers.createOrder(req.body, (order) => {
    res.send(order);
  });

};

exports.updateOrder = (req, res) => {
  console.log("inside updateOrder in api ", req.body);
  dbHelpers.updateOrder(req.body, (order) => {
    res.send(order);
  });

};

exports.getOrders = (req, res) => {
  dbHelpers.getOrders((orders) => {
    res.send(orders);
  });
};

exports.getOrdersSelective = (req, res) => {
  var isDone = (req.params.isDone === '1') ? 1 : 0;
  dbHelpers.getOrdersSelective({is_done: isDone}, (orders) => {
    res.send(orders);
  });
};

exports.getOrdersUsername = (req, res) => {
  var username = req.params.username;
  dbHelpers.getOrdersUsername({username: username}, (orders) => {
    res.send(orders);
  });
};

exports.deleteOrder = (req, res) => {
  dbHelpers.deleteOrder(req.body, (order) => {
    res.send(order);
  });

};


