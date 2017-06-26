/*
 * Serve JSON to our AngularJS client
 */

var fileToServe = require('./../utility/paths');
var dbHelpers = require('./../utility/dbHelpersquery');

exports.root = (req, res) => {
    res.status(200).send( fileToServe.paths.root );
};

exports.userSignUp = (req, res) => {
    var user = dbHelpers.addUser(req.body);
    res.send(user);
};

exports.userSignIn = (req, res) => {
    var user = dbHelpers.getUser(req.body);
    res.send(user);
};

exports.createOrder = (req, res) => {
    var order = dbHelpers.createOrder(req.body);
    res.send(order);
};

exports.updateOrder = (req, res) => {
    var updatedOrder = dbHelpers.updateOrder(req.body);
    res.send(updatedOrder);
};

exports.completeOrder = (req, res) => {
    var completedOrder = dbHelpers.completeOrder(req.body);
    res.send(completedOrder);
};

exports.deleteOrder = (req, res) => {
    var deletedOrder = dbHelpers.deleteOrder(req.body);
    res.send(deletedOrder);
};


