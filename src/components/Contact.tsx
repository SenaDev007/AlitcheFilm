import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, CheckCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useQuoteStore } from '../store/quoteStore';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addQuote } = useQuoteStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Créer le devis
      const quote = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      addQuote(quote);
      
      // Envoyer par WhatsApp
      const whatsappMessage = `Nouvelle demande de devis:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Service: ${formData.service}
Date: ${formData.date}
Budget: ${formData.budget}
Message: ${formData.message}`;
      
      const whatsappUrl = `https://wa.me/2290164321816?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      // Confirmation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: '',
          budget: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Parakou, Bénin',
      action: () => window.open('https://maps.google.com/?q=Parakou,Benin', '_blank')
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+229 01 64 32 18 16 / 01 59 16 18 75',
      action: () => window.open('tel:+2290164321816')
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+229 01 64 32 18 16',
      action: () => window.open('https://wa.me/2290164321816')
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'mahugnongbetowenonmon@gmail.com',
      action: () => window.open('mailto:mahugnongbetowenonmon@gmail.com')
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Lun-Sam: 9h-18h',
      action: null
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      url: 'https://facebook.com/merveille.mahugnon.gbetowenonmon', 
      label: 'Merveille Mahugnon GBETOWENONMON',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com/merveille_mahugnon', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: Youtube, 
      url: 'https://youtube.com/@merveillemahugnon', 
      label: 'YouTube',
      color: 'hover:text-red-400'
    }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Demande envoyée !</h2>
            <p className="text-gray-300 mb-6">
              Votre demande de devis a été envoyée avec succès. Je vous recontacterai dans les plus brefs délais via WhatsApp.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Envoyer une autre demande
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Contactez-<span className="text-amber-400">moi</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prêt à donner vie à vos projets ? Parlons-en ensemble !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start space-x-4 ${info.action ? 'cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors duration-300' : 'p-3'}`}
                      onClick={info.action || undefined}
                    >
                      <div className="bg-amber-400/20 rounded-full p-3">
                        <info.icon className="h-6 w-6 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{info.title}</h4>
                        <p className="text-gray-300">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Suivez-moi</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-gray-800 hover:bg-amber-400 text-white hover:text-black p-3 rounded-full transition-colors duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Carte (placeholder) */}
              <div className="bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                   onClick={() => window.open('https://maps.google.com/?q=Parakou,Benin', '_blank')}>
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <p className="text-gray-300">Cliquez pour voir la carte</p>
                  <p className="text-sm text-gray-400">Parakou, Bénin</p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Demande de devis</h3>
              
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service souhaité *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Choisir un service</option>
                      <option value="photographie">Photographie</option>
                      <option value="videographie">Vidéographie</option>
                      <option value="design">Design graphique</option>
                      <option value="retouche">Retouche & Montage</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                      Date souhaitée
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget approximatif
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Sélectionner un budget</option>
                      <option value="50000-100000">50 000 - 100 000 FCFA</option>
                      <option value="100000-200000">100 000 - 200 000 FCFA</option>
                      <option value="200000-500000">200 000 - 500 000 FCFA</option>
                      <option value="500000+">500 000+ FCFA</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="Décrivez votre projet, vos attentes, le lieu de l'événement..."
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
                      <FaWhatsapp className="h-5 w-5" />
                      <span>Envoyer ma demande</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;