import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Image, 
  FileText, 
  Settings, 
  Upload,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Download,
  PenTool,
  MessageSquare,
  Plus,
  Briefcase
} from 'lucide-react';
import { useQuoteStore } from '../store/quoteStore';
import { useMediaStore } from '../store/mediaStore';
import { useBlogStore } from '../store/blogStore';
import { useTestimonialStore } from '../store/testimonialStore';
import { useServiceStore } from '../store/serviceStore';
import { useAuthStore } from '../store/authStore';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { quotes, updateQuote, deleteQuote } = useQuoteStore();
  const { media, addMedia, deleteMedia } = useMediaStore();
  const { posts, addPost, updatePost, deletePost } = useBlogStore();
  const { testimonials, updateTestimonial, deleteTestimonial, getPendingTestimonials } = useTestimonialStore();
  const { services, packages, addService, updateService, addPackage, updatePackage } = useServiceStore();
  const { logout } = useAuthStore();

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'quotes', label: 'Devis', icon: FileText },
    { id: 'media', label: 'Médias', icon: Image },
    { id: 'blog', label: 'Blog', icon: PenTool },
    { id: 'testimonials', label: 'Témoignages', icon: MessageSquare },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const handleQuoteAction = (quoteId: string, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'approved' : 'rejected';
    updateQuote(quoteId, { status });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia = {
            id: Date.now().toString() + Math.random(),
            title: file.name,
            description: '',
            url: e.target?.result as string,
            thumbnail: e.target?.result as string,
            type: file.type.startsWith('image/') ? 'image' as const : 'video' as const,
            category: 'nouveaux',
            tags: [],
            isPrivate: false,
            clientEmail: undefined,
            uploadedAt: new Date().toISOString(),
            metadata: {
              size: file.size
            }
          };
          addMedia(newMedia);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Devis en attente</h3>
          <p className="text-3xl font-bold text-amber-400">
            {quotes.filter(q => q.status === 'pending').length}
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Projets approuvés</h3>
          <p className="text-3xl font-bold text-green-400">
            {quotes.filter(q => q.status === 'approved').length}
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Médias</h3>
          <p className="text-3xl font-bold text-blue-400">{media.length}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Articles blog</h3>
          <p className="text-3xl font-bold text-purple-400">{posts.length}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Témoignages en attente</h3>
          <p className="text-3xl font-bold text-orange-400">{getPendingTestimonials().length}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Services actifs</h3>
          <p className="text-3xl font-bold text-cyan-400">{services.filter(s => s.isActive).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Revenus du mois</h3>
          <p className="text-3xl font-bold text-purple-400">
            {quotes
              .filter(q => q.status === 'completed' && q.price)
              .reduce((sum, q) => sum + (q.price || 0), 0)
              .toLocaleString()} FCFA
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Activité récente</h3>
          <div className="space-y-3">
            {quotes.slice(0, 5).map((quote) => (
              <div key={quote.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <p className="text-white">{quote.name} - {quote.service}</p>
                  <p className="text-sm text-gray-400">{new Date(quote.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  quote.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {quote.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestion des devis</h2>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{quote.name}</p>
                      <p className="text-sm text-gray-400">{quote.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{quote.service}</td>
                  <td className="px-6 py-4 text-gray-300">{quote.date || 'Non spécifiée'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      quote.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      quote.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {quote.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleQuoteAction(quote.id, 'approve')}
                            className="text-green-400 hover:text-green-300"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleQuoteAction(quote.id, 'reject')}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des médias</h2>
        <label className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Uploader</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-square">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium truncate">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.category}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.isPrivate ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {item.isPrivate ? 'Privé' : 'Public'}
                </span>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion du blog</h2>
        <button className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvel article</span>
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{post.title}</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{post.excerpt}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestion des témoignages</h2>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400">★</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-300 truncate max-w-xs">{testimonial.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      testimonial.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      testimonial.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {testimonial.status === 'pending' ? 'En attente' :
                       testimonial.status === 'approved' ? 'Approuvé' : 'Refusé'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {testimonial.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateTestimonial(testimonial.id, { status: 'approved' })}
                            className="text-green-400 hover:text-green-300"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateTestimonial(testimonial.id, { status: 'rejected' })}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des services</h2>
        <div className="flex space-x-2">
          <button className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouveau service</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouveau forfait</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{service.title}</h4>
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-semibold">{service.price}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    service.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {service.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forfaits */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Forfaits</h3>
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-medium">{pkg.name}</h4>
                    {pkg.popular && <span className="text-amber-400 text-xs">Populaire</span>}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{pkg.price.toLocaleString()} {pkg.currency}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    pkg.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {pkg.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'quotes':
        return renderQuotes();
      case 'media':
        return renderMedia();
      case 'blog':
        return renderBlog();
      case 'testimonials':
        return renderTestimonials();
      case 'services':
        return renderServices();
      case 'clients':
        return <div className="text-white">Gestion des clients (à implémenter)</div>;
      case 'settings':
        return <div className="text-white">Paramètres (à implémenter)</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-amber-400 rounded-full"></div>
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-8">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;