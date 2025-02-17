$(function() {
    // test suite for RSS feeds
    describe('RSS Feeds', function() {
        // test whether allFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test whether all feeds are defined and URL is not empty
        it('feed URLs are defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
         });

        // test whether feed names are defined and not empty
        it('feed names are defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
         });
    });

    // test suite for menu
    describe('The menu', function() {
        // test whether menu is hidden by default
        it('is hidden by default', function() {
            expect(document.body.classList).toContain('menu-hidden'); 
        })

        // test whether menu displays/hides when clicked
        it('displays/hides when clicked', function() {
            let menu = document.querySelector('.menu-icon-link');
            
            // simulate click, menu should NOT be hidden
            menu.click();
            expect(document.body.classList).not.toContain('menu-hidden');

            // simulate click, menu SHOULD be hidden
            menu.click();
            expect(document.body.classList).toContain('menu-hidden');
        });

        // test suite for Initial Entries
        describe('Initial Entries', function() {
            // run loadFeed to completion before executing test
            beforeEach(function(done) {
                loadFeed(0, done);
            })
            // test whether there is at least a single .entry element after loadFeed completes
            it('contains at least one entry', function() {
                expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            })
        })

        // test suite for New Feed Selection
        describe('New Feed Selection', function() {
            // run loadFeed to completion before executing test
            let firstEntry;
            beforeEach(function(done) {
                loadFeed(0,function() {
                    firstEntry = document.querySelectorAll('.entry-link')[0];
                    loadFeed(1,done); //load the next feed
                })
            })
            // test whether content changes following loadFeed call
            it('loads new content', function() {
                let nextEntry = document.querySelectorAll('.entry-link')[0];
                expect(firstEntry).not.toEqual(nextEntry);
            })
        })
    })
}());
