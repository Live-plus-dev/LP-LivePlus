"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqData = [
    {
      question: "Por que escolher o Live Plus para minha clínica ou hospital?",
      answer: "O Live Plus é a solução completa para otimizar a gestão da sua clínica ou hospital. Com funcionalidades como controle financeiro, gestão de agendas, estoques, telemedicina e análise de performance, ele reduz custos, aumenta a eficiência e melhora a experiência dos pacientes. Tudo isso em uma única plataforma, fácil de usar e adaptável ao seu negócio."
    },
    {
      question: "Como o Live Plus pode melhorar o controle financeiro do meu negócio?",
      answer: "O Live Plus oferece ferramentas poderosas para Contas a Receber e Contas a Pagar, com relatórios detalhados, alertas de vencimento e agendamento de pagamentos. Além disso, o Fluxo de Caixa é monitorado em tempo real, com projeções financeiras que ajudam você a tomar decisões mais estratégicas e garantir a saúde financeira da sua clínica."
    },
    {
      question: "O Live Plus realmente facilita a gestão de agendas?",
      answer: "Com certeza! O sistema elimina a confusão de agendas manuais, permitindo agendamentos, edições e cancelamentos em poucos cliques. Você visualiza a agenda de cada profissional de forma clara, evita conflitos de horários e garante que nenhum compromisso seja esquecido. Tudo isso resulta em mais produtividade e menos estresse para sua equipe."
    },
    {
      question: "Como o Live Plus ajuda a reduzir custos com estoque?",
      answer: "O módulo de Gestão de Estoques do Live Plus evita desperdícios e falta de materiais críticos. O sistema alerta sobre níveis baixos de estoque, controla a validade de medicamentos e gera relatórios de consumo para que você compre apenas o necessário. Além disso, a integração com fornecedores permite reposição automática, economizando tempo e dinheiro."
    },
    {
      question: "O Live Plus é adequado para oferecer telemedicina?",
      answer: "Sim! O Live Plus inclui uma plataforma de telemedicina segura e integrada, que permite realizar consultas à distância com total conformidade com a LGPD. Você pode agendar consultas, enviar convites para videoconferências e registrar prontuários digitais diretamente no sistema. É a solução ideal para expandir seus serviços e atender mais pacientes, onde quer que estejam."
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