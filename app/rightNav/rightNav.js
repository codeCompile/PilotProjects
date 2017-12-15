angular.module('myApp.rightNavView', ['ui.router'])


.service('rightNavService', function ($http) {
           var url = AppConstants.Instance.serviceUrlAllBlogs;
    return {
        get: function () {
            return $http.get(url).then(function (resp) {
                return resp.data; 
            })},
        postSelected: function (inputId) {
            return $http.get(AppConstants.Instance.selectedPostService,{params : { "postId" : inputId}}).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('rightNavController', function ($scope,rightNavService,sharedService) {
    rightNavService.get().then(function (data) {
        $scope.allPostitems = data;
    

$scope.recentPostItems = $scope.allPostitems.map(function(a) {return { id : a.post_ID, value:a.articleTitle};});
$scope.recentArchieveList = $scope.allPostitems.map(function(a) {return { id : a.post_ID, value:a.articleTitle};});
$scope.recentCategogyList=  $scope.allPostitems.map(function(a) {return { id : a.post_ID, value:a.articleTitle};});


});

$scope.postSelectClicked = function(inputPostid)
{
rightNavService.postSelected(inputPostid).then(function (data) {
        sharedService.newUpdatePublish(data.post_ID, data.postContent);    
})};

/*
     $scope.recentPostItems = ["Aliquam tincidunt mauris",
		"Vestibulum auctor dapibus  lipsum",
		"Nunc dignissim risus consecu",
		"Cras ornare tristiqu"];
*/
	 $scope.recentCommentItems = ["<a href=\"#\">Amada Doe </a> on <a href=\"#\">Hello World!</a>",
					 "<a href=\"#\">Peter Doe </a> on <a href=\"#\"> Photography</a>",
					 "<a href=\"#\">Steve Roberts  </a> on <a href=\"#\">HTML5/CSS3</a>"];

  /*  $scope.recentArchieveList = ["October 2013",
"September 2013",
"August 2013",
"July 2013"];

$scope.recentCategogyList = ["Vivamus vestibulum nulla"];*/

});