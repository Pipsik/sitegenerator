// angular.
// module('site.search').
// component('sitesSearch', {
//     templateUrl: 'sites/search/search.template.html',
//     controller: [
//         '$scope',
//         'dataService',
//         function ($scope, dataService) {
//             var inf = {
//                 searchstr: $scope.searchInput
//             };
//
//             $scope.searchSite = function () {
//                 dataService.post('/search', inf).then(function(obj){
//                     $scope.foundSites = obj.data;
//                     console.log($scope.foundSites);
//                 })
//             }
//
//         }
//     ]
// }).controller('input');