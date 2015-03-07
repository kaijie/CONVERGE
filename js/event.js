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
    $scope.contacts = $firebase(ref.child("contact")).$asArray();
    
    $scope.pastevents = [
        {id:1, peName:'BEA Network Session'  , peDate:"6th June 2013" },
        {id:2, peName:'KPMG Network Session'   , peDate:"30th April 2012" },
        {id:3, peName:'Accenture Network Session'  , peDate:"19th February 2012" },
        {id:4, peName:'DFS Network Session'  , peDate:"1st August 2010" },
        {id:5, peName:'HP Network Session' , peDate:"22nd November 2009" }
    ];
    
    $scope.save = function() {
        $scope.events.$add($scope.newevent);
    }
    
    $scope.invitations =[
        {iName:'SOL Network Session'  , iDate:"3rd January 2015" , iVenue:"SOL SR3.4" , iHost:"June LEE"},
        {iName:'PSA Network Session'  , iDate:"14th December 2016" , iVenue:"PSA Function Room 3" , iHost:"Kaden VINCENT"},
        {iName:'E&Y Network Session'  , iDate:"2nd May 2017" , iVenue:"E&Y Meeting Room 1" , iHost:"Michelle KEY"},
        {iName:'APPLE Network Session'  , iDate:"21st July 2015" , iVenue:"APPLE Showroom 5" , iHost:"Jared LEO"},
        {iName:'GOOGLE Network Session'  , iDate:"26th October 2015" , iVenue:"GOOGLE Lounge 2" , iHost:"Mark KENNY"}
    ];
}]);