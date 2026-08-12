import { useState } from 'react';
import { CinematicWorld } from './components/world/CinematicWorld';
import { AudioProvider, useAudioEngine, type TrackSource } from './components/music/AudioEngine';
import { MusicPlayer } from './components/music/MusicPlayer';
import { GlassPanel } from './components/ui/GlassPanel';
import { NeonButton } from './components/ui/NeonButton';
import { ChapterSelector } from './components/chapters/ChapterSelector';
import { SharedPlaylist } from './components/ui/SharedPlaylist';
import { RelationshipPrompt } from './components/ui/RelationshipPrompt';
import { useAmbientState } from './hooks/useAmbientState';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import './index.css';

const DEFAULT_ROOM_PLAYLIST: TrackSource[] = [
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

function AppContent() {
  const { chapters, activeChapter, isTransitioning, selectChapter, unlockNextChapter } = useAmbientState();
  const { playTrack, setMode } = useAudioEngine();
  const [isInRoom, setIsInRoom] = useState(false);

  const handleSelectChapter = (id: string) => {
    selectChapter(id);
    const target = chapters.find(c => c.id === id);
    if (target) {
      playTrack({
        id: target.id,
        title: target.song,
        artist: target.artist,
        duration: target.duration,
        youtubeUrl: target.youtubeUrl,
        mode: 'story',
      });
    }
  };

  const handleToggleMode = () => {
    if (isInRoom) {
      setIsInRoom(false);
      setMode('story');
    } else {
      setIsInRoom(true);
      setMode('room');
    }
  };

  return (
    <>
      <CinematicWorld />
      <main className="relative z-10 flex min-h-screen items-center justify-between p-4 sm:p-8 pb-36 max-w-7xl mx-auto flex-col md:flex-row gap-6">
        
        {/* Left Side: Chapter Progression or Diary */}
        <div className="w-full md:w-[400px] shrink-0">
          <GlassPanel>
            {isInRoom ? (
              <div className="space-y-6">
                <button 
                  onClick={() => {
                    setIsInRoom(false);
                    setMode('story');
                  }}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Story Map
                </button>
                <RelationshipPrompt />
              </div>
            ) : (
              <ChapterSelector 
                chapters={chapters} 
                activeChapter={activeChapter} 
                onSelectChapter={handleSelectChapter}
                onCompleteChapter={unlockNextChapter}
              />
            )}
          </GlassPanel>
        </div>

        {/* Right Side: Main Interaction Panel or Playlist */}
        <div className="w-full md:w-[520px] shrink-0 transition-opacity duration-1000" style={{ opacity: isTransitioning ? 0 : 1 }}>
          <GlassPanel className={isInRoom ? "p-6 sm:p-8" : "text-center space-y-6 sm:space-y-8 p-6 sm:p-10"}>
            {isInRoom ? (
              <SharedPlaylist />
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/10 border border-coral/20 text-coral text-xs uppercase tracking-widest font-mono">
                  <Sparkles size={12} /> Interactive Music Experience
                </div>

                <h1 className="text-4xl sm:text-6xl font-serif tracking-widest text-white">ListenTogether</h1>
                
                <div className="space-y-2 bg-surface-2/40 p-4 rounded-xl border border-white/5">
                  <p className="text-muted tracking-widest uppercase text-[10px] font-mono">Unlocked Stage Track</p>
                  <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: activeChapter.color }}>
                    {activeChapter.song}
                  </h2>
                  <p className="text-xs text-muted">by {activeChapter.artist}</p>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  "{activeChapter.description}"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <NeonButton 
                    variant="primary" 
                    pulse 
                    onClick={() => {
                      playTrack({
                        id: activeChapter.id,
                        title: activeChapter.song,
                        artist: activeChapter.artist,
                        duration: activeChapter.duration,
                        youtubeUrl: activeChapter.youtubeUrl,
                        mode: 'story',
                      });
                    }}
                  >
                    <Play size={14} fill="currentColor" /> Play Stage Track
                  </NeonButton>

                  <NeonButton 
                    variant="secondary"
                    onClick={() => {
                      setIsInRoom(true);
                      setMode('room');
                    }}
                  >
                    Enter Room
                  </NeonButton>
                </div>
              </>
            )}
          </GlassPanel>
        </div>
      </main>

      <MusicPlayer 
        storyTracks={chapters}
        roomPlaylist={DEFAULT_ROOM_PLAYLIST}
        onToggleMode={handleToggleMode}
      />
    </>
  );
}

export function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
