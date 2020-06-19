(function(app) {
    'use strict';

    app.controller('FeedController', function($scope, SignService, $location, FeedService, UsuarioService) {
        //Pega o usuário logado
        $scope.logado = SignService.logado();

        //Usuarios
        $scope.usuarios = [];

        //Feeds
        $scope.feeds = [];

        //Models da postagem
        $scope.imagem = '';
        $scope.descricao = '';

        //Faz o logout
        $scope.sair = function() {
            SignService.sair().then(function() {
                $location.path('/signin');
            });
        }

        //Faz a postagem
        $scope.postar = function() {
            let comments = [];

            //Adiciona como primeiro comentário a descrição do feed
            comments.push({
                usuario: $scope.logado,
                dtenvio: new Date(),
                comentario: $scope.descricao
            });

            //Alimenta o Feed
            let feed = {
                dtpost: new Date(),
                usuario: $scope.logado,
                imagem: $scope.imagem,
                curtidas: 0,
                comentarios: comments
            }

            FeedService.save(feed).then(function(result) {
                $scope.feeds = result.data;

                //Limpa os models para os campos não ficarem preenchidos permanentemente
                $scope.imagem = '';
                $scope.descricao = '';
            });
        }

        //curtir
        $scope.curtir = function(feed) {
            feed.curtidas += 1;
        }

        //publicar novo comentario
        $scope.publicar = function(feed) {
            let comment = {
                usuario: $scope.logado,
                dtenvio: new Date(),
                comentario: feed.novocomentario
            };

            //Adiciono o novo comentario no vetor comentarios
            feed.comentarios.push(comment);

            //limpa o atributo novo comentario
            feed.novocomentario = '';
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
