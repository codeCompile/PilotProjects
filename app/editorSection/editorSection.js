'use strict';
// Declare app level module which depends on views, and components
angular.module('editorApp',[])
.service('blogEditorService', function ($http) {
           var url = AppConstants.Instance.postIdofallPostData;
    return {
        getPostId: function () {
            return $http.get(url).then(function (resp) {               
                return resp.data; 
            });
        },
         postSelected: function (inputId) {
            return $http.get(AppConstants.Instance.selectedPostService,{params : { "postId" : inputId}}).then(function (resp) {
                return resp.data; 
            })
         }
    };
})
.controller('blogEditorController',function ($scope,$http,blogEditorService) {
    $scope.listOfIdsPosts = "";
    blogEditorService.getPostId().then(function (data) {
        console.log("Posts data received ");
        $scope.listOfIdsPosts = data;
    });
    
$scope.OnPostSelected = function()
{
console.log(" Selected post in editing section: ", $scope.selectedpostID);
 blogEditorService.postSelected($scope.selectedpostID.post_ID).then(function (data) {
        console.log("Selected post in editing section Post data received ",data);
    $scope.post_ID = data.post_ID;
    $scope.blogTitle = data.articleTitle;
    $scope.postType = data.postType;
    $scope.postUserName = data.postUserName;
    $scope.postStatus = data.postStatus;
    $scope.currentformattedTime = data.postDate;
    $scope.blogTitle = data.articleTitle;
    $scope.blogAllText = data.articleContent;
    });
};

    $scope.blogTitle = "How to connect to Hibernate";
    $scope.allPostTypes = ["Info","General","Java","Angular","JavaScript","NET"];
    $scope.allPostStatus = ["NEW","UPDATE","DELETE"];
    $scope.postType = $scope.allPostTypes[0];
    $scope.postUserName = "AKSID";
    $scope.postStatus = $scope.allPostStatus[0];
    $scope.addNewBlogPostAsync = function(){		
		//$scope.companies.push({ 'name':$scope.name, 'employees': $scope.employees, 'headoffice':$scope.headoffice });
		// Writing it to the server
		//		        yyyy-MM-dd'T'HH:mm:ss.SSSZ
        var editorData = CKEDITOR.instances.editor1.document.getBody().getHtml();
		var dataObj = {
                post_ID: $scope.post_ID,
				articleContent : $scope.blogAllText,
                articleTitle : $scope.blogTitle,
                postContent : editorData,
                postType : $scope.postType,
                postDate : $scope.currentformattedTime ,
                postStatus : $scope.postStatus,
                postUserName: $scope.postUserName
		};	
console.log('Captured data ' , dataObj);
 var configs = { processdata:false,
      contentType: 'application/json',    
      cache: false };
		var res = $http.post(AppConstants.Instance.serviceUrlForCreatePost, dataObj,configs);        
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
	
	};

     $scope.blogAllText = function() {/*"Step 1: Create a Gist
Log in to Github
Click the Gist link at the top of the screen (or go to gist.github.com)
Fill out the file name (description is optional)
Enter your code
Click Create Public Gist
";*/}.toString().slice(15,-3);


$scope.currentformattedTime = function ()
{
    
  var date = new Date();  
let options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
};
var t1 = date.toISOString(); //toLocaleTimeString("en-us", options);
console.log(t1); 
return t1;
}(); 
});
