"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqData = [
    {
      question: "Como o Live Plus pode ajudar na gestão da minha clínica?",
      answer: "O Live Plus oferece um conjunto completo de ferramentas para gestão de clínicas, incluindo agendamento de consultas, gestão financeira, prontuário eletrônico e telemedicina. Nossa plataforma ajuda a otimizar processos, reduzir custos operacionais e melhorar a experiência dos pacientes."
    },
    {
      question: "Quanto tempo leva para implementar o sistema?",
      answer: "A implementação básica do Live Plus pode ser feita em apenas 24 horas. Oferecemos treinamento completo para sua equipe e suporte durante todo o processo de transição. A migração de dados existentes, quando necessária, é realizada de forma segura e eficiente."
    },
    {
      question: "O sistema é seguro e atende às regulamentações de saúde?",
      answer: "Sim, o Live Plus segue todas as normas da LGPD e as regulamentações específicas do setor de saúde. Utilizamos criptografia de ponta a ponta, backup automático e servidores seguros para proteger os dados dos pacientes e da clínica."
    },
    {
      question: "Como funciona a integração com convênios médicos?",
      answer: "Nossa plataforma oferece integração automática com os principais convênios médicos do mercado, permitindo faturamento eletrônico, verificação de elegibilidade em tempo real e gestão completa do processo de autorização de procedimentos."
    },
    {
      question: "Posso acessar o sistema de qualquer lugar?",
      answer: "Sim, o Live Plus é uma solução 100% na nuvem, permitindo acesso seguro de qualquer dispositivo com conexão à internet. Você pode gerenciar sua clínica, acessar prontuários e realizar atendimentos mesmo quando estiver fora do consultório."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 p-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-24 text-gray-800">
        Perguntas Frequentes
      </h2>
      
      {faqData.map((item, index) => (
        <div 
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-gray-50"
          >
            <span className="text-lg font-medium text-gray-800">{item.question}</span>
            <ChevronDown 
              className={`w-5 h-5 transform transition-transform duration-200 text-[#009ee3] ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;