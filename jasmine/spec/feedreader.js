/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); 
            expect(allFeeds.length).not.toBe(0);
            // Jasmine uses expect() with a variable passed inside it’s parenthesis for the item being tested.
            // toBeDefined() checks if whether or not the variable is defined.
            // we then check the .length property of allFeeds with .not.toBe(0) 
            // to “expect” a value for the length variable to be greater than 0. 
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined(); //Same as with are defined, but focused on the url defintion.
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //Same as before, but focused on the name defintions.
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function (){
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('is hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true); //checks for the menu hidden class on the body
        });


        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('toggles on and off', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            
            menu.click(); //simulates a click on the menu icon link.
            expect(body.classList.contains('menu-hidden')).toBe(false); // tests for the toggle "on"
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true); // tests for the toggle "off"
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        })
        //for this function, we call loadFeed() for the first index, 0, and done.
        // Jasmine's done let’s our test know that before each function has “finished” 
        // and we proceed with our test, and not after. 

        it('completes work', function() {
            const feed = document.querySelectorAll('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
            // feed's children property should have a length greater than 0, in order to be true.
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        
        beforeEach(function (done) { // you may also wish to convert this to ES6, which is totally doable!
            //loads the first feed and executes a function to push each article to `feedOne` array
            // remember, this is supposed to simulate asynchronous behavior
            loadFeed(0, function () { // feed 1 is actually at index position zero
                Array.from(feedly.children).forEach(function (feed) { // you could use specificity here, too, couldn't you?
                    // console.log(feed); // test it out
                    feedOne.push(feed.innerText); // we want the text of the element to evaluate against the next feed
                    // loads the second feed and executes a function to push each article to the `feedTwo` array
                    loadFeed(1, function () { // feed 2 at index position 1
                        Array.from(feedly.children).forEach(function (feed) { // also, look up Array.from on MDN to learn more about what it does :-)
                            feedTwo.push(feed.innerText);
                        });
                        console.log(feedOne); // test
                        console.log(feedTwo); // again, test -- what do you see when you look at the results?
                        // executes `done()` function to cease asynchronous operation and signal that processing has completed
                        done();
                    });
                });
            });
        });

        it('actually changes', function() {
            expect(feedOne).not.toEqual(feedTwo); // there are a few ways to do this, but I prefer toEqual since it doesn't test for strict equality
        });
    });
});
