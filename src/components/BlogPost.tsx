import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { useBlogStore } from '../store/blogStore';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost } = useBlogStore();
  
  const post = id ? getPost(id) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <button
            onClick={() => navigate('/blog')}
            className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2 rounded-lg"
          >
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour au blog</span>
            </button>
          </div>

          {/* Article */}
          <article>
            {/* Image de couverture */}
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span className="text-amber-400">{post.category}</span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Contenu */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/blog')}
                className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Voir tous les articles
              </button>
              <button
                onClick={() => navigate('/')}
                className="border-2 border-amber-400 hover:bg-amber-400 hover:text-black text-amber-400 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Retour au site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;