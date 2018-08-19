var app =angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/",{
      templateUrl:"templets/home.html"
    }).when("/top",{
        templateUrl:"templets/top.html"
    }).when("/worldmap",{
        templateUrl:"templets/worldmap.html"
    }).when("/findplace",{
      templateUrl:"templets/findplace.html"
    }).when("/aboutus",{
      templateUrl:"templets/aboutus.html"
    }).when("/contactus",{
      templateUrl:"templets/contactus.html"
    }).when("/livechat",{
      templateUrl:"templets/livechat.html"
    });

});

var num;
