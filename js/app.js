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
    }).when("/request",{
      templateUrl:"templets/request.html"
    });

});

var num;

app.controller("ContactController",function($scope,$http,$location){
  console.log("submit clicked");
$scope.submit=function(){
  let data={
  "name":$scope.name,
  "email": $scope.email,
  "subject": $scope.subject,
  "message":$scope.message,
  "option":$scope.place
}
console.log(data);
if($scope.email){
  $location.path('/'+$scope.email);
$http.post("http://localhost:3000/contactus",data).then(function(response){
  console.log(response.data);
});
}
}
});
