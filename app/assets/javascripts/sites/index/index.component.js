var output = null;


angular.
    module('site.index').
    component('sitesView', {
        templateUrl: 'sites/index/index.template.html',
        controller: [
            '$scope',
            'dataService',
            'Search',
            function ($scope, dataService, Search) {
                dataService.get('/sites.json').then(function(sites){
                    $scope.sites = sites.data;
                    console.log(sites.data);
                    $scope.searchFromService=Search;
                });

                $scope.runMyFunction = function(vote){
                    alert($scope.vote);
                }
            }
        ]
}).controller('syka',function ($scope, dataService, Search) {
    $scope.userId = user_id;
    $scope.search = Search;
    $scope.searchSite = function () {
        var inf = {
            searchstr: $scope.search
        };
        dataService.post('/search', inf).then(function(obj){
            Search.search = obj.data;
            console.log(Search.search);
        });
    }
}).controller('restart',function($route,$window, $scope){
    $scope.restartPage = function () {
        $window.location.href = '/';
    }
});

