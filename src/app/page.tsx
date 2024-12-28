'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getNowPlaying } from './utils/spotify';

interface SpotifyTrack {
  name: string;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  artists: Array<{ name: string }>;
  duration_ms: number;
}

interface CurrentPlayback {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack;
}

export default function Dashboard() {
  const [playback, setPlayback] = useState<CurrentPlayback | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  async function fetchCurrentSong() {
    try {
     const data = await getNowPlaying();
      setPlayback(data);
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized - please login again') {
        router.push('/');
      } else {
        setError('Failed to fetch current song');
      }
    }
  }

  useEffect(() => {

    fetchCurrentSong();
    // Poll for updates every 5 seconds
     const interval = setInterval(fetchCurrentSong, 5000);
    return () => clearInterval(interval);
  }, [router]);


  function formatTime(ms: number) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor(ms / 1000 / 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  if (error && !playback) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${playback?.item.album.images[0]?.url})` }}>
      <div className='absolute inset-0 backdrop-blur-md flex items-center justify-center'>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 relative z-10">
        {playback ? (
          <div className="flex flex-col items-center">
            <img
              src={playback.item.album.images[0]?.url}
              alt={playback.item.album.name}
              className="w-64 h-64 rounded-lg shadow-lg mb-6"
            />
            
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 text-black">{playback.item.name}</h1>
              <p className="text-gray-600 mb-4">
                {playback.item.artists.map(artist => artist.name).join(', ')}
              </p>
              <p className="text-gray-500 mb-4">{playback.item.album.name}</p>
              
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ 
                    width: `${(playback.progress_ms / playback.item.duration_ms) * 100}%` 
                  }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(playback.progress_ms)}</span>
                <span>{formatTime(playback.item.duration_ms)}</span>
              </div>

              <div className="mt-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                  playback.is_playing ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {playback.is_playing ? 'Now Playing' : 'Paused'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}