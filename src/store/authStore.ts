import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>;
}

// Données utilisateur par défaut pour le développement
const defaultAdmin: User = {
  id: 'admin',
  email: 'admin@merveillelabs.com',
  name: 'Administrateur',
  role: 'admin'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,

      login: async (email: string, password: string) => {
        // Authentification simplifiée pour le développement
        if (email === 'admin@merveillelabs.com' && password === 'admin123') {
          set({ user: defaultAdmin, isAdmin: true });
          return true;
        }
        
        // Client normal - création d'un compte à la volée pour le développement
        if (email && password) {
          const clientUser: User = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            role: 'client'
          };
          set({ user: clientUser, isAdmin: false });
          return true;
        }
        
        return false;
      },

      logout: () => {
        set({ user: null, isAdmin: false });
      },

      register: async (userData) => {
        // Inscription simplifiée pour le développement
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          role: 'client'
        };
        set({ user: newUser, isAdmin: false });
        return true;
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);