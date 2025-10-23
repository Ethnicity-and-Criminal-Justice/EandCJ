/**
 * Browser Compatibility Script
 * Provides basic browser compatibility utilities and fixes
 */
(function() {
    'use strict';
    
    // Check if essential features are available
    if (typeof console === 'undefined') {
        window.console = {
            log: function() {},
            error: function() {},
            warn: function() {},
            info: function() {}
        };
    }
    
    // Fix portal site flag - convert string "false" to boolean false
    // This prevents unnecessary API calls to /portaluser/getCurrentPortalUser
    if (window.is_portal_site === "false") {
        window.is_portal_site = false;
    }
    
})();
