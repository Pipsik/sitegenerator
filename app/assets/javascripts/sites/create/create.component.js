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
           $scope.siteId = obj.data.id;
      });

    };

      $scope.currentId = 0;
      $scope.tags = [];
      $scope.nameLink='Home';

      var i =1 ;
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
          var model ={
              content: $scope.modelAsJson,
              siteId: $scope.siteId,
              title: $scope.nameLink
          };
          dataService.post('/postmodel', model).then(function(ob){alert(ob);});
          console.log(model);
      };

      $scope.changePage = function(link){
          var index =$scope.links.indexOf(link)+1;
          dataService.get('/sites/'+$scope.siteId +'/pages/'+index+'.json').then(function (page) {
              $scope.currPage = page.data;
          });
          console.log(index);
          console.log($scope.currPage);


      };

      $scope.links=[{text: $scope.nameLink}];
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
                      columns : [[[]],[]]
                  }
                  
              ]
          }
      };
      $scope.dropCallback = function(event, index, item, external, type, allowedType){
          return item;
      }

      $scope.$watch('models.dropzones', function(model) {
          $scope.modelAsJson = angular.toJson(model, true);
      }, true);
  }]
});