"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WaitlistModal } from '@/components/pricingcard';
import CrispChat from '@/components/CrispChat';

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const demoFeatures = [
    "Acesso completo ao sistema",
    "Suporte personalizado",
    "Treinamento da equipe",
    "Migração de dados",
    "Configuração inicial"
  ];

  const NavigationLinks = ({ isMobile = false }) => (
    <>
      <Link 
        href="/#Planos" 
        className={`text-gray-700 hover:text-[#009ee3] ${isMobile ? 'text-center' : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        Planos
      </Link>
      <Link 
        href="/sobre" 
        className={`text-gray-700 hover:text-[#009ee3] ${isMobile ? 'text-center' : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        Sobre nós
      </Link>
      <Link 
        href="/#footer" 
        className={`text-gray-700 hover:text-[#009ee3] ${isMobile ? 'text-center' : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        Contato
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <CrispChat />

      {/* Navbar */}
      <nav className="w-full flex justify-center mt-8">
        <div className="w-[80%] bg-white shadow-lg rounded-full px-4">
          <div className="flex items-center h-20 relative">
            <div className="hidden md:flex items-center space-x-8 ml-4">
              <NavigationLinks />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.png"
                  alt="Logo"
                  width={200}
                  height={200}
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center ml-auto">
              <a href='/#Planos'>

            
              <button
            
                className="bg-[#009ee3] text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                Cadastre-se
              </button>
              </a>
            </div>

            <div className="md:hidden ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#009ee3] focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 mt-4 bg-white shadow-lg rounded-xl">
              <div className="flex flex-col space-y-4 p-4">
                <NavigationLinks isMobile={true} />
                <a href='/#Planos'>

               
                <button
                  className="bg-[#009ee3] text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors text-center"
                >
                  Cadastre-se
                </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div 
          id="hero"
          data-animate
          className={`text-center mb-20 ${
            isVisible.hero ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#009ee3] mb-6">
            Quem Somos
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A Live Plus nasceu com um propósito claro: transformar a gestão na área da saúde.
          </p>
        </div>

        {/* Mission Section */}
        <div 
          id="mission"
          data-animate
          className={`bg-[#009ee3] text-white rounded-2xl p-8 mb-20 ${
            isVisible.mission ? 'animate-slideRight opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-lg">
            Ser o maior ecossistema de gestão e melhoria da saúde no mundo, oferecendo uma plataforma 
            que integre e otimize todos os processos envolvidos no cuidado aos pacientes e na 
            administração de instituições de saúde.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            {
              title: "O Cliente em Primeiro Lugar",
              content: "Colocamos o cliente no coração de nossas decisões."
            },
            {
              title: "Velocidade com Propósito",
              content: "Agimos com agilidade e inteligência, buscando sempre um equilíbrio entre rapidez e qualidade."
            },
            {
              title: "Evolução Contínua",
              content: "Nunca estamos satisfeitos com o status quo. A busca pela melhoria constante é parte da nossa essência."
            },
            {
              title: "Inovação na Prática",
              content: "Desafiamos o convencional e questionamos os limites."
            }
          ].map((value, index) => (
            <div
              key={index}
              id={`value-${index}`}
              data-animate
              className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#009ee3] ${
                isVisible[`value-${index}`] ? 'animate-slideUp opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="text-xl font-bold text-[#009ee3] mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.content}</p>
            </div>
          ))}
        </div>

        {/* Future Section */}
        <div 
          id="future"
          data-animate
          className={`text-center ${
            isVisible.future ? 'animate-fadeIn opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold text-[#009ee3] mb-6">O Futuro da Saúde</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Na Live Plus, acreditamos que o futuro da saúde passa por uma gestão integrada e inovadora. 
            Queremos ser a plataforma que conecta todos os elos da cadeia de cuidados, criando um 
            ambiente mais organizado, eficiente e colaborativo.
          </p>
        </div>
      </main>

      {/* Modal */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planTitle="Cadastro Live Plus"
        features={demoFeatures}
      />

      {/* Animations */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideRight {
          animation: slideRight 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;