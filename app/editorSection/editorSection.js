'use strict';

// Declare app level module which depends on views, and components
angular.module('editorApp', [
])
.service('blogEditorService', function ($http) {
           var url = 'http://thinktank.azurewebsites.net/api/AutoSuggest/GetAutoSuggestionItems';
    return {
        get: function (inputStr) {
            return $http.get(url, { params: { "input": inputStr } }).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('blogEditorController', function ($scope, blogEditorService) {
    //autoSuggestService.get('s').then(function (data) {
    //    $scope.items = data;
    //});
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
var t1 = date.toLocaleTimeString("en-us", options);
console.log(t1); 
return t1;
}(); 
});
