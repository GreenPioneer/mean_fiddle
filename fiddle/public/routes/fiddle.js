'use strict';

angular.module('mean.fiddle').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('fiddle', {
      url: '/fiddle',
      templateUrl: 'fiddle/views/index.html'
    });
    $stateProvider.state('fiddleId', {
        url: '/fiddle/:fiddleId',
        templateUrl: 'fiddle/views/view.html'
      });
    $stateProvider.state('fiddleList', {
        url: '/fiddle/list/all',
        templateUrl: 'fiddle/views/list.html'
      });
  }
]).config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'fiddle/views/index.html');
}]);