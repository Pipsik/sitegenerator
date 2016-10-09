angular.module('site.create').
component('createView', {
  templateUrl: 'sites/create/create.template.html',
  controller: [
  '$scope',
  'dataService',

  function ($scope, dataService) {
      $scope.tags = [];
      $scope.nameLink='Home';
      $scope.links=[{text: $scope.nameLink}];
      var i = 1;

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

    $scope.addSite = function(createForm){
            var o = {
                name: $scope.name,
                description: $scope.description,
                tags: $scope.tags
            };


            dataService.post('return', o).then(function(obj) {
                $scope.site_id = obj.data.id;
                if(obj.data == 'authError'){
                    alert("Access denied. Please authenticate");
                    window.location = "/";
                }
            });

            var first = {
                content: $scope.models.dropzones,
                site_id: $scope.site_id,
                title: $scope.nameLink
            };
            dataService.post('/postmodel', first).then(function(ob){
            });

    };


      // $scope.currentId = 0;


      $scope.addLink = function () {
          var mod ={
              content: $scope.modelAsJson,
              site_id: $scope.site_id,
              title: $scope.nameLink
          };
          dataService.post('/postmodel', mod).then(function(ob){});
          $scope.nameLink ="link" + i++;
          $scope.links.push({text: $scope.nameLink});

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
       };

      // $scope.savePage =function(){
      //     var mod ={
      //         content: $scope.modelAsJson,
      //         site_id: $scope.site_id,
      //         title: $scope.nameLink
      //     };
      //     dataService.post('/postmodel', mod).then(function(ob){});
      //
      // };

      $scope.changePage = function(link) {
          var mod ={
              content: $scope.modelAsJson,
              site_id: $scope.site_id,
              title: $scope.nameLink
          };
          dataService.post('/postmodel', mod).then(function(ob){});

          var index = $scope.links.indexOf(link);
          $scope.nameLink = $scope.links[index].text;
          console.log($scope.nameLink);
          dataService.get('/site/' + $scope.site_id + '/pages').then(function (obj) {
              $scope.models.dropzones = angular.fromJson(obj.data[index].content);
          });
      };



      $scope.dropCallback = function(event, index, item, external, type, allowedType){
          return item;
      };

      $scope.$watch('models.dropzones', function(model) {
          $scope.modelAsJson = angular.toJson(model, false);
      }, true);
  }]
});