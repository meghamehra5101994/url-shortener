var app = angular.module("urlShortener" ,[]);

var myController = function($scope,$http,Url){

console.log("main ctrl");

    $scope.genrateUrl = function(){
       $scope.miniUrl = Url.postUrl($scope.url);
    }
    
   
};
app.controller("mainController",myController);