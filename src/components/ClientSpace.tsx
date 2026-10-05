import React, { useState } from 'react';
import { 
  Download, 
  Eye, 
  Heart, 
  Share2, 
  Filter,
  Grid,
  List,
  Search,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useMediaStore } from '../store/mediaStore';
import { useQuoteStore } from '../store/quoteStore';

const ClientSpace = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { user, logout } = useAuthStore();
  const { getPrivateMedia } = useMediaStore();
  const { getQuotesByUser } = useQuoteStore();

  const privateMedia = user ? getPrivateMedia(user.email) : [];
  const userQuotes = user ? getQuotesByUser(user.email) : [];

  const tabs = [
    { id: 'gallery', label: 'Ma galerie privée' },
    { id: 'orders', label: 'Mes commandes' },
    { id: 'quotes', label: 'Mes devis' },
    { id: 'profile', label: 'Mon profil' }
  ];

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleDownload = (imageId: string) => {
    const image = privateMedia.find(img => img.id === imageId);
    if (image) {
      // Simulation du téléchargement
      const link = document.createElement('a');
      link.href = image.url;
      link.download = image.title;
      link.click();
    }
  };

  const handleBulkDownload = () => {
    selectedImages.forEach(imageId => {
      handleDownload(imageId);
    });
    setSelectedImages([]);
  };

  const renderGallery = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Ma galerie privée</h2>
        <div className="flex items-center space-x-4">
          {selectedImages.length > 0 && (
            <button
              onClick={handleBulkDownload}
              className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger ({selectedImages.length})</span>
            </button>
          )}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-400 text-black' : 'text-gray-400'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-400 text-black' : 'text-gray-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {privateMedia.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Aucune photo privée disponible pour le moment.</p>
          <p className="text-gray-500 text-sm mt-2">Vos photos seront disponibles ici après votre séance.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {privateMedia.map((image) => (
            <div key={image.id} className={`bg-gray-800 rounded-lg overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'}`}>
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="w-4 h-4 text-amber-400 bg-gray-700 border-gray-600 rounded focus:ring-amber-400"
                  />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button className="bg-black/50 hover:bg-black/70 text-white p-1 rounded">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="bg-black/50 hover:bg-black/70 text-white p-1 rounded">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="text-white font-medium mb-2">{image.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{image.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(image.id)}
                      className="bg-amber-400 hover:bg-amber-500 text-black px-3 py-1 rounded text-sm flex items-center space-x-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>HD</span>
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>Voir</span>
                    </button>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                    <ShoppingCart className="h-3 w-3" />
                    <span>Tirage</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Mes commandes</h2>
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Aucune commande pour le moment.</p>
        <p className="text-gray-500 text-sm mt-2">Vos commandes de tirages apparaîtront ici.</p>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Mes devis</h2>
      
      <div className="space-y-4">
        {userQuotes.map((quote) => (
          <div key={quote.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{quote.service}</h3>
                <p className="text-gray-400">Demandé le {new Date(quote.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                quote.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                quote.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {quote.status === 'pending' ? 'En attente' :
                 quote.status === 'approved' ? 'Approuvé' :
                 quote.status === 'rejected' ? 'Refusé' : 'Terminé'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400">Date souhaitée:</p>
                <p className="text-white">{quote.date || 'Non spécifiée'}</p>
              </div>
              <div>
                <p className="text-gray-400">Budget:</p>
                <p className="text-white">{quote.budget || 'Non spécifié'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-400">Message:</p>
              <p className="text-white">{quote.message}</p>
            </div>
            
            {quote.price && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-lg font-semibold text-white">
                  Prix: {quote.price.toLocaleString()} FCFA
                </span>
                {quote.status === 'approved' && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payer</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        
        {userQuotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun devis pour le moment.</p>
            <p className="text-gray-500 text-sm mt-2">Vos demandes de devis apparaîtront ici.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Mon profil</h2>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              value={user?.name || ''}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none"
              readOnly
            />
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'gallery':
        return renderGallery();
      case 'orders':
        return renderOrders();
      case 'quotes':
        return renderQuotes();
      case 'profile':
        return renderProfile();
      default:
        return renderGallery();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Espace Client</h1>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-lg"
          >
            Retour au site
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default ClientSpace;