import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 1,
      title: 'Mariage traditionnel béninois',
      description: 'Cérémonie traditionnelle avec danse et musique locale',
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '3:45'
    },
    {
      id: 2,
      title: 'Portrait cinématographique',
      description: 'Séance portrait avec éclairage artistique',
      thumbnail: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '2:30'
    },
    {
      id: 3,
      title: 'Événement corporate',
      description: 'Couverture complète d\'un événement d\'entreprise',
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:20'
    },
    {
      id: 4,
      title: 'Clip musical',
      description: 'Réalisation d\'un clip pour un artiste local',
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '4:15'
    }
  ];

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const openExternalLink = (videoUrl: string) => {
    const youtubeUrl = videoUrl.replace('/embed/', '/watch?v=');
    window.open(youtubeUrl, '_blank');
  };

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        closeVideo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedVideo]);

  return (
    <section id="videos" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Mes <span className="text-amber-400">Vidéos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explorez mes créations vidéographiques, de la capture d'événements aux clips artistiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative group cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openVideo(video.videoUrl)}
                      className="bg-amber-400 hover:bg-amber-500 text-black rounded-full p-4 transition-colors duration-300"
                    >
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{video.title}</h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => openVideo(video.videoUrl)}
                      className="flex items-center space-x-2 text-amber-400 hover:text-amber-500 transition-colors duration-300"
                    >
                      <Play className="h-4 w-4" />
                      <span>Voir la vidéo</span>
                    </button>
                    <button 
                      onClick={() => openExternalLink(video.videoUrl)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Ouvrir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal vidéo */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <div className="max-w-4xl w-full relative">
                <button
                  onClick={closeVideo}
                  className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors duration-300"
                >
                  <X className="h-8 w-8" />
                </button>
                <div className="relative">
                  <iframe
                    src={selectedVideo}
                    title="Video player"
                    className="w-full h-64 md:h-96 lg:h-[500px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Videos;