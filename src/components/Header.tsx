import React, { useState, useEffect } from 'react';
import { Menu, X, Camera, Home, User, Image, Video, Briefcase, MessageCircle, LogIn, UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Accueil', href: '#home' },
    { icon: User, label: 'À propos', href: '#about' },
    { icon: Image, label: 'Galerie', href: '#gallery' },
    { icon: Video, label: 'Vidéos', href: '#videos' },
    { icon: Briefcase, label: 'Services', href: '#services' },
    { icon: MessageCircle, label: 'Contact', href: '#contact' }
  ];

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    if (href === '/') {
      window.location.href = '/';
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleMenuClick('#home')}>
            <Camera className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-bold text-white">
              Merveille <span className="text-amber-400">Labs</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className="flex items-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300 whitespace-nowrap"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleMenuClick('/client')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Mon espace</span>
                </button>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleMenuClick('/login')}
                className="flex items-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span>Connexion</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className="flex items-center space-x-2 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 w-full text-left"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => handleMenuClick('/client')}
                  className="flex items-center space-x-2 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 w-full text-left"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Mon espace</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 py-2 text-gray-300 hover:text-red-400 transition-colors duration-300 w-full text-left"
                >
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleMenuClick('/login')}
                className="flex items-center space-x-2 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 w-full text-left"
              >
                <LogIn className="h-4 w-4" />
                <span>Connexion</span>
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;