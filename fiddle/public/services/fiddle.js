'use strict';

angular.module('mean.fiddle').factory('Fiddle', [
  function() {
    return {
      name: 'fiddle'
    };
  }
]).factory('fiddle', ['$resource',
  function($resource) {
    return $resource('api/fiddle/data/:fiddleId', {
      fiddleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
