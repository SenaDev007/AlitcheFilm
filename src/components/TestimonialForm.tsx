import React, { useState } from 'react';
import { Star, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTestimonialStore } from '../store/testimonialStore';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addTestimonial } = useTestimonialStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testimonial = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addTestimonial(testimonial);
      
      // Confirmation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset après 3 secondes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          role: '',
          message: '',
          rating: 5
        });
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const setRating = (rating: number) => {
    setFormData({
      ...formData,
      rating
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Témoignage envoyé !</h2>
          <p className="text-gray-300 mb-6">
            Merci pour votre témoignage. Il sera publié après validation.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
          >
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Laisser un témoignage</h1>
              <p className="text-gray-300">Partagez votre expérience avec Merveille Labs</p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
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
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Rôle / Occasion *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  placeholder="Ex: Mariés - Juin 2024, Séance portrait, Événement corporate..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Note *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-colors duration-300 ${
                        star <= formData.rating ? 'text-amber-400' : 'text-gray-600'
                      }`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Votre témoignage *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  placeholder="Partagez votre expérience avec Merveille Labs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Envoyer mon témoignage</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;