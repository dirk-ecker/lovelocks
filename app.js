'use strict';

//first agument is module name, second the array of needed modules
//add controller to module
angular.module( 'lovelocks', [ 'ui.bootstrap' ] )
  .controller( 'LoveLockController', [ '$scope', '$modal' , function( $scope, $modal ) {

  var x, y, lock;

  $scope.locks =[];

  function hangUp() {
    $scope.locks.push( {
        title: lock.title,
        from: lock.from,
        for: lock.for,
        text: lock.text,
        x: x,
        y: y
      }
    );
  };

  $scope.addLock = function( event ) {
    x = event.x;
    y = event.y;
    lock = { title: '', from: '', for: '', text: '' };

    var addLockPopUp = $modal.open( {
      templateUrl: 'addLock.html',
      controller: 'AddLockController',
      resolve: {
        lock: function () {
          return lock;
        }
      },
      size: 'sm'
    } );

    addLockPopUp.result.then( function( newLock ) {
      lock = newLock;
      hangUp();
    }, function() {
    });
  };


} ] );


angular.module( 'lovelocks' )
  .controller( 'AddLockController', function( $scope, $modalInstance, lock ) {

  $scope.lock = lock;

  $scope.ok = function() {
    $modalInstance.close( $scope.lock );
  };

  $scope.cancel = function() {
    $modalInstance.dismiss( 'cancel' );
  };
});