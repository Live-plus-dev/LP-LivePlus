"use client"

import React from 'react';

const Footer = () => {
  const footerLinks = {
    produto: [
      { name: "Funcionalidades", href: "#Features" },
      { name: "Preços", href: "#Planos" },
      { name: "Demonstração", href: "#Video-demo" },
    ],
    suporte: [
      { 
        name: "Central de Ajuda", 
        href: "/ajuda",
        onClick: () => window.location.href = "https://calendly.com/contato-liveplus"
      },
      { name: "FAQ", href: "#FAQ" },
      { name: "Contato", href: "#", onClick: () => window.$crisp.push(["do", "chat:open"]) },
    ],
    legal: [
      { name: "Termos de Uso e Privacidade", href: "/termos" },
    ],
  };

  const handleScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  };

  return (
    <footer className="bg-gray-50 px-4 py-12" id='footer'>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Live Plus</h3>
            <p className="text-gray-600 mb-4">
              Transformando a gestão de clínicas com tecnologia e inovação.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/live-plus-pro/" className="text-gray-600 hover:text-[#009ee3]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#009ee3]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Produto</h3>
            <ul className="space-y-2">
              {footerLinks.produto.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-gray-600 hover:text-[#009ee3]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.onClick) {
                        link.onClick();
                      } else {
                        handleScroll(e, link.href);
                      }
                    }}
                    className="text-gray-600 hover:text-[#009ee3]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-gray-600 hover:text-[#009ee3]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p className="footer-text">© {new Date().getFullYear()} Live plus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;