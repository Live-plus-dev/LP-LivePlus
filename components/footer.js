"use client"

import React from 'react';

const Footer = () => {
  const footerLinks = {
    produto: [
      { name: "Funcionalidades", href: "#" },
      { name: "Preços", href: "#" },
      { name: "Demonstração", href: "#" },
      { name: "Atualizações", href: "#" },
    ],
    suporte: [
      { name: "Central de Ajuda", href: "#" },
      { name: "Tutoriais", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Contato", href: "#" },
    ],
    legal: [
      { name: "Termos de Uso", href: "#" },
      { name: "Privacidade", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licenças", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-50 px-4 py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Life Plus</h3>
            <p className="text-gray-600 mb-4">
              Transformando a gestão de clínicas com tecnologia e inovação.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#009ee3]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#009ee3]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Produto</h3>
            <ul className="space-y-2">
              {footerLinks.produto.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-600 hover:text-[#009ee3]">
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
                  <a href={link.href} className="text-gray-600 hover:text-[#009ee3]">
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
                  <a href={link.href} className="text-gray-600 hover:text-[#009ee3]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2024 Life Plus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;