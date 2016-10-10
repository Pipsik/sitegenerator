angular.
module('site.edit')

    .component('editView', {
        templateUrl: 'sites/edit/edit.template.html',
        controller: [
            '$scope',
            'dataService',
            '$state',
            function ($scope, dataService, $state) {

                dataService.get('/site/'+ $state.params.id +'/update_pages').then(function(obj) {
                    if(obj.data){
                        $scope.SiteData = obj.data;
                        console.log($scope.SiteData);
                        $scope.i = $scope.SiteData.length;
                        console.log(obj.data);
                    }
                    if(obj.data == 'authError'){
                        alert("Access denied. Please authenticate");
                        window.location = "/";
                    }
                });
                dataService.get('/sites/'+ $state.params.id).then(function(sitename){
                    if(sitename.data == 'authError'){
                        alert("Access denied. Please authenticate");
                        window.location = "/";
                    }
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
                    var mod ={
                        content: $scope.modelAsJson,
                        site_id: $state.params.id,
                        title: $scope.nameLink
                    };
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
                    dataService.post('/postmodel', mod).then(function(ob){});
                    $scope.nameLink = "link" + $scope.i++;
                    $scope.SiteData.push({title: $scope.nameLink, content:$scope.models.dropzones});
                };

                $scope.saveEditSite =function(){
                    var mod ={
                        content: $scope.modelAsJson,
                        site_id: $state.params.id,
                        title: $scope.nameLink
                    };
                    dataService.post('/postmodel', mod).then(function(ob){});

                };

                $scope.uploadPage = function(title){
                    var mod ={
                        content: $scope.modelAsJson,
                        site_id: $state.params.id,
                        title: $scope.nameLink
                    };
                    dataService.post('/postmodel', mod).then(function(ob){});

                    dataService.get('/site/' + $state.params.id + '/update_pages').then(function(obj){
                        $scope.models.dropzones = angular.fromJson(obj.data.filter(function(value){ return value.title === title;})[0].content);
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