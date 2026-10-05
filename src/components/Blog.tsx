import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { useBlogStore } from '../store/blogStore';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const { getPublishedPosts, getPostsByCategory } = useBlogStore();

  const posts = selectedCategory === 'tous' 
    ? getPublishedPosts() 
    : getPostsByCategory(selectedCategory);

  const categories = [
    { id: 'tous', label: 'Tous les articles' },
    { id: 'Mariage', label: 'Mariage' },
    { id: 'Portrait', label: 'Portrait' },
    { id: 'Conseils', label: 'Conseils' },
    { id: 'Technique', label: 'Technique' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Blog <span className="text-amber-400">Merveille Labs</span>
            </h1>
            <p className="text-gray-300">Conseils, techniques et coulisses de mes créations</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </button>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 text-sm">{post.category}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{post.readTime} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun article trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;