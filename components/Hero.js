"use client"

import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center px-4 py-16 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Otimize o seu dia a dia de maneira eficiente!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A solução completa de gestão para Clínicas, Hospitais e Profissionais da Saúde independentes, tudo em um único lugar.
          </p>
          <button className="bg-[#009ee3] text-white py-3 px-8 rounded-lg text-lg hover:bg-[#008cc7] transition-colors duration-300">
            Experimente Agora
          </button>
        </div>
        <div className="hidden md:block">
          <img 
            src="/image.png"
            alt="Profissionais de saúde usando tecnologia" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;