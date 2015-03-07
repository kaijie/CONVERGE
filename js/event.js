var eventApp = angular.module("eventApp", ["firebase"]);
    eventApp.controller('event-controller', ['$scope', '$firebase',
    
    function($scope, $firebase) {
    $scope.newevent = {};
    $scope.id = '';
    $scope.eName = '';
    $scope.eDate = '';
    $scope.eVenue = '';
    // Here is where you update your Firebase URL.
    var ref = new Firebase("https://khoopeisin.firebaseio.com");
    $scope.events = $firebase(ref.child("event")).$asArray();
    
    $scope.pastevents = [
        {id:1, peName:'BEA Network Session'  , peDate:"6th June 2013" },
        {id:2, peName:'KPMG Network Session'   , peDate:"30th April 2012" },
        {id:3, peName:'Accenture Network Session'  , peDate:"19th February 2012" },
        {id:4, peName:'DFS Network Session'  , peDate:"1st August 2010" },
        {id:5, peName:'HP Network Session' , peDate:"22th November 2009" }
    ];
    
    $scope.save = function() {
        $scope.events.$add($scope.newevent);
        
    }
    
    
}]);
