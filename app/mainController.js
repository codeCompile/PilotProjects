'use strict';

angular.module('myApp.mainModule', ['ui.router'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html'
//   });
// }])

.service('autoSuggestService3', function ($http) {
           var url = 'http://thinktank.azurewebsites.net/api/AutoSuggest/GetAutoSuggestionItems';
    return {
        get: function (inputStr) {
            return $http.get(url, { params: { "input": inputStr } }).then(function (resp) {
                return resp.data; 
            });
        }
    };
})
.controller('mainController', function ($scope, autoSuggestService3) {
    //autoSuggestService.get('s').then(function (data) {
    //    $scope.items = data;

    $scope.currentActiveBlogs = ["1","2","3"];
});
