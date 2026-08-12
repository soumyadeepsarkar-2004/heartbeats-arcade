import { useState } from 'react';
import { Music, Plus, Users, Play } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { useAudioEngine, type TrackSource } from '../music/AudioEngine';

const STARTER_ROOM_PLAYLIST: TrackSource[] = [
  {
    id: 'room-1',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh, Sachin-Jigar',
    duration: 261,
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/BddP6PYo2gs?autoplay=1&enablejsapi=1',
    mode: 'room'
  },
  {
    id: 'room-2',
    title: 'As It Was',
    artist: 'Harry Styles',
    duration: 167,
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/H5v3kku4y6Q?autoplay=1&enablejsapi=1',
    mode: 'room'
  },
  {
    id: 'room-3',
    title: 'Kesariya',
    artist: 'Arijit Singh, Pritam',
    duration: 268,
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/BDDpocN5050?autoplay=1&enablejsapi=1',
    mode: 'room'
  }
];

export function SharedPlaylist() {
  const [url, setUrl] = useState('');
  const [playlist, setPlaylist] = useState<TrackSource[]>(STARTER_ROOM_PLAYLIST);
  const { playTrack, currentTrack } = useAudioEngine();

  const handleAddTrack = () => {
    if (!url.trim()) return;
    const newTrack: TrackSource = {
      id: `custom-${Date.now()}`,
      title: `Custom Track ${playlist.length + 1}`,
      artist: 'Shared Room Partner',
      duration: 210,
      youtubeUrl: url.includes('embed') ? url : `https://www.youtube-nocookie.com/embed/${url.split('v=')[1] || ''}?autoplay=1&enablejsapi=1`,
      mode: 'room'
    };
    setPlaylist(prev => [...prev, newTrack]);
    setUrl('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-white tracking-widest flex items-center gap-2">
          <Users size={20} className="text-lavender" />
          Shared Room
        </h3>
        <span className="text-xs uppercase tracking-widest text-lime px-3 py-1 bg-lime/10 rounded-full font-mono border border-lime/20">
          Live Sync
        </span>
      </div>

      <div className="bg-bg/50 border border-white/5 rounded-xl p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-muted">Add YouTube Link to Room</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube video link..."
              className="flex-1 bg-surface-2 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-coral transition-colors"
            />
            <NeonButton variant="secondary" className="px-4 py-2" onClick={handleAddTrack}>
              <Plus size={16} />
            </NeonButton>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="text-[10px] uppercase tracking-widest text-muted mb-3 font-mono">Shared Playlist Queue</div>
          
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {playlist.map((track) => (
              <div 
                key={track.id} 
                onClick={() => playTrack(track)}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer group ${
                  currentTrack?.id === track.id
                    ? 'bg-lime/10 border-lime/30 text-white'
                    : 'bg-surface-2/40 border-transparent hover:bg-surface-2/70 hover:border-white/10'
                }`}
              >
                <div className="w-9 h-9 bg-surface-2 rounded-md flex items-center justify-center shrink-0 border border-white/5">
                  <Music size={14} className={currentTrack?.id === track.id ? "text-lime" : "text-muted group-hover:text-coral"} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-white/90 truncate group-hover:text-white transition-colors">
                    {track.title}
                  </h4>
                  <p className="text-xs text-muted truncate">{track.artist}</p>
                </div>
                <button 
                  className={`p-1.5 rounded-full transition-colors ${
                    currentTrack?.id === track.id ? 'bg-lime text-bg' : 'text-muted group-hover:text-white'
                  }`}
                >
                  <Play size={12} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
