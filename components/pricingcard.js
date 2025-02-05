"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export const WaitlistModal = ({ isOpen, onClose, planTitle, features = [] }) => {
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
            <h2 className="text-2xl font-bold text-gray-900">
              {planTitle === "Demonstração Gratuita" ? "Agende sua demonstração" : "Entre para nossa lista de espera"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {planTitle === "Demonstração Gratuita" 
                ? "Preencha seus dados para agendar uma demonstração personalizada do Live Plus."
                : `Inscreva-se para o plano ${planTitle} e seja um dos primeiros a saber quando estiver disponível.`
              }
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
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#009ee3] focus:ring-offset-2"
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

export const PricingCard = ({ 
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
      <div className={`p-8 rounded-xl text-center relative shadow-lg flex flex-col justify-between h-full ${
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
        <div className="space-y-4 text-left text-gray-600 flex-grow">
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
        <div className="mt-auto pt-8">
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
        features={features}
      />
    </>
  );
};

export default PricingCard;