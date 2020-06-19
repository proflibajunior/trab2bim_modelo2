(function( app ){
    'use strict';

    app.service('UsuarioService', function( $q, $localStorage ) {
        const deferred = $q.defer();

        function loadJSON() { 
            deferred.resolve($localStorage.usuarios || []);

            return deferred.promise;
        }
        
        return {
            listar: loadJSON
        }

    });

})( appM2 );