angular.module('work-orders').
  service('loginService', function($http) {
    // create a new user when signing up
    this.postUser = function (userData, callback) {
      var reqBody = angular.copy(userData);
      $http.post('/user-signup', reqBody)
        .then(function(res) {
          console.log(res.data)
          if (res.data.username !== undefined) {
            console.log(res.data)
            //if (res.data.userExists === false) { // to do: check if user already exists
              if (res.data.username === userData.username && res.data.password === userData.password) {
                callback(res.data);
            } else {
              callback(false); // to do : change to res.data.userExists, if true ask to login
            }
          //}
          }
        });
      };

    // when user inputs login details, verify user and log in
    this.validateUser = function (userData, callback) {
      var reqBody = angular.copy(userData);
      $http.post('/user-signin', reqBody)
        .then(function(res) {
          if (res.data.username !== undefined) {
            if (res.data.username === userData.username && res.data.password === userData.password) {
              callback(res.data);
            }
          } else {
            console.log('invalid username/password. Please try again');
            callback(false); // to do: change to res.data.someProperty- user password not valid etc
          }
      });
    };
    // when user logs out, send session data to server. upon successful logout response, redirect user to signup page (to do)
    this.userLogout = function (userData, callback) {
      callback(true);
    //   var reqBody = angular.copy(userData);
    //   $http.post('/user-logout', reqBody)
    //     .then(function(res) {
    //       if (res.data.isLoggedout = true) {
    //         // delete cookies/session info?
    //       } else {
    //         console.log('could not log out. Please try again');
    //         callback(false); // to do - callback(err)
    //       }
    //   });
    };
});