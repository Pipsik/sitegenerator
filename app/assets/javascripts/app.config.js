angular
  .module('Generator')
      .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('sites', {
                    url: '/sites',
                    template: '<sites-view></sites-view>'
                })
                .state('create', {
                    url: '/{id}/create',
                    template: '<create-view></create-view>'
                })
                .state('search', {
                    url: '/search',
                    template: '<search-view></search-view>'
                })
                .state('profile', {
                    url: '/{id}/profile',
                    template: '<profile-view></profile-view>'
                });

            $urlRouterProvider.otherwise('sites');
        }
    ]);