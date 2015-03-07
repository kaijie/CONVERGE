  var myApp = angular.module("myApp", ["firebase"]);
  myApp.controller('userController', ['$scope', '$firebase',
    function($scope, $firebase) {
    $scope.newuser = {};
    
    var theFirebaseURL = "https://khoopeisin.firebaseio.com";
    
    var ref = new Firebase(theFirebaseURL);
    $scope.users = $firebase(ref.child("user")).$asArray(); 
    
    $scope.currentUser = null;
    $scope.signin = false;
 
    var authData = ref.getAuth();
      if (authData && authData!={}) {
          $scope.currentUser = $firebase(ref.child("user").child(authData.uid)).$asObject();
      } else {
          console.log("User is logged out");
      }
    
     var logout = function(loginProvider){
        $scope.currentUser = null;
        $scope.signin = false;
    }
    
    $scope.login = function(loginProvider){
          ref.authWithOAuthPopup(loginProvider, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              $scope.signin = true;
              //Add the user to the users list. 
              ref.child("user/"+authData.uid).transaction(function(currentValue) {
                  return authData;
                });
              $scope.currentUser = $firebase(ref.child("user").child(authData.uid)).$asObject();    
              $scope.users = $firebase(ref.child("user")).$asArray();
            }
          });
        }
    
    $scope.save = function(){
      //Add new if no index is passed in.
        $scope.newuser.uid = $scope.currentUser.uid;
        $scope.users.$add($scope.newuser);
        logout('google');
    };
    
    }]);