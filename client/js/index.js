var app = angular.module("urlShortener" ,[]);

var myController = function($scope,$http,Url){
    var self = this;

console.log("main ctrl");

    $scope.genrateUrl = function(){
       self.gettingUrl = Url.postUrl($scope.url);
       self.gettingUrl.then(function(data){
           console.log(data);
           $scope.miniUrl = data.url;
           
       })
       
    }
    
   
};
app.controller("mainController",myController);