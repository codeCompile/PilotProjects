'use strict';

angular.module('myApp.singleBlog', ['ui.router'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html'
//   });
// }])

.service('autoSuggestService1', function ($http) {
           var url = 'http://thinktank.azurewebsites.net/api/AutoSuggest/GetAutoSuggestionItems';
    return {
        get: function (inputStr) {
            return $http.get(url, { params: { "input": inputStr } }).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('singleBlogController', function ($scope, autoSuggestService1) {
    //autoSuggestService.get('s').then(function (data) {
    //    $scope.items = data;
    //});
    $scope.name = '';
    $scope.onItemSelected = function ()
    {
        console.log('selected=' + $scope.name);
    }; 
})
.directive('singleBlogcontrol', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            bdata: '='
        },       
        templateUrl: "singleBlog/singleBlog.html"
        //template :  '<div> This is  <a href="#">{{data}}</a> blog </div>'
    };
});