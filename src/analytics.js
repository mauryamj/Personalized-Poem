// Google Analytics Utility Functions
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

export const GA_MEASUREMENT_ID = 'G-73P6KJGN32'; // TODO: Replace with your actual GA4 Measurement ID

/**
 * Track poem generation event
 * @param {string} name - The name entered by the user
 */
export const trackPoemGeneration = (name) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'generate_poem', {
            event_category: 'engagement',
            event_label: 'Poem Generated',
            value: name.length,
            name_length: name.length
        });
    }
};

/**
 * Track poem download event
 */
export const trackDownload = () => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'download_poem', {
            event_category: 'conversion',
            event_label: 'Poem Downloaded'
        });
    }
};

/**
 * Track Partner With Us button click
 */
export const trackPartnerClick = () => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'partner_interest', {
            event_category: 'engagement',
            event_label: 'Partner With Us Clicked'
        });
    }
};

/**
 * Track social media clicks
 * @param {string} platform - The social media platform (e.g., 'instagram')
 */
export const trackSocialClick = (platform) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'social_click', {
            event_category: 'engagement',
            event_label: `${platform} Link Clicked`,
            platform: platform
        });
    }
};

/**
 * Track page view
 * @param {string} page - The page path
 */
export const trackPageView = (page) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
            page_path: page
        });
    }
};
