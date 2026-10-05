import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'mariages', label: 'Mariages' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'evenements', label: 'Événements' },
    { id: 'corporate', label: 'Corporate' }
  ];

  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'mariages',
      title: 'Cérémonie traditionnelle'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'mariages',
      title: 'Échange des vœux'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'portraits',
      title: 'Portrait artistique'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'portraits',
      title: 'Portrait professionnel'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'evenements',
      title: 'Événement culturel'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'corporate',
      title: 'Séance corporate'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'evenements',
      title: 'Conférence'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'mariages',
      title: 'Première danse'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      category: 'portraits',
      title: 'Portrait naturel'
    }
  ];

  const filteredImages = selectedCategory === 'tous' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (lightboxImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage]);

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ma <span className="text-amber-400">Galerie</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez une sélection de mes meilleures œuvres photographiques
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Grille d'images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                onClick={() => setLightboxImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxImage !== null && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors duration-300"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-300"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-300"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="max-w-4xl max-h-full">
                <img
                  src={filteredImages[lightboxImage].src}
                  alt={filteredImages[lightboxImage].title}
                  className="w-full h-full object-contain"
                />
                <div className="text-center mt-4">
                  <h3 className="text-white text-xl font-semibold">
                    {filteredImages[lightboxImage].title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2">
                    {lightboxImage + 1} / {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;