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
        'Flash',
        function ($scope, dataService, $stateParams, $state, Flash) {
            var object = angular.element(document.getElementById('putHtml'));
            var parseHtml = function(chlen)
            {
                var myHtml='';
                myHtml += "<div class='col-md-12 col-lg-12 col-sm-12'>";
                myHtml += "<div class='row'>";
                angular.forEach(chlen, function(item){
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
                                myHtml += parseHtml(subitem);
                                myHtml += "</div>";
                            });
                            break;
                        }
                    }
                    myHtml += "</div>";
                    myHtml += "</div>";
                });
                return myHtml;
            };
            dataService.get('/site/'+ $state.params.id +'/pages').then(function(obj){
               $scope.SiteData = obj.data;
               var  first = JSON.parse(obj.data[0].content).modeling;
               object.append(parseHtml(first));
            });
            dataService.get('/sites/'+ $state.params.id).then(function(sitename){
               $scope.SiteName = sitename.data.name ;
            });

            $scope.isActive =function () {

            };
            $scope.hui = function(content) {
                var chlen = JSON.parse(content).modeling;
                object.text("");
                object.append(parseHtml(chlen));
            };

            dataService.get('/sites/'+$state.params.id+ '/comments').then(function(comments){
                $scope.comments = comments.data;
                console.log($scope.comments);
            });

            $scope.addComment = function(){
                var commentObj ={
                    body: $scope.body,
                    user_id: user_id,
                    site_id: $state.params.id
                };
                dataService.post('/sites/'+ $state.params.id +'/comments', commentObj).then(function(comment){

                    console.log(comment);
                    if(comment.data.error){
                        alert('Comment can\'t be blank' );
                    }
                    else{
                        $scope.comments.push(comment.data);
                    }

                });
                $scope.body = '';
            };

            $scope.rait_star = function(raiting) {
                console.log(raiting);
                dataService.post('/site/'+ $state.params.id, {mark: raiting}).then(function(obj){
                });
                $scope.enableReadonly = true;
            }
        }
    ]
});