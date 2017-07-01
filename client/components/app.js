angular.module('work-orders')

.controller('AppCtrl', function($http) {

  var app = this;
  app.completeWorkOrders = 0;
  app.inProgressWorkOrders = 0;

// hides logged in content and only display signup/login
  app.isContentHidden = true;

  this.getWorkOrders = function () {
    $http.get('/get-orders')
    .then(function(res) {
      app.workOrders = res.data;

      //Create a count of complete and in progress orders
      var complete = 0;
      var inProgress = 0;
      app.workOrders.forEach( function (val,ind,arr) {
        console.log('val in forEach', val);
        if (val.is_done) {
          complete++;
        } else {
          inProgress++;
        }
      });
      app.completeWorkOrders = complete;
      app.inProgressWorkOrders = inProgress;
    });
  }.bind(this);
  //call immediately to get data on load
  app.getWorkOrders();



  this.updateWorkOrder = function (form) {
    var reqBody = angular.copy(form);
    $http.put('/update-order', reqBody).
    then(function(res) {
      console.log(res);
      app.getWorkOrders();
    });
  };

  this.deleteWorkOrder = function (order) {
    var reqBody = angular.copy(form);
    $http.delete('/delete-order')
    .then(function(res) {
      console.log(res);
      app.getWorkOrders();
    });
  };

  this.userSignUp = function (user) {
    var reqBody = angular.copy(form);
    $http.post('/user-signup');
  };

})

.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
});
