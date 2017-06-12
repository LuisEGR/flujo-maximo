flujoMaximo.controller('flujoMaximoController', function($scope, $mdToast, $mdDialog){
  $scope.transiciones = datosDemo;
  $scope.caminosMarcados = [];
  $scope.caminoAMostrar = [];
  $scope.entrada = 'a';
  $scope.salida = 'e';
  $scope.FlujoRed = {};
  $scope.newTransition = {};
  
  // $scope.max = fn.flujoMaximo($scope.entrada,$scope.salida);
  // $scope.caminosDisponibles = fn.caminosDisponibles;
  // $scope.flujosCaminosDisponibles = fn.flujosCaminosDisponibles;
  // fn.draw($scope.entrada, $scope.salida, $scope.caminosMarcados);
  $scope.agregarTransicion = function(o){
    var cond = angular.isUndefined(o) || angular.isUndefined(o.origen) || angular.isUndefined(o.destino);
    if(cond) return;
    o.flujo = o.flujo || 0;
    o.flujoInverso = o.flujoInverso || 0;
    var c = {};
    angular.copy(o, c);
    $scope.newTransition = {};
    $scope.transiciones.push(c);
    $scope.reDraw();
  }


  $scope.eliminarNodo = function(idx){
    $scope.transiciones.splice(idx, 1);
    $scope.reDraw();
  }

  $scope.procesarNodos = function(){
    angular.forEach($scope.transiciones, function(nodo){
      $scope.FlujoRed.agregarArista(nodo.origen,nodo.destino,nodo.flujo,nodo.flujoInverso);
    });

    $scope.nodos = $scope.transiciones.map(function(t){ return t.origen }).concat($scope.transiciones.map(function(t){ return t.destino })).filter(function(value, index, self){
      return self.indexOf(value) === index;
    }).sort();
    console.log($scope.nodos);
    // $scope.nodos.push($scope.transiciones[$scope.transiciones.length-1].destino);
  }


  $scope.reDraw = function(){
    $scope.FlujoRed = new FlujoRed();
    console.log("Redraw");
    $scope.procesarNodos();
    $scope.max = $scope.FlujoRed.flujoMaximo($scope.entrada,$scope.salida);
    $scope.caminosDisponibles = $scope.FlujoRed.caminosDisponibles;
    $scope.caminosMarcados = $scope.caminosDisponibles.filter(function(e, i){
      return $scope.caminoAMostrar[i];
    });
    $scope.FlujoRed.draw($scope.entrada, $scope.salida, $scope.caminosMarcados);
  }






  $scope.reDraw();


});
