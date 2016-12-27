var app = angular.module('customers',['ngRoute', 'templates']);
// var CustomerSearchController = function($scope) {
//   $scope.search = function(searchTerm) {
//     $scope.searchedFor = searchTerm;
//   }
// }
app.config([
            "$routeProvider",
  function($routeProvider){
    $routeProvider.when("/", {
      controller: "CustomerSearchController",
      templateUrl: "customers_search.html"
    }).when("/:id",{
      controller: "CustomerDetailController",
      templateUrl: "customers_detail.html"
    });
}]);

app.controller("CustomerSearchController", [
      '$scope','$http','$location',
    function($scope, $http, $location){
    $scope.customers = [];
    var page = 0;
    $scope.search = function(searchTerm) {
      if(searchTerm.length < 3){
        return;
      }
      $http.get("/customers.json", { "params": { "keywords": searchTerm, "page": page }}).then(function(response){
        $scope.customers = response.data;
      }), function(response){
        alert("there was a problem: " + response.status);
      }
      // $scope.customers = [
      //   {
      //     "first_name":"Schuyler",
      //     "last_name":"Cremin",
      //     "email":"giles0@macgyver.net",
      //     "username":"jillian0",
      //     "created_at":"2015-03-04",
      //   },
      //   {
      //     "first_name":"Derick",
      //     "last_name":"Ebert",
      //     "email":"lupe1@rennerfisher.org",
      //     "username":"ubaldo_kaulke1",
      //     "created_at":"2015-03-04",
      //   },
      //   {
      //     "first_name":"Derick",
      //     "last_name":"Johnsons",
      //     "email":"dj@somewhere.org",
      //     "username":"djj",
      //     "created_at":"2015-03-04",
      //   }
      // ]
    }
    $scope.previousPage = function() {
      if( page > 0){
        page = page -1;
        $scope.search($scope.keywords);
      }
    }
    $scope.nextPage = function(){
      page = page + 1;
      $scope.search($scope.keywords);
    }
    $scope.viewDetails = function(customer){
      $location.path("/" + customer.id);
    }
  }
]);

app.controller("CustomerDetailController", [
        "$scope","$http","$routeParams",
  function($scope , $http , $routeParams) {
    var customerId = $routeParams.id;
    $scope.customer = {};
    $http.get(
      "/customers/" + customerId + ".json"
    ).then(function(response) {
      $scope.customer = response.data;
    },function(response) {
      alert("There was a problem: " + response.status);
      }
    );
  }
]);
