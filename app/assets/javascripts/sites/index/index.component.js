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
                    console.log($scope.sites);


                })
            }
        ]
}).controller('syka',['$scope','dataService', function ($scope, dataService) {
    $scope.userId = user_id;
    var inf = {
        searchstr: $scope.val
    };

    $scope.searchSite = function () {
        dataService.post('/search', inf).then(function(obj){
            $scope.foundSites = obj.data;
            console.log($scope.foundSites);
            console.log(inf);
        })
    }
}]);