(function($) {
  $.fn.pathchange = function(handler) {                                         // can use $(window).bind("pathchange", fn) or $(window).pathchange(fn)
    return handler ? this.bind("pathchange", handler) : this.trigger("pathchange");
  };

  var my = $.pathchange = {                                                     // default options
    options: {
      useHistory: true,                                                         // whether we use HTML5 History Management to change the current path
      useHashchange: true,                                                      // whether we use HTML5 Hashchange to listen to the URL hash
      pollingInterval: 250,                                                     // when using Hashchange in browsers without it, how often to poll the hash (in ms)
      interceptLinks: true,                                                     // do we intercept all relative links to avoid some page reloads?
      disableHashLinks: true                                                    // do we ensure all links with href=# are not followed (this would mess with our history)?
    },

    init: function(options) {
      var lastHash;
      $.extend(my.options, options);

      if (my.options.useHistory && my.detectHistorySupport()) {                 // Listen to the HTML5 "popstate" event, if supported and desired
        $(window).bind("popstate", function(e) {
          $(window).trigger("pathchange");
        });
      }

      if (my.options.useHashchange) {                                           // Listen to the HTML5 "hashchange" event, if supported and desired
        $(window).bind("hashchange", function(e) {
          $(window).trigger("pathchange");
        });

        if (!my.detectHashchangeSupport()) {                                    // Hashchange support for older browsers (IE6/7)
          lastHash = window.location.hash;
          setInterval(function() {
            if (lastHash !== window.location.hash) {
              $(window).trigger("hashchange");
              lastHash = window.location.hash;
            }
          }, my.options.pollingInterval);
        }
      }

      /* Intercept all relative links on the page, to avoid unneccesary page refreshes                                THIS THROWS AN ERROR; DISABLING FOR NOW
      if (my.options.interceptLinks) {
        $("body").delegate("a[href^=/]", "click", function(e) {
          my.changeTo($(this).attr("href"));
          e.preventDefault();
        });
      }  */
      
      if (my.options.disableHashLinks) {                                        // Ensure all the href=# links on the page don't mess with things
        $("body").delegate("a[href=#]", "click", function(e) {
          e.preventDefault();
        });
      }
    },

    changeTo: function(path) {                                                  // Call to manually navigate the app somewhere
      if (my.options.useHistory && my.detectHistorySupport()) {                 // If we're using History Management, just push an entry
        window.history.pushState(null, null, path);
        $(window).trigger("pathchange");
      } else {
        if (path.indexOf("#") < 0) {                                            // Make sure there's a hash (going from foo.com#bar to foo.com would trigger a reload in Firefox, sadly)
          path += "#";
        }
        window.location.href = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + path;         // Otherwise, navigate to the new URL.  Might reload the browser.  Might trigger a hashchange.
      }
    },

    detectHistorySupport: function() {                                          // Simple feature detection for History Management (borrowed from Modernizr)
      return !!(window.history && history.pushState);
    },

    detectHashchangeSupport: function() {                                       // Simple feature detection for hashchange (adapted from Modernizr)
      var isSupported = "onhashchange" in window;
      if (!isSupported && window.setAttribute) {
        window.setAttribute("onhashchange", "return;");
        isSupported = typeof window.onhashchange === "function";
      }
      return isSupported;
    }
  };
}(jQuery));