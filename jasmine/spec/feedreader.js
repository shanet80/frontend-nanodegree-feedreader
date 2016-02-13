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
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through feeds in allFeeds and make sure URL
        *  is defined and not empty.
        */
        it('URL is defined', function(){
          allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });


        /* Loops through allFeeds and makes sure name
        *  is defined and not empty
        */
        it('Name is defined', function(){
          allFeeds.forEach(function(feed){
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function(){

        /* Test to check if menu element is hidden by default */

        it('Is hidden by default', function(){
          expect($('body').hasClass("menu-hidden")).toBe(True);
        })

         /* Test if menu changes visibility setting if clicked */

        it('should toggle visibility when clicked', function(){
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden').toBe(False));
          $('.menu-icon-link').trigger('click');
          expect($('body').hasClass('menu-hidden').toBe(True));
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

         /* This test makes sure the asynchronous process with loadFeed function
        *  loading is done first to make sure there is an element in .feed.
        */

        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, done);
        });


        it('should contain a feed element asynchronous', function(){
            expect($('.feed').length).not.toBe(0);
        });
    });

    /* Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

            // tests that new content is loaded by loadFeed().
            var $feedOne;
            var $feedTwo;

            beforeEach(function(done) {
                loadFeed(0, function() {
                    feedOne = $('.feed').html();
                    done();
                });
            });

            it('should change feed content after loading feed', function(done) {
                loadFeed(1, function() {
                    feedTwo = $('.feed').html();
                    expect(feedTwo).not.toEqual(feedOne);
                    done();
                });
            });
        });
}());
