(function( app ){
    'use strict';

    app.service('FeedService', function( $q, $localStorage ) {
        const deferred = $q.defer();

        function loadJSON() { 
            deferred.resolve($localStorage.feeds || []);

            return deferred.promise;
        }
        function save( feed ) { 
            var dados = $localStorage.feeds || [];

            //verifica se existe um ID, se não existir, deve adicionar o vetor
            if (!feed.id) {
                var ultimo = dados[dados.length-1];

                //Adiciona um ID ao feed
                feed.id = ultimo ? ultimo.id+1 : 1;
                dados.push( feed )
            }

            //Atualiza o valor da storage
            $localStorage.feeds = dados;

            deferred.resolve(dados);

            return deferred.promise;
        }

        function remove( feed ) {
            var dados = $localStorage.feeds

            var index = dados.indexOf(feed);
            dados.splice(index, 1);

            //Atualiza o valor da storage
            $localStorage.feeds = dados;

            deferred.resolve(dados);

            return deferred.promise;
        }
        
        return {
            listar: loadJSON,
            save: save,
            remove: remove
        }

    });

})( appM2 );