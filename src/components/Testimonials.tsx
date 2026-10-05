import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTestimonialStore } from '../store/testimonialStore';

const Testimonials = () => {
  const { getApprovedTestimonials } = useTestimonialStore();
  const testimonials = getApprovedTestimonials();

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Témoignages <span className="text-amber-400">Clients</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez ce que mes clients pensent de mes services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-8 relative">
                <div className="absolute top-4 right-4 text-amber-400">
                  <Quote className="h-8 w-8" />
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-black">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <p className="text-amber-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>

          {/* Statistiques de satisfaction */}
          <div className="bg-amber-400/10 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                <div className="text-gray-300">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">4.9/5</div>
                <div className="text-gray-300">Note moyenne</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">95%</div>
                <div className="text-gray-300">Clients fidèles</div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Rejoignez mes clients satisfaits et créons ensemble vos souvenirs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Commencer mon projet
              </button>
              <button
                onClick={() => window.location.href = '/testimonial'}
                className="border-2 border-amber-400 hover:bg-amber-400 hover:text-black text-amber-400 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Laisser un témoignage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;