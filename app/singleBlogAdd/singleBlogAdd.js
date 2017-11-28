'use strict';

angular.module('myApp.singleBlogAdd', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])
.service('addEditBlogService', function ($http) {
           var url = 'http://thinktank.azurewebsites.net/api/AutoSuggest/GetAutoSuggestionItems';
    return {
        get: function (inputStr) {
            return $http.get(url, { params: { "input": inputStr } }).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('singleBlogAddController', [function($scope,addEditBlogService) {

}]);