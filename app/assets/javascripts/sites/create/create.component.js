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

      dataService.post('return', o).then(function(ob) { alert(ob);});

    }
      $scope.currentId = 0;
      $scope.tags = [];


      $scope.addLink = function () {
          var linkhtml = '<li><a href="#" ng-clcik="addLink()">Link</a></li>';
          var temp = $compile(linkhtml)($scope);
          angular.element(document.getElementById('link')).append(temp);

      }
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
      $scope.dropCallback = function(event, index, item, external, type, allowedType){
          //var result = document.getElementsByClassName("item ng-binding ng-scope");
          //if(item.textId == 0) {
          //    item.textId = ++$scope.currentId;
          //}
          return item;
      }

      $scope.$watch('models.dropzones', function(model) {
          $scope.modelAsJson = angular.toJson(model, true);
      }, true);
  }]
});