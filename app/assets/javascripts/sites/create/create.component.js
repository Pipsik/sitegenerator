angular.module('site.create').
component('createView', {
  templateUrl: 'sites/create/create.template.html',
  controller: [
  '$scope',
  'dataService',

  function ($scope, dataService) {
    $scope.addSite = function(){
      var o = {
          name: $scope.name,
          description: $scope.description,
          tags: $scope.tags
      };

      dataService.post('return', o).then(function(ob) { alert(ob);});

    }
      $scope.models = {
          selected: null,
          templates: [
              {type: "container", id: 1, itemUrl: "container", columns: [[], []]},
              {type: "text", id: 2, itemUrl:"hui"}
          ],
          dropzones: {

              "B": [
                  {
                      "type": "container",
                      "id": "1",
                      itemUrl: "container",
                      columns : [[],[]]
                  }
                  
              ]
          }
      };
      $scope.dropCallback = function(event, index, item, external, type, allowedType){
          var result = document.getElementsByClassName("item ng-binding ng-scope");

          return item;
      }

      $scope.$watch('models.dropzones', function(model) {
          $scope.modelAsJson = angular.toJson(model, true);
      }, true);
  }]
});