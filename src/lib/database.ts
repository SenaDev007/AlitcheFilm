/**
 * database.ts - Stub de base de données pour le frontend sans dépendance à SQLite
 * Utilise Zustand pour la gestion de l'état à la place
 */

// Types pour la compatibilité TypeScript
export interface Profile {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
}

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  budget: string;
  status: string;
}

export interface Media {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  is_public: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  rating: number;
  status: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: string;
  status: string;
  tags: string[];
  category: string;
  read_time: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  is_active: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  is_active: boolean;
}

// Exporter un objet db vide pour compatibilité avec le code existant
export const db = {
  prepare: () => ({
    run: () => ({ changes: 1 }),
    get: () => null,
    all: () => []
  }),
  exec: () => {}
};

// Fonction d'initialisation simplifiée
export const initDatabase = (): void => {
  console.log('Base de données simulée initialisée');
};

// Fonction pour insérer des données par défaut (vide pour compatibilité)
export const insertDefaultData = (): void => {
  console.log('Données par défaut gérées par les stores Zustand');
};

// Helpers pour les stores - fonctions stub qui retournent des données vides ou factices
export const dbHelpers = {
  // Profils
  getProfile: (email: string): Profile | null => {
    if (email === 'admin@merveillelabs.com') {
      return {
        id: 'admin',
        email: 'admin@merveillelabs.com',
        name: 'Administrateur',
        role: 'admin'
      };
    }
    return null;
  },
  
  createProfile: (): { changes: number } => ({ changes: 1 }),
  
  // Devis
  getAllQuotes: (): Quote[] => [],
  createQuote: (): { changes: number } => ({ changes: 1 }),
  updateQuote: (): { changes: number } => ({ changes: 1 }),
  
  // Médias
  getAllMedia: (): Media[] => [],
  getPublicMedia: (): Media[] => [],
  getPrivateMedia: (): Media[] => [],
  createMedia: (): { changes: number } => ({ changes: 1 }),
  
  // Témoignages
  getAllTestimonials: (): Testimonial[] => [],
  getApprovedTestimonials: (): Testimonial[] => [],
  createTestimonial: (): { changes: number } => ({ changes: 1 }),
  updateTestimonial: (): { changes: number } => ({ changes: 1 }),
  
  // Articles
  getAllPosts: (): Post[] => [],
  getPublishedPosts: (): Post[] => [],
  createPost: (): { changes: number } => ({ changes: 1 }),
  
  // Services
  getAllServices: (): Service[] => [],
  
  // Forfaits
  getAllPackages: (): Package[] => []
};
