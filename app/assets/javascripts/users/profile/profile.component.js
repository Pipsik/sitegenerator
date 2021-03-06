angular.
module('user.profile')

    .component('profileView', {
        templateUrl: 'users/profile/profile.template.html',
        controller: [
            '$scope',
            'dataService',
            '$state',
            function ($scope, dataService, $state) {
                $scope.current_user = user_id;
                dataService.get('/users/'+ $state.params.id).then(function(obj){
                    $scope.userInfo = obj.data;
                    $scope.url = $state.params.id;
                });
                dataService.get('/user/'+$state.params.id +'/sites').then(function(obj){
                    console.log(obj);
                    $scope.userSites = obj.data;
                });

                dataService.get('/user/'+$state.params.id+'/achivements.json').then(function(obj){
                    $scope.sitescount = obj.data.site;
                    $scope.commentscount = obj.data.comment

                });

                $scope.deleteSite = function (id) {
                    dataService.delete('/sites/'+id).then(function(obj){
                        if(obj.data){
                            var index = $scope.userSites.indexOf(id);
                            $scope.userSites.splice(index, 1);
                        }
                    });
                }

            }
        ]
    });