angular.module('work-orders')

.controller('UserLoginCtrl', function($scope, loginService) {
  this.logUser = function () {
    var userData = {
      'username': $scope.userName,
      'password': $scope.userPass
    };

    loginService.validateUser(userData, function (loginRes) {
      if (loginRes === false) {
        $scope.loginRes = "Invalid username/password. Please try again!";
      } else {
        this.parent.showContent();
      }
    }.bind(this));

  }
})

.component('login', {
  require: {
    parent: '^^loginSignup'
  },
  controller: 'UserLoginCtrl',
  templateUrl: '../templates/login.html',
});