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
                        $scope.i = $scope.SiteData.length;
                        console.log(obj.data);

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

                $scope.saveEditPage =function(){
                    var mod ={
                        content: $scope.modelAsJson,
                        site_id: $state.params.id,
                        title: $scope.nameLink
                    };
                    console.log(mod);
                    dataService.post('/postmodel', mod).then(function(ob){alert(ob);});

                };

                $scope.uploadPage = function(title){

                    dataService.get('/site/' + $state.params.id + '/pages').then(function(obj){
                        $scope.models.dropzones = angular.fromJson(obj.data.filter(function(value){ return value.title === title;})[0].content);
                        console.log(obj);
                    });
                    $scope.nameLink = title;
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