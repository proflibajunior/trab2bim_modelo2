(function(app) {
    'use strict';

    app.controller('FeedController', function($scope, SignService, $location, FeedService, UsuarioService) {
        //Pega o usuário logado
        $scope.logado = SignService.logado();

        //Usuarios
        $scope.usuarios = [];

        //Feeds
        $scope.feeds = [];

        //Faz o logout
        $scope.sair = function() {
            SignService.sair().then(function() {
                $location.path('/signin');
            });
        }

        //Carrega os feeds
        FeedService.listar().then(function( result ) {
            $scope.feeds = result.data;

            //Carrega os usuários
            UsuarioService.listar().then(function( result2 ){
                result2.data.forEach(item => {
                    if ($scope.logado.username != item.username) {
                        $scope.usuarios.push(item);
                    }    
                });
            });
        });
    });

})( appM2 );
