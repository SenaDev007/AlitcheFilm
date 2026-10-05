import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dbHelpers } from '../lib/database';

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  budget: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  price?: number;
  notes?: string;
}

interface QuoteState {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  getQuotesByUser: (email: string) => Quote[];
  loadQuotes: () => void;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      quotes: [],

      addQuote: (quote) => {
        // Sauvegarder en base de données
        dbHelpers.createQuote(quote);
        set((state) => ({
          quotes: [...state.quotes, quote]
        }));
      },

      updateQuote: (id, updates) => {
        // Mettre à jour en base de données
        dbHelpers.updateQuote(id, updates);
        set((state) => ({
          quotes: state.quotes.map((quote) =>
            quote.id === id
              ? { ...quote, ...updates, updatedAt: new Date().toISOString() }
              : quote
          )
        }));
      },

      deleteQuote: (id) => {
        set((state) => ({
          quotes: state.quotes.filter((quote) => quote.id !== id)
        }));
      },

      getQuotesByUser: (email) => {
        return get().quotes.filter((quote) => quote.email === email);
      },
      loadQuotes: () => {
        // Charger depuis la base de données
        const quotes = dbHelpers.getAllQuotes() as Quote[];
        set({ quotes });
      }
    }),
    {
      name: 'quotes-storage'
    }
  )
);