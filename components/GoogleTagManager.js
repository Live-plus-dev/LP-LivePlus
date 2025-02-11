import React, { useEffect } from 'react';

const GTM_ID = 'GTM-MZC8BMFS';

const GoogleTagManager = () => {
  useEffect(() => {
    // Initialize GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Add GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
};

export default GoogleTagManager;