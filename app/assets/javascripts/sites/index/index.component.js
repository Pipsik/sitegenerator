angular.
    module('site.index').
    component('sitesView', {
        templateUrl: 'sites/index/index.template.html',
        controller: [
            '$scope',
            'dataService',
            function ($scope, dataService) {
                dataService.get('/sites.json').then(function(sites){
                    $scope.sites = sites.data;
                    $scope.UserId = user_id;
                    console.log(user_id);

                })
            }
        ]
}).controller('syka',['$scope', function ($scope) {
    $scope.userId = user_id;
    console.log($scope.UserId);
}]);