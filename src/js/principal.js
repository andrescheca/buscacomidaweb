angular.module('buscacomida', [])
// Controlador principal de la aplicación
.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.buscar = '';
  $scope.locales = [];
  $scope.valoracion = '';
  // Pedido asíncrono de información
  $http.get('data.json')
    .then(function (respuesta) {
      // $scope.locales = respuesta.data.locales;
      angular.forEach(respuesta.data.locales, function (local, llave) {
        $scope.locales.push(local);
      })
    }).catch(function (error) {
      console.log(error);
    });
  // Función para retornar un arreglo con un número
  // determinado de valores
  $scope.rango = function (numero) {
    return new Array(numero);
  };
}])

// Filtrar locales por valoración
.filter('rating', function () {
  return function(locales, valoracion) {
    if (!locales) return locales;
    if (!valoracion) return locales;
    var resultado = {};
    angular.forEach(locales, function (local, llave) {
      var actual = local.valoracion;
      if (actual == valoracion) {
        resultado[llave] = local;
      }
    })
    return resultado;
  }
})

// Filtrar locales por atributo
.filter('buscarLocal', function() {
  return function(locales, busqueda, atributos) {
    if (!locales) return locales;
    if (!busqueda) return locales;
    if (!atributos) return locales;
    var esperado = ('' + busqueda).toLowerCase();
    var resultado = {};
    var arregloAtributos = atributos.split(',');
    angular.forEach(locales, function(local, llave) {
      angular.forEach(arregloAtributos, function (atributo) {
        var actual = ('' + local[atributo]).toLowerCase();
        if (actual.indexOf(esperado) !== -1) {
          resultado[llave] = local;
        }
      })
    });
    return resultado;
  }
});
