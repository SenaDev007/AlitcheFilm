import React from 'react';
import { Camera, Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Instagram, 
      url: 'https://instagram.com/merveillelabs', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: Facebook, 
      url: 'https://facebook.com/merveillelabs', 
      label: 'Facebook',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Youtube, 
      url: 'https://youtube.com/@merveillelabs', 
      label: 'YouTube',
      color: 'hover:text-red-400'
    }
  ];

  const quickLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Vidéos', href: '#videos' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    'Photographie de mariage',
    'Portraits professionnels',
    'Événements',
    'Corporate',
    'Vidéographie'
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'location':
        window.open('https://maps.google.com/?q=Parakou,Benin', '_blank');
        break;
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="md:col-span-1">
              <div 
                className="flex items-center space-x-2 mb-4 cursor-pointer"
                onClick={() => scrollToSection('#home')}
              >
                <Camera className="h-8 w-8 text-amber-400" />
                <span className="text-xl font-bold">
                  Merveille <span className="text-amber-400">Labs</span>
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Photographe et vidéaste professionnel basé à Parakou (Bénin), 
                spécialisé dans la capture d'émotions authentiques.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-800 hover:bg-amber-400 text-white hover:text-black p-2 rounded-full transition-colors duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => window.location.href = '/blog'}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm text-left"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleContactClick('phone', '+2290164321816')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-left"
                >
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span className="text-sm">+229 01 64 32 18 16</span>
                </button>
                <button
                  onClick={() => handleContactClick('whatsapp', '2290164321816')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300 text-left"
                >
                  <FaWhatsapp className="h-4 w-4 text-green-400" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleContactClick('email', 'contact@merveillelabs.com')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-left"
                >
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span className="text-sm">contact@merveillelabs.com</span>
                </button>
                <button
                  onClick={() => handleContactClick('location', 'Parakou, Bénin')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-left"
                >
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span className="text-sm">Parakou, Bénin</span>
                </button>
              </div>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Merveille Labs. Tous droits réservés.
              </div>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>in Benin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;