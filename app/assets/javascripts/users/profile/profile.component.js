angular.
module('user.profile')

.component('profileView', {
  templateUrl: 'users/profile/profile.template.html',
  controller: [
    '$scope',
    'dataService',
    '$state',
    function ($scope, dataService, $state) {
        dataService.get('/users/'+ $state.params.id).then(function(obj){
            $scope.userInfo = obj.data;
            $scope.url = $state.params.id;
        });
        dataService.get('/user/'+$state.params.id +'/sites').then(function(obj){
          $scope.userSites = obj.data;
        });

        dataService.get('/user/'+$state.params.id+'/achivements.json').then(function(obj){
           $scope.achivements = obj.data.site;
        });

        $scope.deleteSite = function (id) {
            console.log(id);
            dataService.delete('/sites/'+id).then(function(obj){
                console.log(obj);
            });
        }

    }



  ]
});
