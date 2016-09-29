angular.
module('user.profile')

.component('profileView', {
  templateUrl: 'users/profile/profile.template.html',
  controller: [
    '$scope',
    'dataService',

    function ($scope, dataService) {

      $scope.fileChanged = function (e) {

        var files = e.target.files;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function (e) {

          $scope.imgSrc = this.result;
          $scope.result = this.result;
          $scope.$apply();

        };
      }

      $scope.SendData = function () {

        dataService.post('/image', { data: $scope.result } )
      }

      $scope.clear = function () {
        $scope.imageCropStep = 1;
        delete $scope.imgSrc;
        delete $scope.result;
        delete $scope.resultBlob;
      };
    }

  ]
});
