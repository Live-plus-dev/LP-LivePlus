import React from 'react';
import { Card } from "@/components/ui/card";

const FeatureCard = ({ emoji, title, description }) => (
  <Card className="p-6 bg-white shadow-lg rounded-xl text-center">
    <div className="text-4xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

const PricingCard = ({ title, price, description, buttonText, featured = false }) => (
  <Card className={`p-6 rounded-xl text-center ${featured ? 'bg-[#009ee3] text-white' : 'bg-white'}`}>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-4">{price}</div>
    <p className={`mb-6 ${featured ? 'text-white' : 'text-gray-600'}`}>{description}</p>
    <button 
      className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 ${
        featured 
          ? 'bg-white text-[#009ee3] hover:bg-gray-100' 
          : 'bg-[#009ee3] text-white hover:bg-[#008cc7]'
      }`}
    >
      {buttonText}
    </button>
  </Card>
);

const LifePlusLanding = () => {
  return (
    <div className="font-['Segoe UI']">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 py-16 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
              src="/api/placeholder/600/400" 
              alt="Profissionais de saúde usando tecnologia" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-[#009ee3]/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              emoji="🗓️"
              title="Gestão de Agendas"
              description="Organize os compromissos dos profissionais de forma clara e sem conflitos."
            />
            <FeatureCard
              emoji="💳"
              title="Gestão Financeira"
              description="Controle contas a pagar, a receber e o fluxo de caixa com facilidade."
            />
            <FeatureCard
              emoji="💻"
              title="Telemedicina"
              description="Realize consultas online com segurança e praticidade."
            />
          </div>
        </div>
      </section>

      {/* Plans Comparison Table */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="p-4 text-left">Funcionalidades</th>
                  <th className="p-4 text-center">Básico</th>
                  <th className="p-4 text-center">Pro</th>
                  <th className="p-4 text-center bg-[#009ee3] text-white rounded-t-lg">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Gestão de Agendas</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center bg-[#009ee3] text-white">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Controle Financeiro</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✔️</td>
                  <td className="p-4 text-center bg-[#009ee3] text-white">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Telemedicina</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center bg-[#009ee3] text-white">✔️</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Gestão de Estoque</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center bg-[#009ee3] text-white rounded-b-lg">✔️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 bg-[#009ee3]/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Básico"
              price="R$199/mês"
              description="Funcionalidades essenciais para começar."
              buttonText="Comece Agora"
            />
            <PricingCard
              title="Pro"
              price="R$399/mês"
              description="Para clínicas que precisam de controle avançado."
              buttonText="Experimente Agora"
            />
            <PricingCard
              title="Premium"
              price="R$599/mês"
              description="Tudo que sua clínica precisa em um só lugar."
              buttonText="Assine Já"
              featured={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifePlusLanding;