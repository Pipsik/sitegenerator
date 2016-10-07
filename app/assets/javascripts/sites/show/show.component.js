angular.
module('site.show').
component('showView', {
    templateUrl: 'sites/show/show.template.html',
    controller: [
        '$scope',
        'dataService',
        'Search',
        '$state',
        '$stateParams',
        function ($scope, dataService, $stateParams, $state) {
            var myHtml='';
            var object = angular.element(document.getElementById('JijaFaggot'));
            var parseHtml = function(chlen, myHtml)
            {
                myHtml += "<div class='col-md-12 col-lg-12 col-sm-12'>";
                angular.forEach(chlen, function(item){
                    myHtml += "<div class='row'>";
                    switch(item.type){
                        case "text" :
                        {
                            myHtml += "<div>" +item.textModel+"</div>";
                            break;
                        }
                        case "container" :
                        {
                            angular.forEach(item.columns, function(subitem){
                                myHtml += "<div class='col-md-6 col-lg-6 col-sm-6'>";
                                parseHtml(subitem, myHtml);
                                myHtml += "</div>";
                            });
                            break;
                        }
                    }
                    myHtml += "</div>";
                });
                myHtml += "</div>";
                object.append(myHtml);
            };
            dataService.get('/site/'+ $state.params.id +'/pages').then(function(obj){
               $scope.SiteData = obj.data;
             var  first = JSON.parse(obj.data[0].content).modeling;
                parseHtml(first, myHtml);
            });
            dataService.get('/sites/'+ $state.params.id).then(function(sitename){
               $scope.SiteName = sitename.data.name ;
            });

            $scope.isActive =function () {

            };
            $scope.hui = function(content) {
                var chlen = JSON.parse(content).modeling;
                object.text("");
                parseHtml(chlen,myHtml);

            };
        }
    ]
});