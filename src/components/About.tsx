
import { Camera, Award, Users, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Camera, label: 'Projets réalisés', value: '500+' },
    { icon: Award, label: 'Années d\'expérience', value: '5+' },
    { icon: Users, label: 'Clients satisfaits', value: '300+' },
    { icon: Heart, label: 'Événements capturés', value: '150+' }
  ];

  const skills = [
    'Photographie',
    'Vidéographie',
    'Design graphique',
    'Retouche photo',
    'Montage vidéo'
  ];
  
  const specialties = [
    'Photographie de mode',
    'Vidéographie événementielle',
    'Design graphique'
  ];

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              À propos de <span className="text-amber-400">Mahugnon Merveille</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Photographe, Vidéaste et Graphiste
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="bg-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Photo et présentation */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/images/merveille-portrait.jpg"
                  alt="Merveille GBETOWENONMON"
                  className="w-full h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-400 text-black p-4 rounded-lg">
                <Camera className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">À propos de moi</h3>
              <p className="text-gray-300 leading-relaxed">
                Je suis un photographe, vidéaste et graphiste passionné et créatif, spécialisé dans la capture de moments uniques 
                et la création de visuels percutants. Avec une expérience dans la photographie, la vidéographie et le design graphique, 
                je propose des services de haute qualité pour les entreprises, les événements et les particuliers.
              </p>
              <h3 className="text-2xl font-bold text-white mb-4 mt-8">Expérience</h3>
              <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-2">
                <li>IFAM, FASHION DAY, 28 Juin 2025</li>
                <li>CEG BEMBÈRÈKÈ, CLASSES CULTURE, 30 Mai 2025</li>
              </ul>
              <div className="flex flex-wrap gap-4 mt-6">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-amber-400/20 text-amber-400 px-4 py-2 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={scrollToGallery}
                  className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Voir mes œuvres
                </button>
                <button
                  onClick={scrollToContact}
                  className="border-2 border-amber-400 hover:bg-amber-400 hover:text-black text-amber-400 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Me contacter
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-400/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;