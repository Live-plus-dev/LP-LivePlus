'use client'
import { useState } from "react";
import { Mail, Building } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState('');
  const [step, setStep] = useState(1); // 1 for tenant input, 2 for email

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
      throw new Error(error.message || 'Failed to verify tenant');
    }

    const { exists } = await response.json();
    return exists;
  };

  const handleTenantSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const exists = await checkTenantAvailability(tenant);
      if (!exists) {
        setStep(2);
        setMessage('');
      } else {
        setMessage('Error: Tenant already exists. Please choose a different name.');
      }
    } catch (error) {
      setMessage('Error checking tenant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!tenant) {
      setMessage('Error: Tenant information not found');
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
        setMessage('Please check your email for the login link!');
      } else {
        setMessage('Error sending email. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {step === 1 ? (
              <Building className="w-6 h-6 text-blue-600" />
            ) : (
              <Mail className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-gray-600">
            {step === 1 ? 'Enter your tenant name' : 'Sign in to your account'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleTenantSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="tenant" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tenant Name
              </label>
              <input
                type="text"
                id="tenant"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                placeholder="Enter tenant name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Checking...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Sending...' : 'Send Login Link'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setMessage('');
                }}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Back to Tenant
              </button>
            </div>
          </form>
        )}

        {message && (
          <div className={`p-4 rounded-lg text-center text-sm ${
            message.includes('Error') 
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