"use client"

import React, { useState, useEffect } from 'react';
import SubscriptionHandler from './SubscriptionHandler';

const StarterModal = ({ isOpen, onClose, planTitle }) => {
  const [employeeCount, setEmployeeCount] = useState(1);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{planTitle}</h2>
            <p className="mt-2 text-sm text-gray-500">
              Selecione o número de profissionais para calcular o valor
            </p>
          </div>

          <div className="space-y-6">
            

            

            <div className="flex gap-4">
              <SubscriptionHandler
                plan="starter"
                employeeCount={employeeCount}
                onSuccess={() => {
                  console.log('Subscription successful');
                  onClose();
                }}
                onError={(error) => console.error('Subscription error:', error)}
              />
             
            </div>
          </div>
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

  const renderButton = () => {
    switch(title) {
      case 'Starter':
        return (
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-6 text-lg font-medium rounded-lg transition-colors duration-300 ${
              featured 
                ? 'bg-white text-[#009ee3] hover:bg-gray-100 border-2 border-[#009ee3]' 
                : 'bg-[#009ee3] text-white hover:bg-[#008cc7]'
            }`}
          >
            Selecionar Plano
          </button>
        );
      case 'Plus':
        return (
          <a href="https://calendly.com/contato-liveplus" className="block w-full">
          <button 
            className={`w-full py-6 text-lg font-medium rounded-lg transition-colors duration-300 ${
              featured 
                ? 'bg-white text-[#009ee3] hover:bg-gray-100 border-2 border-[#009ee3]' 
                : 'bg-[#009ee3] text-white hover:bg-[#008cc7]'
            }`}
          >
            
            Lançamento em breve
          </button>
          </a>
        );
      case 'Pro':
        return (
          <a href="https://calendly.com/contato-liveplus" className="block w-full">
            <button 
              className={`w-full py-6 text-lg font-medium rounded-lg transition-colors duration-300 ${
                featured 
                  ? 'bg-white text-[#009ee3] hover:bg-gray-100 border-2 border-[#009ee3]' 
                  : 'bg-[#009ee3] text-white hover:bg-[#008cc7]'
              }`}
            >
              {buttonText}
            </button>
          </a>
        );
      default:
        return null;
    }
  };

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
          {renderButton()}
          <a 
            href="https://calendly.com/contato-liveplus" 
            className="text-sm text-gray-600 hover:underline block mt-4"
          >
            ou fale com um especialista
          </a>
        </div>
      </div>
      
      {title === 'Starter' && (
        <StarterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planTitle={title}
        />
      )}
    </>
  );
};

export default PricingCard;