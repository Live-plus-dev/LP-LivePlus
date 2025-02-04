import React, { useState } from 'react';
import { Calendar, FileText, DollarSign, Video, Calendar as BookingIcon } from 'lucide-react';

const DashboardMedico = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      title: 'Agenda Médica',
      icon: Calendar,
      subtitle: 'Gerencie suas consultas médicas de forma eficiente',
      features: [
        'Visualize e gerencie todas as consultas em um só lugar',
        'Receba lembretes automáticos para próximas visitas',
        'Reagendamento fácil com interface arrasta e solta'
      ]
    },
    {
      title: 'Prontuário Eletrônico',
      icon: FileText,
      subtitle: 'Acesso seguro aos registros de saúde dos pacientes',
      features: [
        'Histórico completo do paciente ao seu alcance',
        'Gerenciamento digital de prescrições',
        'Integração com resultados de exames e imagens'
      ]
    },
    {
      title: 'Gestão Financeira',
      icon: DollarSign,
      subtitle: 'Simplifique as finanças da sua clínica',
      features: [
        'Faturamento e emissão automática de notas',
        'Processamento de reembolsos de convênios',
        'Relatórios e análises financeiras'
      ]
    },
    {
      title: 'Teleconsulta',
      icon: Video,
      subtitle: 'Conecte-se com pacientes remotamente',
      features: [
        'Consultas em vídeo em alta definição',
        'Sistema seguro de mensagens',
        'Prescrição digital integrada'
      ]
    },
    {
      title: 'Agendamento Online',
      icon: BookingIcon,
      subtitle: 'Agendamento simplificado para pacientes',
      features: [
        'Exibição de disponibilidade em tempo real',
        'E-mails automáticos de confirmação',
        'Integração com sistemas de calendário'
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`
                cursor-pointer 
                rounded-lg 
                border 
                transition-all 
                duration-500
                transform
                hover:scale-105
                hover:shadow-lg
                ${selectedCard === index 
                  ? 'border-[#009EE3] shadow-lg bg-[#009EE3] text-white' 
                  : 'border-gray-200 hover:border-[#009EE3] bg-white'
                }
              `}
            >
              <div className="p-4 text-center">
                <Icon 
                  className={`
                    w-8 h-8 mx-auto mb-2
                    transition-transform
                    duration-500
                    ${selectedCard === index ? 'scale-110' : ''}
                  `} 
                />
                <h3 className={`
                  font-medium 
                  text-sm
                  transition-all
                  duration-500
                  ${selectedCard === index ? 'text-white' : 'text-gray-700'}
                `}>
                  {card.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6 transform transition-all duration-500 text-center">
          <h2 className="text-2xl font-bold text-[#009EE3]">{cards[selectedCard].title}</h2>
          <p className="text-gray-600">{cards[selectedCard].subtitle}</p>
          
          <ul className="space-y-4">
            {cards[selectedCard].features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-center justify-center transform transition-all duration-500 hover:translate-x-2"
              >
                <span className="mr-2 text-[#009EE3]">•</span>
                {feature}
              </li>
            ))}
          </ul>

          <button 
            className="
              mt-6
              px-6 
              py-3 
              bg-[#009EE3] 
              text-white 
              rounded-md 
              hover:bg-[#007bb3] 
              transition-all 
              duration-500
              transform
              hover:scale-105
              hover:shadow-lg
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#009EE3] 
              focus:ring-offset-2
            "
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMedico;