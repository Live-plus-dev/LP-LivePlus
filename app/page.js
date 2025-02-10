"use client"

import React from 'react';
import Image from 'next/image';
import PricingCard from '@/components/pricingcard';
import FeatureCard from '@/components/featurecard';
import Hero from '@/components/Hero';
import ComparisonTable from '@/components/ComparisionTable';
import Footer from '@/components/footer';
import FAQAccordion from '@/components/Faq';
import DashboardMedico from '@/components/MedicalSelector';
import CrispChat from '@/components/CrispChat';
import AnalyticsGoogle from '@/components/AnalyticsGoogle';

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

      <CrispChat></CrispChat>
      <AnalyticsGoogle></AnalyticsGoogle>


      <Hero/>

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
      <section className="px-4 py-16 bg-white" >
      <DashboardMedico/>
      </section>
      <div id='Features'>
      <ComparisonTable />

      </div>

      
      <section className="px-4 py-16 bg-white">
  <div className="container mx-auto">
    <div className="grid md:grid-cols-3 gap-8" id='Planos'>
      <PricingCard
        title="Starter"
        subtitle="Agenda, prontuário e prescrição integrados"
        price="R$149/mês"
        period="por profissional de saúde"
        features={[
          "Contas a Receber",
          "Contas a Pagar",
          "Gestão de Agendas",
          "Gestão de Procedimentos",
          "Gestão financeira",
          "Telemedicina"
        ]}
        buttonText="Selecionar plano"
      />
      <PricingCard
        title="Plus"
        subtitle="Otimize tempo e aumente a satisfação dos pacientes"
        price="R$199/mês"
        period="por profissional de saúde"
        features={[
          "Tudo do Starter, mais:",
          "Prontuário eletrônico",
          "Histórico de Procedimentos",
          "Gestão de Retornos",
          "Gestão de Performance",
          "Gestão de Estoques",
          "Integração com WhatsApp",

        ]}
        featured={true}
        tag="Mais escolhido"
        buttonText="Selecionar plano"
      />
      <PricingCard
        title="Pro"
        subtitle="Tenha mais controle financeiro do consultório"
        price="Customizado"
        period=""
        features={[
          "Tudo do Plus, mais:",
          "Gestão de Requisições de Funcionalidades",
          
         

        ]}
        buttonText="Selecionar Plano"
      />
    </div>
  </div>
</section>

      <div className='bg-white' id='FAQ'>
        <FAQAccordion/>

      </div>

      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Pronto para transformar a gestão da sua clínica ou hospital?</h2>
          <p className="text-xl text-gray-600 mb-8">
          O Live Plus é a ferramenta que você precisa para crescer, reduzir custos e oferecer um atendimento de excelência. <strong>Agende uma demonstração gratuita</strong> e veja como podemos ajudar seu negócio a alcançar novos patamares
          </p>
          <a href="https://calendly.com/contato-liveplus">
            <button className="bg-[#009ee3] text-white py-3 px-8 rounded-lg text-lg hover:bg-[#008cc7] transition-colors duration-300">
              Agendar Demonstração
            </button>
          </a>
        </div>
      </section>

      <Footer/>

    </div>
  );
};

export default LifePlusLanding;