angular.module('work-orders')


.controller('WorkOrderFeedCtrl', function($http, dataHandler, loginService) {
  this.currentOrder;
  var curUser = loginService.getCurrentUser();

  //Used to show the expanded work order view
  this.show = false;

  //Used to show error text if invalid fields were entered
  this.invalidFields = false;

  var workOrderFeed = this;

  this.expandOrder = function(order, index){
    dataHandler.setOrderInfo(order, index);
    this.show = !this.show;
  }

  this.toggle = function() {
    this.show = !this.show;
  }
  .bind(this);

  this.createWorkOrder = (e) => {
    //Display message and return if all fields were not entered
    if (!this.woJobDetails || !this.woEstimatedDuration || !this.woClientName) {
      //set invalid fields boolean and immediately return.
      this.invalidFields = true;
      return;
    }

    //set a default image if one is not provided
    //TODO: store default image on server rather than using link
    if (!this.woPhotoUrl) {
      this.woPhotoUrl = "https://images.pexels.com/photos/33343/building-joy-planning-plans.jpg?w=1260&h=750&auto=compress&cs=tinysrgb";
    }

    //reset invalid fields boolean
    this.invalidFields = false;

    //create the current date for created_at
    var currentDate = new Date();

    var dateStr = currentDate.getFullYear() + '/' + currentDate.getMonth() + '/' + currentDate.getDate() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    var queryObj = {
      username: curUser.first_name + ' ' + curUser.last_name,
      userphone: curUser.phone, // grab phone number from database
      notes: '',
      job_info: this.woJobDetails,
      created_at: dateStr,
      is_done: false,
      duration: this.woEstimatedDuration,
      client: this.woClientName, //make schema use string not ID (don't need clients table?)
      photo: this.woPhotoUrl
    };

    this.sendNewOrder(queryObj, this.clearFields);
  };

  this.sendNewOrder = function (queryObj, cb) {
    var that = this;
    //send HTTP POST to server to create new W.O.
    $http({
      method: 'POST',
      url: '/create-order',
      data: queryObj
    })
      .then(function successCallback(res) {
        //fixes refresh bug
        that.appGetWorkOrders();
        cb();
      }, function errorCallback(res) {
        //Useful console log to see when there is an error.
        console.log('error creating new order!');
      });
  }.bind(this);

  this.clearFields = function () {
    //Clear all Fields when user clicks submit
    this.woClientName = '';
    this.woPhotoUrl = '';
    this. woJobDetails = '';
    this.woEstimatedDuration = '';

  }.bind(this);

})

.component('workOrderFeed', {
  require: {
    parent: '^^app'
  },
  bindings: {
    appGetWorkOrders: '<', //**
    appGetUnclaimed: '<',
    appGetCompleted: '<',
    appGetMyCreated: '<',
    appGetMyInProgress: '<',
    appWorkOrders: '<'
  },
  controller: 'WorkOrderFeedCtrl',
  templateUrl: '../templates/workOrderFeed.html'
});
