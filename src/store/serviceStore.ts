import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceState {
  services: Service[];
  packages: Package[];
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addPackage: (pkg: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePackage: (id: string, updates: Partial<Package>) => void;
  deletePackage: (id: string) => void;
}

export const useServiceStore = create<ServiceState>()(
  persist(
    (set, get) => ({
      services: [
        {
          id: '1',
          title: 'Photographie de mariage',
          description: 'Couverture complète de votre jour J avec reportage photo professionnel',
          price: 'À partir de 150 000 FCFA',
          features: ['Cérémonie et réception', 'Séance couple', 'Retouche incluse', 'Galerie privée'],
          icon: 'Camera',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          title: 'Portraits & Famille',
          description: 'Séances photo personnalisées pour particuliers et familles',
          price: 'À partir de 50 000 FCFA',
          features: ['Studio ou extérieur', 'Plusieurs tenues', 'Retouche artistique', 'Tirages inclus'],
          icon: 'Users',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '3',
          title: 'Vidéographie',
          description: 'Réalisation de vidéos professionnelles pour tous événements',
          price: 'À partir de 100 000 FCFA',
          features: ['Captation HD/4K', 'Montage créatif', 'Étalonnage couleur', 'Musique originale'],
          icon: 'Video',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ],
      packages: [
        {
          id: 'essentiel',
          name: 'Essentiel',
          price: 75000,
          currency: 'FCFA',
          features: ['2h de prestation', '50 photos retouchées', 'Galerie en ligne', 'Livraison 72h'],
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'premium',
          name: 'Premium',
          price: 150000,
          currency: 'FCFA',
          features: ['4h de prestation', '100 photos retouchées', 'Vidéo highlight', 'Galerie privée', 'Tirages inclus'],
          popular: true,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'deluxe',
          name: 'Deluxe',
          price: 300000,
          currency: 'FCFA',
          features: ['Journée complète', 'Photos illimitées', 'Vidéo complète', 'Album photo', 'Séance engagement'],
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ],
      addService: (service) => set((state) => ({
        services: [...state.services, {
          ...service,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      updateService: (id, updates) => set((state) => ({
        services: state.services.map(service =>
          service.id === id 
            ? { ...service, ...updates, updatedAt: new Date().toISOString() }
            : service
        )
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter(service => service.id !== id)
      })),
      addPackage: (pkg) => set((state) => ({
        packages: [...state.packages, {
          ...pkg,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      updatePackage: (id, updates) => set((state) => ({
        packages: state.packages.map(pkg =>
          pkg.id === id 
            ? { ...pkg, ...updates, updatedAt: new Date().toISOString() }
            : pkg
        )
      })),
      deletePackage: (id) => set((state) => ({
        packages: state.packages.filter(pkg => pkg.id !== id)
      }))
    }),
    {
      name: 'service-storage'
    }
  )
);