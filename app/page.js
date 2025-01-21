"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

// WaitlistModal Component (must be defined first)
const WaitlistModal = ({ isOpen, onClose, planTitle }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, plan: planTitle }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '' });
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Entre para nossa lista de espera</h2>
            <p className="mt-2 text-sm text-gray-500">
              Inscreva-se para o plano {planTitle} e seja um dos primeiros a saber quando estiver disponível.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center p-6 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                  className="rounded-full bg-green-100 p-3"
                >
                  <Check className="h-6 w-6 text-green-600" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-gray-900"
                >
                  Obrigado pelo interesse!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-gray-500"
                >
                  Entraremos em contato através do email: {formData.email}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleClose}
                  className="mt-4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#009ee3] focus:ring-offset-2"
                >
                  Fechar
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#009ee3] focus:outline-none focus:ring-1 focus:ring-[#009ee3]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#009ee3] focus:outline-none focus:ring-1 focus:ring-[#009ee3]"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 rounded-lg bg-[#009ee3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#008cc7] focus:outline-none focus:ring-2 focus:ring-[#009ee3] focus:ring-offset-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Enviando...</span>
                      </motion.div>
                    ) : (
                      'Enviar'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#009ee3] focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// FeatureCard Component
const FeatureCard = ({ imageUrl, title, description }) => (
  <div className="p-6 bg-white shadow-lg rounded-xl text-center">
    <div className="p-4 bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
      <Image
        src={imageUrl}
        alt={title}
        width={48}
        height={48}
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// PricingCard Component
const PricingCard = ({ 
  title, 
  subtitle,
  price, 
  period,
  features,
  buttonText, 
  featured = false,
  tag = null 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`p-8 rounded-xl text-center h-full relative shadow-lg ${
        featured ? 'bg-white text-gray-800 border-2 border-[#009ee3]' : 'bg-white'
      }`}>
        {tag && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-yellow-400 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
              {tag}
            </span>
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm mb-6 h-12 text-gray-600">{subtitle}</p>
        <div className="mb-2 text-gray-800">
          <span className="text-3xl font-bold">{price}</span>
        </div>
        <p className="text-sm mb-8 text-gray-600">{period}</p>
        <div className="space-y-4 mb-8 text-left text-gray-600">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg
                className="h-5 w-5 mr-2 mt-1 text-[#009ee3]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-6 text-lg font-medium rounded-lg transition-colors duration-300 ${
              featured 
                ? 'bg-white text-[#009ee3] hover:bg-gray-100 border-2 border-[#009ee3]' 
                : 'bg-[#009ee3] text-white hover:bg-[#008cc7]'
            }`}
          >
            {buttonText}
          </button>
          <a href="#" className="text-sm text-gray-600 hover:underline block mt-4">
            ou fale com um especialista
          </a>
        </div>
      </div>
      
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planTitle={title}
      />
    </>
  );
};

// Main Landing Page Component
const LifePlusLanding = () => {
  const features = [
    {
      title: "Gestão de Agendas",
      description: "Organize os compromissos dos profissionais de forma clara e sem conflitos.",
      imageUrl: "https://em-content.zobj.net/source/animated-noto-color-emoji/356/alarm-clock_23f0.gif",
      alt: "Gestão de Agendas"
    },
    {
      title: "Gestão Financeira",
      description: "Controle contas a pagar, a receber e o fluxo de caixa com facilidade.",
      imageUrl: "https://em-content.zobj.net/source/animated-noto-color-emoji/356/money-with-wings_1f4b8.gif",
      alt: "Gestão Financeira"
    },
    {
      title: "Telemedicina",
      description: "Realize consultas online com segurança e praticidade.",
      imageUrl: "https://em-content.zobj.net/source/animated-noto-color-emoji/356/face-with-medical-mask_1f637.gif",
      alt: "Telemedicina"
    }
  ];

  return (
    <div className="font-['Segoe UI'] text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 py-16 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Life Plus: A Solução Completa para a Gestão de Clínicas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforme a eficiência e organização da sua clínica com um software moderno e intuitivo.
            </p>
            <button className="bg-[#009ee3] text-white py-3 px-8 rounded-lg text-lg hover:bg-[#008cc7] transition-colors duration-300">
              Experimente Agora
            </button>
          </div>
          <div className="hidden md:block">
            <img 
              src="/image.png"
              alt="Profissionais de saúde usando tecnologia" 
              className="w-full rounded-lg "
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                imageUrl={feature.imageUrl}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Table Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="p-4 text-left text-gray-800">Funcionalidades</th>
                  <th className="p-4 text-center text-gray-800">Básico</th>
                  <th className="p-4 text-center text-gray-800">Pro</th>
                  <th className="p-4 text-center text-gray-800 rounded-t-lg">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 text-gray-800">Gestão de Agendas</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-gray-800">Controle Financeiro</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center ">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-gray-800">Telemedicina</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-gray-800">Gestão de Estoque</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center  rounded-b-lg">✔️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              subtitle="Agenda, prontuário e prescrição integrados"
              price="R$99/mês"
              period="por profissional de saúde"
              features={[
                "Agenda, prontuário e prescrição integrados",
                "Página de Agendamento Online",
                "Perfil de Recepcionista grátis",
                "Segurança e Criptografia dos Dados"
              ]}
              buttonText="Selecionar plano"
            />
            <PricingCard
              title="Plus"
              subtitle="Otimize tempo e aumente a satisfação dos pacientes"
              price="R$129/mês"
              period="por profissional de saúde"
              features={[
                "Tudo disponível no Starter",
                "Lembrete e Confirmação pelo Whatsapp ©",
                "Geração de guias e lotes no padrão TISS",
                "Pesquisa de Satisfação"
              ]}
              featured={true}
              tag="Mais escolhido"
              buttonText="Selecionar plano"
            />
            <PricingCard
              title="Pro"
              subtitle="Tenha mais controle financeiro do consultório"
              price="R$169/mês"
              period="por profissional de saúde"
              features={[
                "Tudo disponível no Plus",
                "Lançamento financeiro direto da agenda",
                "Repasse Financeiro por Profissional",
                "Controle de Estoque"
              ]}
              buttonText="Testar grátis"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ainda tem dúvidas?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Agende uma demonstração gratuita com nossa equipe e descubra como o Life Plus pode transformar sua clínica
          </p>
          <button 
            className="bg-[#009ee3] text-white py-3 px-8 rounded-lg text-lg hover:bg-[#008cc7] transition-colors duration-300"
          >
            Agendar Demonstração
          </button>
        </div>
      </section>

      {/* Footer */}
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
                <a href="#" className="text-gray-600 hover:text-[#009ee3]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.623 3.872 10.328 9.092 11.63-.056-.162-.092-.35-.092-.583v-2.051c-.487 0-1.303 0-1.508 0-.821 0-1.551-.353-1.905-1.009-.393-.729-.461-1.844-1.435-2.526-.289-.227-.069-.486.264-.451.615.174 1.125.596 1.605 1.222.478.627.703.769 1.596.769.433 0 1.081-.025 1.691-.121.328-.833.895-1.6 1.588-1.962-3.996-.411-5.903-2.399-5.903-5.098 0-1.162.495-2.286 1.336-3.233-.276-.94-.623-2.857.106-3.587 1.798 0 2.885 1.166 3.146 1.481C9.868 6.762 10.89 6.5 12 6.5c1.11 0 2.132.262 2.88.668.26-.315 1.347-1.481 3.146-1.481.729.73.382 2.647.106 3.587.84.947 1.336 2.071 1.336 3.233 0 2.699-1.904 4.684-5.894 5.097C14.487 18.553 16 20.38 16 21.96v3.926c0 .16-.03.314-.084.45C19.998 24.425 24 18.831 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Funcionalidades</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Preços</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Demonstração</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Atualizações</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Tutoriais</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Privacidade</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Cookies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#009ee3]">Licenças</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>© 2024 Life Plus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LifePlusLanding;