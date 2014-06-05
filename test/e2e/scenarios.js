'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

    browser.get('index.html');

    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });


    describe('view1', function() {

        beforeEach(function() {
            browser.get('index.html#/view1');
        });


        it('should render view1 when user navigates to /view1', function() {

            // header text
            expect(element.all(by.css('[ng-view] header h1')).first().getText()).toMatch(/NICE To Do/);

            // summary text
            expect(element.all(by.css('[ng-view] main summary')).first().getText()).toMatch(/Nothing to do! Add one or get a coffee./);

            // input is present
            expect(element(by.id('toDoItemText')).isPresent()).toBe(true);

            // to do list is initially empty
            element.all(by.css('[ng-view] main ul li')).then(function(items) {
                expect(items.length).toBe(0);
            });

            // footer controls are initially hidden (by AngularJS)
            expect(element(by.css('[ng-view] footer.ng-hide')).isPresent()).toBe(true);

        });

        // TODO further UI tests required:
        // - typing an item and entering it creates an item and displays it in the list
        // - double-clicking an item title opens the edit box
        // - the enter key press closes the edit box
        // - the escape key press closes the edit box
        // - double-clicking an item title opens an edit box
        // - checking an item as done changes it's style
        // - hovering on an item shows it's delete button (unless it is marked deleted)
        // - clicking an item as deleted changes it's style
        // - the mark all as done checkbox appears only when there is one or more items in the list
        // - the clear done items button appears only when one or more item is done
        // - the clear deleted items button appears only when one or more item is deleted

    });

});
