import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  createdAt: string;
  status: 'draft' | 'published';
  tags: string[];
  category: string;
  readTime: number;
}

interface BlogState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
  getPublishedPosts: () => Post[];
  getPostsByCategory: (category: string) => Post[];
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      posts: [
        {
          id: '1',
          title: 'Séance photo de mariage à Parakou',
          content: 'Une magnifique séance photo de mariage dans les jardins de Parakou. Les mariés ont choisi un style romantique avec des couleurs douces...',
          excerpt: 'Une magnifique séance photo de mariage dans les jardins de Parakou.',
          coverImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
          author: 'Merveille GBETOWENONMON',
          createdAt: '2024-01-15T10:00:00Z',
          status: 'published',
          tags: ['mariage', 'portrait', 'parakou'],
          category: 'Mariage',
          readTime: 5
        },
        {
          id: '2',
          title: 'Conseils pour réussir vos photos de portrait',
          content: 'Découvrez mes conseils professionnels pour réussir vos séances photo de portrait. L\'éclairage, la pose, l\'expression...',
          excerpt: 'Découvrez mes conseils professionnels pour réussir vos séances photo de portrait.',
          coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
          author: 'Merveille GBETOWENONMON',
          createdAt: '2024-01-10T14:30:00Z',
          status: 'published',
          tags: ['conseils', 'portrait', 'technique'],
          category: 'Conseils',
          readTime: 8
        }
      ],
      addPost: (post) => set((state) => ({
        posts: [...state.posts, { ...post, id: Date.now().toString() }]
      })),
      updatePost: (id, updatedPost) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === id ? { ...post, ...updatedPost } : post
        )
      })),
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter(post => post.id !== id)
      })),
      getPost: (id) => get().posts.find(post => post.id === id),
      getPublishedPosts: () => get().posts.filter(post => post.status === 'published'),
      getPostsByCategory: (category) => get().posts.filter(post => 
        post.status === 'published' && post.category === category
      )
    }),
    {
      name: 'blog-storage'
    }
  )
);