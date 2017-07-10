// Child component of login-signup.component. Uses login-service.js, service

/* It has controller methods
    to create a user, and log user in to show main content (work order/profile etc) to user.
*/

angular.module('work-orders')
.controller('UserSignupCtrl', function($scope, loginService) {
  this.createUser = function () {
    var userData = {
      first_name: $scope.firstName,
      last_name: $scope.lastName,
      phone: $scope.phoneNumber,
      username: $scope.userName,
      password: $scope.userPass,
      photo: "assets/images/default-user-image.png", // sets a default photo for a user profile pic
      date: new Date()
    };

    loginService.postUser(userData, function (signUpRes) {
      if (signUpRes === false) {
        $scope.signUpRes = "There was an error signing up. Please try again!";
        console.log("error")
      } else {
        this.parent.showContent();
        // this.parent.showWorkOrders();
        console.log("success")
      }
    }.bind(this));
  };
})
.component('signup', {
  require: {
    parent: '^^loginSignup'
  },
  controller: 'UserSignupCtrl',
  templateUrl: '../templates/signup.component.html',
});