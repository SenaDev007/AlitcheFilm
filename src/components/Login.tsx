import React, { useState } from 'react';
import { Camera, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        // Redirect based on user role
        if (formData.email === 'admin@merveillelabs.com') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/client';
        }
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">
                Merveille <span className="text-amber-400">Labs</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connexion</h2>
            <p className="text-gray-400">Accédez à votre espace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="text-amber-400 hover:text-amber-300 transition-colors duration-300"
            >
              Retour au site
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Comptes de test :</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p><strong>Admin :</strong> admin@merveillelabs.com / admin123</p>
              <p><strong>Client :</strong> client@test.com / client123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;