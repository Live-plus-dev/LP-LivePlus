import React, { useEffect } from 'react';

const GoogleTag = () => {
  useEffect(() => {
    // Create script element for the Google tag
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16866755353';
    script1.async = true;
    
    // Create script element for the configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16866755353');
    `;
    
    // Append scripts to document head
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return null; // This component doesn't render anything visible
};

export default GoogleTag;