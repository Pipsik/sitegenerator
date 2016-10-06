angular.
module('site.show').
component('showView', {
    templateUrl: 'sites/show/show.template.html',
    controller: [
        '$scope',
        'dataService',
        'Search',
        '$stateParams',
        function ($scope, dataService, $stateParams) {
            dataService.get('/sites.json').then(function(sites){
                $scope.sites = sites.data;

            })




        }
    ]
});