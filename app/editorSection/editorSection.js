'use strict';
// Declare app level module which depends on views, and components
angular.module('editorApp',[])
.service('blogEditorService', function ($http) {
           var url = 'http://localhost:8082/aristoweb/api/createpost';
    return {
        get: function (inputStr) {
            return $http.get(url, { params: { "input": inputStr } }).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('blogEditorController',function ($scope,$http) {
    //autoSuggestService.get('s').then(function (data) {
    //    $scope.items = data;
    //});
    $scope.addNewBlogPostAsync = function(){		
		//$scope.companies.push({ 'name':$scope.name, 'employees': $scope.employees, 'headoffice':$scope.headoffice });
		// Writing it to the server
		//		        yyyy-MM-dd'T'HH:mm:ss.SSSZ
        var editorData = CKEDITOR.instances.editor1.document.getBody().getHtml();
		var dataObj = {
				articleContent : $scope.blogAllText,
                articleTitle : $scope.blogTitle,
                postContent : editorData,
                postType : "Info",
                postDate : $scope.currentformattedTime ,
                postStatus : "New",
                postUserName: "user1"
		};	
console.log('Captured ata ' , dataObj);
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
