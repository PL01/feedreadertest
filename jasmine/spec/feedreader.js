/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            // Jasmine uses expect() with a variable passed inside it’s parenthesis for the item being tested.
            // toBeDefined() checks if whether or not the variable is defined.
            // we then check the .length property of allFeeds with .not.toBe(0) 
            // to “expect” a value for the length variable to be greater than 0. 
        });

        it('Should have a defined URL', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); //Same as with are defined, but focused on the url defintion.
            }
        });

        it('name defined', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //Same as before, but focused on the name defintions.
            }
        });
    });



    describe('The menu', () => {
        it('is hidden', () => {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true); //checks for the menu hidden class on the body
        });

        it('toggles on and off', () => {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click(); //simulates a click on the menu icon link.
            expect(body.classList.contains('menu-hidden')).toBe(false); // tests for the toggle "on"
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true); // tests for the toggle "off"
        });
    });



    describe('Initial Entries', () => {
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        });
        //for this function, we call loadFeed() for the first index, 0, and done.
        // Jasmine's 'done' let’s our test know that each function has “finished” 
        // and we proceed with our test, and not after. 

        it('completes work', () => {
            const feed = document.querySelectorAll('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
            // feed's children property should have a length greater than 0, in order to be true.
        });
    });

    describe('News Feed Selection', () => {
        // Establishes DOM elements and empty arrays for later testing. 
        const feedly = document.querySelector('.feed');
        const feedOne = [];
        const feedTwo = [];
        // `done` is passed as an argument to the `beforeEach` function
        beforeEach((done) => {
            //loads the first feed and executes a function to push each article to `feedOne` array
            // remember, this is supposed to simulate asynchronous behavior
            loadFeed(0, () => { // feed 1 is  at index[0]
                Array.from(feedly.children).forEach(function (feed) {
                    feedOne.push(feed.innerText);
                    // we want the text of the element to evaluate against the next feed
                    // loads the second feed and executes a function to push each article to the `feedTwo` array
                    loadFeed(1, () => { // feed 2 at index[1]
                        Array.from(feedly.children).forEach(function (feed) {
                            feedTwo.push(feed.innerText);
                        });
                        console.log(feedOne); // test1
                        console.log(feedTwo); // test2
                        // executes `done()` function to cease asynchronous operation and signal that processing has completed
                        done();
                    });
                });
            });
        });
        it('actually changes', () => {
            expect(feedOne).not.toEqual(feedTwo);
        });
    });
}());