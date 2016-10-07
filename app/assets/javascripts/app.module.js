angular.
  module('Generator', [
    'site',
    'core',
    'user',

    'dndLists',
    'ngRoute',
    'templates',
    'ui.router',
    'summernote',
    'ImageCropper',
    'ngTagsInput',
    'angularUtils.directives.dirPagination',
    'ngSanitize'
]).factory('Search',function(){
   return {text: ''}
});