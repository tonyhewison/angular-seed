'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', '$filter', function($scope, $filter) {

        $scope.items = [];
        $scope.itemsToDo = 0;
        $scope.itemsDone = false;
        $scope.itemsDeleted = false;
        $scope.allDone = true;

        $scope.addItem = function() {
            if ($scope.toDoItem.length>0) {
                $scope.items.push({'title': $scope.toDoItem, 'done': false, 'deleted': false});
                $scope.toDoItem = '';
            }
            this.updateCounts();
        };

        $scope.changeItem = function() {
            this.updateCounts();
        };

        $scope.editItem = function(index) {
            if ($scope.items[index].title.length==0) {
                $scope.items.splice(index, 1);
            }
            this.updateCounts();
        };

        $scope.deleteItem = function(index) {
            $scope.items[index].deleted = true;
            this.updateCounts();
        };

        $scope.setAllDone = function () {
            var done = $scope.allDone;
            $filter('filter')($scope.items, { done: done, deleted: false }).forEach(function (item) {
                item.done = !done;
            });
            this.updateCounts();
        };

        $scope.clearDone = function() {
            var index = $scope.items.length;
            while (index--) {
                if ($scope.items[index].done == true) {
                    $scope.items.splice(index, 1);
                }
            }
            this.updateCounts();
        };

        $scope.clearDeleted = function() {
            var index = $scope.items.length;
            while (index--) {
                if ($scope.items[index].deleted == true) {
                    $scope.items.splice(index, 1);
                }
            }
            this.updateCounts();
        };

        $scope.updateCounts = function() {
            $scope.itemsToDo = $filter('filter')($scope.items, { done: false, deleted: false }).length;
            $scope.itemsDone = $filter('filter')($scope.items, { done: true, deleted: false }).length > 0;
            $scope.itemsDeleted = $filter('filter')($scope.items, { deleted: true }).length > 0;
            $scope.allDone = $scope.itemsToDo == 0 && $scope.itemsDone;
        };

    }])
    .controller('MyCtrl2', ['$scope', function($scope) {

    }]);