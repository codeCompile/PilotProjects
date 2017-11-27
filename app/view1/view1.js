'use strict';

angular.module('myApp.view1', ['ui.router'])

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
.controller('autoSuggestController1', function ($scope, autoSuggestService) {
    //autoSuggestService.get('s').then(function (data) {
    //    $scope.items = data;
    //});
    $scope.name = '';
    $scope.onItemSelected = function ()
    {
        console.log('selected=' + $scope.name);
    };
    $scope.onInputtext = function (input) 
    {
        if (input)
            autoSuggestService.get(input).then(function (data) {
                $scope.items = data;
            });
        else
            $scope.items = [];
    };
})

.directive('autosuggest1', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            items: '=',
            prompt: '@',
            title: '@',
            subtitle: '@',
            model: '=',
            onSelect: '&',
            onTyping: '='
        },
        link: function(scope, elem, attrs) {
            scope.handleSelection = function(selectedItem) {
                scope.model = selectedItem;
                scope.current = 0;
                scope.selected = true;
                $timeout(function() {
                    scope.onSelect();
                }, 200);
            };
            scope.handleNewInput = function (e,myValue) {                
                $timeout(function () {
                    scope.onTyping(myValue);
                }, 200);
            };
            scope.current = 0;
            scope.selected = true;
            scope.isCurrent = function(index) {
                return scope.current == index;
            };
            scope.setCurrent = function(index) {
                scope.current = index;
            };
        },
        templateUrl: "view1/templateAutoSuggest.html"
    };
});