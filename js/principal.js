angular.module('buscacomida', [])

.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.buscar = '';
  $scope.locales = [];

  $http.get('data.json')
    .then(function(response) {
      console.log(response.data);
      $scope.locales = response.data.locales;
    });

  $scope.rango = function (numero) {
    return new Array(numero);
  };
}]);
