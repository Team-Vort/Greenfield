angular.module('work-orders').
  service('dataHandler', function() {

    this.setOrderInfo = function(order){
      this.orderData = order;
    }

  });