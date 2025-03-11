// SubscriptionHandler.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Alert Component
const Alert = ({ children, variant = 'default' }) => {
  const bgColor = variant === 'destructive' ? 'bg-red-100' : 'bg-gray-100';
  const textColor = variant === 'destructive' ? 'text-red-800' : 'text-gray-800';
  
  return (
    <div className={`p-4 rounded-lg ${bgColor} ${textColor} mb-4`}>
      {children}
    </div>
  );
};

// Button Component
const Button = ({ children, className = '', disabled, onClick }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                 duration-200 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="p-6 bg-gray-50 border-t border-gray-200">{children}</div>
);

// Select Component
const Select = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Main SubscriptionHandler Component
const SubscriptionHandler = ({ plan, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(1);

  const getPlanDetails = (planType) => {
    switch (planType) {
      case 'starter':
        return {
          name: 'Starter',
          pricePerUser: 199, // R$149.00
          features: [
            'Contas a Receber',
            'Contas a Pagar',
            'Gestão de Agendas',
            'Gestão de Procedimentos',
            'Gestão financeira',
            'Telemedicina'
          ]
        };
      case 'plus':
        return {
          name: 'Plus',
          pricePerUser: 1090, // R$199.00
          features: [
            'Tudo do Starter',
            'Prontuário eletrônico',
            'Histórico de Procedimentos',
            'Gestão de Retornos',
            'Gestão de Performance'
          ]
        };
      default:
        return null;
    }
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const planDetails = getPlanDetails(plan);
      if (!planDetails) {
        throw new Error('Plano inválido');
      }

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: plan,
          quantity: userCount,
          pricePerUser: planDetails.pricePerUser,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar assinatura');
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      
      if (!stripe) {
        throw new Error('Erro ao carregar Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }

    } catch (err) {
      setError(err.message);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = (pricePerUser) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((pricePerUser * userCount) / 100);
  };

  const planDetails = getPlanDetails(plan);

  if (!planDetails) {
    return (
      <Alert variant="destructive">
        <div>Plano não encontrado</div>
      </Alert>
    );
  }

  const userCountOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} ${i === 0 ? 'Profissional' : 'Profissionais'}`
  }));

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h3 className="text-2xl font-bold">{planDetails.name}</h3>
        <p className="text-gray-600">
          {totalPrice(planDetails.pricePerUser)}/mês
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Número de Profissionais
            </label>
            <Select
              value={userCount.toString()}
              onChange={(value) => setUserCount(parseInt(value))}
              options={userCountOptions}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <div>{error}</div>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Assinar agora'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionHandler;
