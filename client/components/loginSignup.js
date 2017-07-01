angular.module('work-orders')

.controller('LoginSignupCtrl', function($scope) {
  this.isHidden = false;

  this.showContent = function () {
    this.parent.isContentHidden = false;
  };
})

.component('loginSignup', {
  require: {
    parent: '^^app'
  },
  controller: 'LoginSignupCtrl',
  templateUrl: '../templates/loginSignup.html',
});