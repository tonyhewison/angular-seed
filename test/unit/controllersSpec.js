'use strict';

describe('controllers', function(){

    beforeEach(module('myApp.controllers'));

    it('should create "MyCtrl1" controller', inject(function($controller) {

        var myCtrl1 = $controller('MyCtrl1', { $scope: {} });
        expect(myCtrl1).toBeDefined();

    }));

    it('should create "items" model with 0 todo items', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        expect(scope.items.length).toBe(0);
        expect(scope.itemsToDo).toBe(0);
        expect(scope.itemsDone).toBe(false);
        expect(scope.itemsDeleted).toBe(false);
        expect(scope.allDone).toBe(true);

    }));

    it('"addItem()" should not add an item if the title is empty', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope}),
            item = {'title': 'test item', 'done': false, 'deleted': false};

        scope.toDoItem = '';
        scope.addItem();
        expect(scope.items.length).toBe(0);

    }));

    it('"addItem()" should add an item', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope}),
            title = 'test title';

        scope.toDoItem = title;
        scope.addItem();
        expect(scope.items.length).toBe(1);
        expect(scope.itemsToDo).toBe(1);
        expect(scope.itemsDone).toBe(false);
        expect(scope.itemsDeleted).toBe(false);
        expect(scope.allDone).toBe(false);
        expect(scope.items[0].title).toBe(title);
        expect(scope.items[0].done).toBe(false);
        expect(scope.items[0].deleted).toBe(false);

    }));

    it('"changeItem()" should update "done" and "deleted" counts', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create items to change
        scope.toDoItem = 'test item 1';
        scope.addItem();
        scope.toDoItem = 'test item 2';
        scope.addItem();

        expect(scope.itemsToDo).toBe(2);
        expect(scope.itemsDone).toBe(false);
        expect(scope.allDone).toBe(false);

        // change items
        scope.items[0].done = true;
        scope.items[1].deleted = true;
        scope.changeItem();

        expect(scope.itemsToDo).toBe(0);
        expect(scope.itemsDone).toBe(true);
        expect(scope.itemsDeleted).toBe(true);
        expect(scope.allDone).toBe(true);

    }));

    it('"editItem()" should delete the edited item if it\'s title is empty', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create an item to change
        scope.toDoItem = 'test title';
        scope.addItem();

        // edit it
        scope.items[0].title = '';
        scope.editItem(0);

        expect(scope.items.length).toBe(0);

    }));

    it('"deleteItem()" should "delete" the item', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create an item to change
        scope.toDoItem = 'test title';
        scope.addItem();

        scope.deleteItem(0);

        expect(scope.itemsToDo).toBe(0);
        expect(scope.itemsDeleted).toBe(true);

    }));

    it('"setAllDone()" should toggle all items (except deleted) as done or not done', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create items
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();

        // delete item 1
        scope.deleteItem(0);

        expect(scope.itemsToDo).toBe(2);
        expect(scope.allDone).toBe(false);

        // toggle the non-deleted to done
        scope.setAllDone();

        expect(scope.itemsToDo).toBe(0);
        expect(scope.allDone).toBe(true);

        // toggle the non-deleted to not done
        scope.setAllDone();

        expect(scope.itemsToDo).toBe(2);
        expect(scope.allDone).toBe(false);

    }));

    it('"clearDone()" should clear all done (not deleted) items', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create items
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();

        // delete item 1
        scope.deleteItem(0);

        expect(scope.itemsToDo).toBe(2);

        // set the rest to done
        scope.setAllDone();

        // clear done
        scope.clearDone();

        expect(scope.itemsToDo).toBe(0);
        expect(scope.items.length).toBe(1);

    }));

    it('"clearDeleted()" should clear all deleted (not done) items', inject(function($controller) {

        var scope = {},
            myCtrl1 = $controller('MyCtrl1', {$scope:scope});

        // create items
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();
        scope.toDoItem = 'test title';
        scope.addItem();

        // delete item 1 and 2
        scope.deleteItem(0);
        scope.deleteItem(1);

        // set the rest to done
        scope.setAllDone();

        // clear deleted
        scope.clearDeleted();

        expect(scope.itemsToDo).toBe(0);
        expect(scope.items.length).toBe(1);

    }));

});
