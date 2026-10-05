import React, { useState } from 'react';
import { Camera, Video, Edit, Users, Clock, Star, Check, CreditCard } from 'lucide-react';

const Services = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    packageId: '',
    packageName: '',
    amount: 0
  });

  const services = [
    {
      icon: Camera,
      title: 'Photographie',
      description: 'Séances photo personnalisées pour tous vos besoins',
      features: ['Portrait', 'Paysage', 'Produit', 'Événementiel', 'Mode'],
      price: 'À partir de 5 000 FCFA'
    },
    {
      icon: Video,
      title: 'Vidéographie',
      description: 'Tournage de vidéos professionnelles pour événements et entreprises',
      features: ['Événements', 'Interviews', 'Clips', 'Publicités'],
      price: 'À partir de 25 000 FCFA'
    },
    {
      icon: Edit,
      title: 'Design graphique',
      description: 'Création de matériel graphique pour entreprises et événements',
      features: ['Identité visuelle', 'Affiches', 'Cartes de visite', 'Brochures'],
      price: 'À partir de 5 000 FCFA'
    },
    {
      icon: Edit,
      title: 'Retouche & Montage',
      description: 'Retouche photo et montage vidéo professionnels',
      features: ['Retouche photo', 'Montage vidéo', 'Étalonnage', 'Effets spéciaux'],
      price: 'À partir de 5 000 FCFA'
    }
  ];

  const packages = [
    {
      id: 'essentiel',
      name: 'Essentiel',
      price: '75 000 FCFA',
      features: [
        '2h de prestation',
        '50 photos retouchées',
        'Galerie en ligne',
        'Livraison 72h'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '150 000 FCFA',
      features: [
        '4h de prestation',
        '100 photos retouchées',
        'Vidéo highlight',
        'Galerie privée',
        'Tirages inclus'
      ],
      popular: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      price: '300 000 FCFA',
      features: [
        'Journée complète',
        'Photos illimitées',
        'Vidéo complète',
        'Album photo',
        'Séance engagement'
      ]
    }
  ];

  const selectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const requestQuote = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePayment = (pkg: any) => {
    setPaymentData({
      packageId: pkg.id,
      packageName: pkg.name,
      amount: parseInt(pkg.price.replace(/[^\d]/g, ''))
    });
    setShowPayment(true);
  };

  const processPayment = async () => {
    // Intégration FedaPay réelle
    try {
      // Configuration FedaPay
      const fedaPayData = {
        amount: paymentData.amount,
        currency: 'XOF',
        description: `Forfait ${paymentData.packageName} - Merveille Labs`,
        callback_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`
      };
      
      // Redirection vers FedaPay
      const paymentUrl = `https://checkout.fedapay.com/v1/checkout_sessions?${new URLSearchParams(fedaPayData).toString()}`;
      window.location.href = paymentUrl;
      
      setShowPayment(false);
    } catch (error) {
      console.error('Erreur de paiement:', error);
      alert('Erreur lors du traitement du paiement. Veuillez réessayer.');
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Mes <span className="text-amber-400">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des prestations sur mesure pour capturer vos moments les plus précieux
            </p>
          </div>

          {/* Services détaillés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-8 hover:bg-gray-750 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-amber-400/20 rounded-full p-3 mr-4">
                    <service.icon className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    <p className="text-amber-400 font-semibold">{service.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-amber-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Packages */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Forfaits mariage</h3>
            <p className="text-gray-300">Choisissez le forfait qui correspond le mieux à vos besoins</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative bg-gray-800 rounded-lg p-8 ${
                pkg.popular ? 'ring-2 ring-amber-400 transform scale-105' : ''
              } ${selectedPackage === pkg.id ? 'ring-2 ring-green-400' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-amber-400 mb-4">{pkg.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 text-amber-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => selectPackage(pkg.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-amber-400 text-black hover:bg-amber-500'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } ${selectedPackage === pkg.id ? 'bg-green-500 text-white' : ''}`}
                >
                  {selectedPackage === pkg.id ? 'Forfait sélectionné' : 'Choisir ce forfait'}
                </button>
                
                <button
                  onClick={() => handlePayment(pkg)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Payer maintenant</span>
                </button>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">
              Besoin d'un devis personnalisé ? Contactez-moi pour discuter de votre projet
            </p>
            <button
              onClick={requestQuote}
              className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Demander un devis
            </button>
          </div>
        </div>

        {/* Modal de paiement */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-4">Paiement sécurisé</h3>
              <div className="mb-6">
                <p className="text-gray-300 mb-2">Forfait: <span className="text-amber-400">{paymentData.packageName}</span></p>
                <p className="text-gray-300 mb-4">Montant: <span className="text-amber-400">{paymentData.amount.toLocaleString()} FCFA</span></p>
                <div className="bg-blue-500/20 border border-blue-500 text-blue-400 p-4 rounded-lg mb-4">
                  <p className="text-sm">Paiement sécurisé via FedaPay</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={processPayment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Procéder au paiement
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;