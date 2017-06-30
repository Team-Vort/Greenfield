angular.module('work-orders')


.controller('WorkOrderFeedCtrl', function($scope, $http, dataHandler) {
  $scope.orders;
  this.currentOrder;

  this.show = false;
  this.expandOrder = function(order){
    dataHandler.setOrderInfo(order);
    this.show = !this.show;
    console.log($scope.orders)
  }

  this.toggle = function() {
    this.show = !this.show;
  }
  .bind(this);
  var app = this;

  this.getWorkOrders = function () {
    // console.log("in get work orders")
    $http.get('/get-orders')
    .then(function(res) {
      app.workOrders = res.data;
      $scope.orders = app.workOrders;
      console.log(res.data);
    });
  }.bind(this);
  this.getWorkOrders();

  this.testFunc = function() {
    console.log("TESTTESTTESTTEST");
  }

  this.createWorkOrder = (e) => {
    console.log('$ctrl model binds for work-order submit: ', this.woJobDetails, this.woEstimatedDuration, this.woClientName, this.woPhotoUrl);

    //create the current date for created_at
    var currentDate = new Date();

    var dateStr = currentDate.getFullYear() + '/' + currentDate.getMonth() + '/' + currentDate.getDate() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    var queryObj = {
      notes: '',
      job_info: this.woJobDetails,
      created_at: dateStr,
      is_done: false,
      duration: this.woEstimatedDuration,
      client: this.woClientName, //make schema use string not ID (don't need clients table?)
      photo: this.woPhotoUrl,
    };

    console.log(queryObj);

    //send HTTP POST to server to create new W.O.
    $http({
      method: 'POST',
      url: '/create-order',
      data: queryObj
    })
      .then(function successCallback(res) {
        console.log(res);
      }, function errorCallback(res) {
        console.log('error creating new order!');
      });
  };

})

.component('workOrderFeed', {
  controller: 'WorkOrderFeedCtrl',
  templateUrl: '../templates/workOrderFeed.html'
});