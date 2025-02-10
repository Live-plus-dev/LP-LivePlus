import React, { useEffect } from 'react';

const AnalyticsGoogle = () => {
  useEffect(() => {
    // Create script element for the main Google Analytics tag
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XFV1ZB1KWL';
    script1.async = true;
    document.head.appendChild(script1);

    // Initialize dataLayer and define gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    
    // Configure Google Analytics
    gtag('js', new Date());
    gtag('config', 'G-XFV1ZB1KWL');

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.head.removeChild(script1);
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
};

export default AnalyticsGoogle;