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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each has URL', function() {
            for (i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each has name', function() {
            for (i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        /* test that ensures the menu element is
         * hidden by default.
         */
        it('hidden by default', function() {
            expect($("body").attr("class")).toBe("menu-hidden");
        });

         /* Test ensures the menu changes
          * visibility when the menu icon is clicked.*/
        it('visible on click', function() {
            //checks if the menu display when clicked
            $('a.menu-icon-link').click();
            expect($("body").attr("class")).not.toBe("menu-hidden");
            //check if it hide when clicked again
            $('a.menu-icon-link').click();
            expect($("body").attr("class")).toBe("menu-hidden");
        });
    });

    describe('Initial Entries', function() {
        /* loadFeed() is asynchronous so this test wil require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        /* Check that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        it("loading", function(){
            //expect that there is at least one .entry in .feed
            expect($('.feed').children(".entry")).toBeDefined();
        });
    });

    describe('New Feed Selection', function() {
        /* Test that checks when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/
        var origFeed = $('.feed');
        var newFeed;
        beforeEach(function(done) {
            loadFeed(1, function(){
                newFeed = $('.feed');
                done();
            });
        });
        it("loading", function(){
            expect(origFeed).not.toBe(newFeed);
        });
    });
}());
