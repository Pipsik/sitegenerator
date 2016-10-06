angular.module('site.create').
component('createView', {
  templateUrl: 'sites/create/create.template.html',
  controller: [
  '$scope',
  'dataService',
  '$compile',

  function ($scope, dataService, $compile) {
    $scope.addSite = function(){
      var o = {
          name: $scope.name,
          description: $scope.description,
          tags: $scope.tags
      };

      dataService.post('return', o).then(function(obj) {
           $scope.site_id = obj.data.id;
            console.log($scope.site_id);
      });

    };
      $scope.models = {
          selected: null,
          templates: [
              {type: "container", id: 2, itemUrl: "container", columns: [[], []]},
              {type: "text", id: 1, itemUrl:"hui", textModel: ""}
          ],
          dropzones: {

              "B": [
                  {
                      type: "container",
                      id: "1",
                      itemUrl: "container",
                      columns : [[],[]]
                  }

              ]
          }
      };
      $scope.currentId = 0;
      $scope.tags = [];
      $scope.nameLink='Home';
      $scope.links=[{text: $scope.nameLink}];
      var i = 1;
      $scope.addLink = function () {

          $scope.nameLink ="link" + i++;
          $scope.links.push({text: $scope.nameLink});

          $scope.models.dropzones = {

              "B": [
                  {
                      type: "container",
                      id: "1",
                      itemUrl: "container",
                      columns : [[],[]]
                  }

              ]
          };
       };

      $scope.savePage =function(){
          var mod ={
              content: $scope.modelAsJson,
              site_id: $scope.site_id,
              title: $scope.nameLink
          };
          dataService.post('/postmodel', mod).then(function(ob){alert(ob);});

      };

      $scope.changePage = function(link) {
          var index = $scope.links.indexOf(link);
          console.log(index);
          $scope.nameLink = $scope.links[index].text;
          console.log($scope.nameLink);
          dataService.get('/site/' + $scope.site_id + '/pages').then(function (hui) {
              console.log(hui.data);
              console.log(hui);
              $scope.models.dropzones = angular.fromJson(hui.data[index].content);
          });
      };



      $scope.dropCallback = function(event, index, item, external, type, allowedType){
          return item;
      }

      $scope.$watch('models.dropzones', function(model) {
          $scope.modelAsJson = angular.toJson(model, false);
      }, true);
  }]
});