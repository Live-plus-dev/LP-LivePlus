'use client'
import { useState } from "react";
import { Mail, Building } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState('');
  const [tenantError, setTenantError] = useState('');
  const [step, setStep] = useState(1); // 1 para input do tenant, 2 para email

  const validateTenant = (value) => {
    // Valida se o tenant contém apenas letras, números, hífens e underscores
    const regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(value);
  };

  const checkTenantAvailability = async (tenantName) => {
    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenant: tenantName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Falha ao verificar tenant');
    }

    const { exists } = await response.json();
    return exists;
  };

  const handleTenantChange = (e) => {
    const value = e.target.value;
    setTenant(value);
    
    if (value && !validateTenant(value)) {
      setTenantError('Nome do tenant deve conter apenas letras, números, hífens e underscores (sem espaços ou caracteres especiais).');
    } else {
      setTenantError('');
    }
  };

  const handleTenantSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateTenant(tenant)) {
      setTenantError('Nome do tenant deve conter apenas letras, números, hífens e underscores (sem espaços ou caracteres especiais).');
      return;
    }
    
    setIsLoading(true);
    try {
      const exists = await checkTenantAvailability(tenant);
      if (!exists) {
        setStep(2);
        setMessage('');
      } else {
        setMessage('Erro: Tenant já existe. Por favor, escolha um nome diferente.');
      }
    } catch (error) {
      setMessage('Erro ao verificar tenant. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!tenant) {
      setMessage('Erro: Informação do tenant não encontrada');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, tenant }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage('Por favor, verifique seu email para o link de login!');
      } else {
        setMessage('Erro ao enviar email. Por favor, tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao enviar email. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0, 158, 227, 0.1)' }}>
            {step === 1 ? (
              <Building className="w-6 h-6" style={{ color: '#009EE3' }} />
            ) : (
              <Mail className="w-6 h-6" style={{ color: '#009EE3' }} />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo</h1>
          <p className="mt-2 text-gray-600">
            {step === 1 ? 'Digite o nome do seu tenant' : 'Entre na sua conta'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleTenantSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="tenant" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome do Tenant
              </label>
              <input
                type="text"
                id="tenant"
                value={tenant}
                onChange={handleTenantChange}
                className={`block w-full rounded-lg border ${tenantError ? 'border-red-300' : 'border-gray-300'} px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 ${tenantError ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-[#009EE3] focus:ring-[#009EE3]'}`}
                placeholder="Digite o nome do tenant"
                required
              />
              {tenantError && (
                <p className="mt-2 text-sm text-red-600">
                  {tenantError}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                O nome do tenant será usado na URL e deve conter apenas letras, números, hífens e underscores.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !!tenantError}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              style={{ 
                backgroundColor: isLoading || !!tenantError ? 'rgba(0, 158, 227, 0.6)' : '#009EE3',
                ':hover': { backgroundColor: '#0086C0' }
              }}
            >
              {isLoading ? 'Verificando...' : 'Continuar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Endereço de Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3] focus:ring-offset-2"
                placeholder="você@exemplo.com"
                required
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                style={{ 
                  backgroundColor: isLoading ? 'rgba(0, 158, 227, 0.6)' : '#009EE3',
                  ':hover': { backgroundColor: '#0086C0' }
                }}
              >
                {isLoading ? 'Enviando...' : 'Enviar Link de Login'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setMessage('');
                }}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009EE3] transition-colors duration-200"
              >
                Voltar para Tenant
              </button>
            </div>
          </form>
        )}

        {message && (
          <div className={`p-4 rounded-lg text-center text-sm ${
            message.includes('Erro') 
              ? 'bg-red-50 text-red-800' 
              : 'bg-green-50 text-green-800'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}