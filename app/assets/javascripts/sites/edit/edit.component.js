angular.
module('site.edit')

    .component('editView', {
        templateUrl: 'sites/edit/edit.template.html',
        controller: [
            '$scope',
            'dataService',
            '$state',
            function ($scope, dataService, $state) {
                dataService.get('/site/'+ $state.params.id +'/pages').then(function(obj) {
                    $scope.SiteData = obj.data;
                    console.log($scope.SiteData);
                    $scope.i = $scope.SiteData.length;
                    console.log($scope.i);
                });
                dataService.get('/sites/'+ $state.params.id).then(function(sitename){
                    $scope.SiteName = sitename.data ;
                });

                $scope.models = {
                    selected: null,
                    templates: [
                        {type: "container", id: 2, itemUrl: "container", columns: [[], []]},
                        {type: "text", id: 1, itemUrl:"hui", textModel: ""}
                    ],
                    dropzones: {

                        "modeling": [
                            {
                                type: "container",
                                id: "1",
                                itemUrl: "container",
                                columns : [[],[]]
                            }

                        ]
                    }
                };

                $scope.addLink = function () {
                    $scope.models.dropzones = {

                        "modeling": [
                            {
                                type: "container",
                                id: "1",
                                itemUrl: "container",
                                columns : [[],[]]
                            }

                        ]
                    };
                    $scope.nameLink = "link" + $scope.i++;
                    $scope.SiteData.push({title: $scope.nameLink, content:$scope.models.dropzones});
                };

                $scope.uploadPage = function(object){
                    console.log(object);
                    dataService.get('/site/' + $state.params.id + '/pages').then(function(){
                        $scope.models.dropzones = angular.fromJson(object);
                    });

                };

                $scope.savePage =function(){
                    var mod ={
                        content: $scope.modelAsJson,
                        site_id: $scope.site_id,
                        title: $scope.nameLink
                    };
                    dataService.post('/postmodel', mod).then(function(ob){alert(ob);});

                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType){
                    return item;
                };
                $scope.$watch('models.dropzones', function(model) {
                    $scope.modelAsJson = angular.toJson(model, false);
                }, true);
            }
        ]
    });