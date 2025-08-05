/**
 * Analytics configuration
 *
 * This file contains configuration for both internal analytics and third-party analytics integration.
 * You can enable/disable features and configure third-party services here.
 */

const analyticsConfig = {
  // Internal analytics
  internal: {
    enabled: true, // Whether to use internal view counting
    trackUniqueVisitors: false, // Not implemented yet, could be added later
  },

  // Google Analytics configuration
  googleAnalytics: {
    enabled: false,
    trackingId: '', // Your Google Analytics tracking ID (e.g., 'G-XXXXXXXXXX')
  },

  // Umami Analytics configuration
  umami: {
    enabled: false,
    websiteId: '', // Your Umami website ID
    scriptUrl: '', // URL to your Umami script
  },

  // Plausible Analytics configuration
  plausible: {
    enabled: false,
    domain: '', // Your website domain
  },

  // Add more third-party analytics services as needed
};

export default analyticsConfig;
