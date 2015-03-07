var myApp = angular.module("myApp", ["firebase"]);
  myApp.controller('userController', ['$scope', '$firebase',
    function($scope, $firebase) {
    $scope.newuser = {};
    
    // Here is where you update your Firebase URL. 
    var theFirebaseURL = "https://khoopeisin.firebaseio.com";
    
    var ref = new Firebase(theFirebaseURL);
    $scope.users = $firebase(ref.child("feedback")).$asArray(); 
    $scope.edit = false;
    $scope.error = false;
    $scope.incomplete = false;  
    
    $scope.currentUser = null;
    //Check to see if the users is already logged in to Firebase and update currentUser if yes. 
    var authData = ref.getAuth();
      if (authData && authData!={}) {
          $scope.currentUser = $firebase(ref.child("user").child(authData.uid)).$asObject();
      } else {
          console.log("User is logged out");
      }
    
    $scope.logout = function(loginProvider){
        $scope.currentUser = null;
    }
    
    $scope.login = function(loginProvider){
          ref.authWithOAuthPopup(loginProvider, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              //Add the user to the users list. 
              ref.child("user/"+authData.uid).transaction(function(currentValue) {
                  return authData;
                });
              $scope.currentUser = $firebase(ref.child("user").child(authData.uid)).$asObject();    
              $scope.users = $firebase(ref.child("feedback")).$asArray();
            }
          });
        }
        
    $scope.editFeedback = function(id) {
        $scope.currentId = id;
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.newuser = {};
            console.log("new feedback.");
        } else {
            $scope.edit = true;
            $scope.newuser = $firebase(ref.child("feedback").child(id)).$asObject();
            console.log("existing feedback.");
        }
    };
    
    $scope.save = function(){
      //Add new if no index is passed in.
      
      if($scope.currentId=='new'){
        //Add the currentUser UID. 
        $scope.newuser.uid = $scope.currentUser.uid;
        $scope.users.$add($scope.newuser);
      }
      else{
        $scope.newuser.$save();
      }
      $scope.edit = false;
    };
    
    $scope.deleteFeedback = function(index){
      $scope.users.$remove(index);
      console.log("removing "+index);
    }
    
}]);