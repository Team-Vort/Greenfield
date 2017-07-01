angular.module('work-orders')

.controller('NavCtrl', function(loginService) {
  this.date = Date().slice(0,16);
  this.userLogout = function (userData) { // to do: refactor to seperate component
    // to do: get cur user data/ post to server and destroy session
    loginService.userLogout(userData, function (res) {
      if (res === true) {
        this.parent.isContentHidden = true;
      } else {
        console.log('error logging out');
      }
    }.bind(this));
  }
})

.component('navigation', {
  require: {
    parent: '^^app'
  },
  bindings: {
    showLogout: '<'
  },
  controller: 'NavCtrl',
  templateUrl: '../templates/navigation.html'
});
