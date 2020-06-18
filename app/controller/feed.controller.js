(function(app) {
    'use strict';

    app.controller('FeedController', function($scope, SignService) {
        //Pega o usuário logado
        $scope.logado = SignService.logado();

        
    });

})( appM2 );
