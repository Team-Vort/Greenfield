angular.module('work-orders')

.controller('WorkOrderEntryCtrl', function(dataHandler) {
  this.information = dataHandler.orderData;

})

.component('workOrderEntry', {
  bindings: {
    order: '<'
  },
  controller: 'WorkOrderEntryCtrl',
  templateUrl: '../templates/workOrderEntry.html'
});