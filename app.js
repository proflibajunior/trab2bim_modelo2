const appM2 = angular.module('appM2', ['ngStorage', 'ngRoute']);

//Configuração das rotas
appM2.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'app/template/feed.html',
            controller: 'FeedController'
        })
        .when('/signin', {
            templateUrl: 'app/template/signin.html',
            controller: 'SignController'
        })
        .when('/signup', {
            templateUrl: 'app/template/signup.html',
            controller: 'SignController'
        })
        .otherwise({ redirectTo: '/' });

});

//Define que acontecerá na execução da aplicação
appM2.run(function ($rootScope, $location, $sessionStorage) {

    $rootScope.$on('$locationChangeStart', function () {

        if ($location.path().indexOf('sign') < 0) {
            //Verifica se o usuário entrou
            if (!$sessionStorage.logado) {
                $location.path('/signin');
            }
        }
    });

});