import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video';
  category: string;
  tags: string[];
  isPrivate: boolean;
  clientEmail?: string;
  uploadedAt: string;
  metadata?: {
    size: number;
    dimensions?: { width: number; height: number };
    duration?: number;
    exif?: any;
  };
}

interface MediaState {
  media: MediaItem[];
  addMedia: (item: MediaItem) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  deleteMedia: (id: string) => void;
  getPublicMedia: () => MediaItem[];
  getPrivateMedia: (clientEmail: string) => MediaItem[];
  getMediaByCategory: (category: string) => MediaItem[];
}

export const useMediaStore = create<MediaState>()(
  persist(
    (set, get) => ({
      media: [
        // Données d'exemple
        {
          id: '1',
          title: 'Mariage traditionnel',
          description: 'Cérémonie traditionnelle béninoise',
          url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
          thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=400',
          type: 'image',
          category: 'mariages',
          tags: ['mariage', 'traditionnel', 'cérémonie'],
          isPrivate: false,
          uploadedAt: new Date().toISOString()
        }
      ],

      addMedia: (item) => {
        set((state) => ({
          media: [...state.media, item]
        }));
      },

      updateMedia: (id, updates) => {
        set((state) => ({
          media: state.media.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          )
        }));
      },

      deleteMedia: (id) => {
        set((state) => ({
          media: state.media.filter((item) => item.id !== id)
        }));
      },

      getPublicMedia: () => {
        return get().media.filter((item) => !item.isPrivate);
      },

      getPrivateMedia: (clientEmail) => {
        return get().media.filter(
          (item) => item.isPrivate && item.clientEmail === clientEmail
        );
      },

      getMediaByCategory: (category) => {
        return get().media.filter((item) => item.category === category && !item.isPrivate);
      }
    }),
    {
      name: 'media-storage'
    }
  )
);