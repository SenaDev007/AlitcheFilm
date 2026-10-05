import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  getApprovedTestimonials: () => Testimonial[];
  getPendingTestimonials: () => Testimonial[];
}

export const useTestimonialStore = create<TestimonialState>()(
  persist(
    (set, get) => ({
      testimonials: [
        {
          id: '1',
          name: 'Marie ADJOVI',
          email: 'marie@example.com',
          role: 'Mariée - Juin 2024',
          message: 'Merveille a capturé notre mariage de façon exceptionnelle. Les photos sont magnifiques et reflètent parfaitement l\'émotion de notre jour J. Je recommande vivement ses services !',
          rating: 5,
          status: 'approved',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Jean KOUDOU',
          email: 'jean@example.com',
          role: 'Séance portrait famille',
          message: 'Très professionnel et créatif. Les photos de famille sont superbes et nos enfants ont adoré la séance. Merci Merveille !',
          rating: 5,
          status: 'approved',
          createdAt: '2024-01-10T14:30:00Z',
          updatedAt: '2024-01-10T14:30:00Z'
        },
        {
          id: '3',
          name: 'Fatima IBRAHIM',
          email: 'fatima@example.com',
          role: 'Événement corporate',
          message: 'Excellent travail pour notre événement d\'entreprise. Photos de qualité professionnelle et livraison dans les délais. Je recommande !',
          rating: 4,
          status: 'approved',
          createdAt: '2024-01-05T16:45:00Z',
          updatedAt: '2024-01-05T16:45:00Z'
        }
      ],
      addTestimonial: (testimonial) => set((state) => ({
        testimonials: [...state.testimonials, testimonial]
      })),
      updateTestimonial: (id, updates) => set((state) => ({
        testimonials: state.testimonials.map(testimonial =>
          testimonial.id === id 
            ? { ...testimonial, ...updates, updatedAt: new Date().toISOString() }
            : testimonial
        )
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter(testimonial => testimonial.id !== id)
      })),
      getApprovedTestimonials: () => get().testimonials.filter(t => t.status === 'approved'),
      getPendingTestimonials: () => get().testimonials.filter(t => t.status === 'pending')
    }),
    {
      name: 'testimonial-storage'
    }
  )
);