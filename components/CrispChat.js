'use client'

import Script from 'next/script'

export default function CrispChat() {
  return (
    <Script strategy="afterInteractive">
      {`
        window.$crisp=[];
        window.CRISP_WEBSITE_ID="68942744-8b38-44f7-b5a8-530d2444c675";
        (function(){
          d=document;
          s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";
          s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  )
}