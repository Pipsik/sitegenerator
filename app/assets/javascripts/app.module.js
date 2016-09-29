angular.
  module('Generator', [
    'site',
    'core',

    'dndLists',
    'ngRoute',
    'templates',
    'ui.router',
    'froala'
]).
value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Enter Text Here'
});