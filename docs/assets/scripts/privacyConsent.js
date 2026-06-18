// Microsoft clarity initialization
(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', 'x2yiacmi0l');

/** Contains the state of all consent as defined by the Material Theme. Used to see if consent has been granted for cookies. */
var consent = __md_get('__consent');

// Check if consent was granted for any managed analytics systems
if (consent) {
    // Check if consent was granted for Microsoft Clarity
    if (consent.clarity) {
        // The user accepted the cookie
        window.clarity('consentv2', { 'ad_Storage': 'granted', 'analytics_Storage': 'granted' });
    } else { // Disable Microsoft Clarity's enhanced features if the user rejected the cookie
        // The user rejected the cookie
        window.clarity('consentv2', { 'ad_Storage': 'denied', 'analytics_Storage': 'denied' });
    }

    // If Google Analytics is enabled, update the consent state for Google Analytics/Tag manager
    if (consent.analytics) { grantGoogleConsent() }
} else {
    // The user rejected the cookie
    window.clarity('consentv2', { 'ad_Storage': 'denied', 'analytics_Storage': 'denied' });
}
