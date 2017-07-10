// Child component of login-signup.component. Uses login-service.js, service

/* It has controller methods
    to reset input fields after a user tries to login and fails
    to log a user, and show main content (work order/profile etc) to user.
*/

angular.module('work-orders')

.controller('UserLoginCtrl', function($scope, loginService) {

  this.resetInputFields = function () { // reset input field when failed login attempt
    $scope.form.$setPristine();
    $scope.userName = '';
    $scope.userPass = '';
  };

  this.logUser = function () { // log user in and show the logged in content
    var userData = { // store data from input fields
      'username': $scope.userName,
      'password': $scope.userPass,
      'phone': $scope.phone
    };
    // validate the user
    //    if login details are incorrect, show err text
    //    else log user in by showing the work orders and profile stuff
    loginService.validateUser(userData, function (loginRes) {
      if (loginRes === false) { // to do - better error handling
        $scope.loginRes = "Invalid username/password. Please try again!";
        this.resetInputFields();
      } else {
        this.parent.showContent();
        // this.parent.showWorkOrders();
      }
    }.bind(this));
  }
})

.component('login', {
  require: {
    parent: '^^loginSignup'
  },
  controller: 'UserLoginCtrl',
  templateUrl: '../templates/login.component.html',
});