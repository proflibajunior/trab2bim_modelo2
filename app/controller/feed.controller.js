(function(app) {
    'use strict';

    app.controller('FeedController', function($scope, SignService, $location) {
        //Pega o usuário logado
        $scope.logado = SignService.logado();

        //Faz o logout
        $scope.sair = function() {
            SignService.sair().then(function() {
                $location.path('/signin');
            });
        }
    });

})( appM2 );
