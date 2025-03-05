"use client"

import React from 'react';

const ComparisonTable = () => {
  const features = [
    
    {
      name: "Gestão de Agendas",
      starter: true,
      plus: true,
      pro: true
    },
    {
      name: "Gestão de Procedimentos",
      starter: true,
      plus: true,
      pro: true
    },
    {
      name: "Fluxo de Caixa",
      starter: true,
      plus: true,
      pro: true
    },
    {
      name: "Telemedicina",
      starter: true,
      plus: true,
      pro: true
    },
    {
      name: "Prontuário eletrônico",
      starter: false,
      plus: true,
      pro: true
    },
  
    
    {
      name: "Gestão de Performance",
      starter: false,
      plus: true,
      pro: true
    },
    {
      name: "Gestão de Estoques",
      starter: false,
      plus: true,
      pro: true
    },
    {
      name: "Integração com Email",
      starter: false,
      plus: true,
      pro: true
    },
    {
      name: "Gestão de Requisições de Funcionalidades",
      starter: false,
      plus: false,
      pro: true
    }
  ];

  return (
    <section className="px-4 py-16 bg-white">
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left text-gray-800">Funcionalidades</th>
                <th className="p-4 text-center text-gray-800">Starter</th>
                <th className="p-4 text-center text-gray-800">Plus</th>
                <th className="p-4 text-center text-gray-800 rounded-t-lg">Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{feature.name}</td>
                  <td className="p-4 text-center">
                    <span className={feature.starter ? "text-[#009ee3]" : "text-gray-400"}>
                      {feature.starter ? "✔" : "—"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={feature.plus ? "text-[#009ee3]" : "text-gray-400"}>
                      {feature.plus ? "✔" : "—"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={feature.pro ? "text-[#009ee3]" : "text-gray-400"}>
                      {feature.pro ? "✔" : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
