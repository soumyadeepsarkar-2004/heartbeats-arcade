import { Play, Pause, SkipForward, SkipBack, Radio } from 'lucide-react';
import { useAudioEngine, type TrackSource } from './AudioEngine';
import type { StageTrack } from '../../hooks/useAmbientState';

interface MusicPlayerProps {
  storyTracks?: StageTrack[];
  roomPlaylist?: TrackSource[];
  onToggleMode?: () => void;
}

export function MusicPlayer({ storyTracks = [], roomPlaylist = [], onToggleMode }: MusicPlayerProps) {
  const { isPlaying, togglePlay, currentTrack, activeMode, nextTrack, prevTrack } = useAudioEngine();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 heartbeat-panel w-[92%] max-w-[640px] flex items-center p-3 sm:p-4 gap-3 sm:gap-4 z-50 rounded-2xl border border-white/10 shadow-2xl bg-surface/90 backdrop-blur-md">
      
      {/* Album / Track visual icon */}
      <div className="w-12 h-12 bg-surface-2 rounded-xl shrink-0 overflow-hidden relative border border-white/10 flex items-center justify-center">
        <Radio size={20} className={isPlaying ? "text-lime animate-pulse" : "text-muted"} />
      </div>
      
      {/* Track Info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-mono ${
            activeMode === 'story' ? 'bg-coral/20 text-coral border border-coral/30' : 'bg-lime/20 text-lime border border-lime/30'
          }`}>
            {activeMode === 'story' ? 'Story Map' : 'Shared Room'}
          </span>
        </div>
        <h3 className="text-white text-sm font-medium truncate">
          {currentTrack ? currentTrack.title : 'No Track Playing'}
        </h3>
        <p className="text-muted text-xs truncate">
          {currentTrack ? currentTrack.artist : 'Select a stage to play music'}
        </p>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={() => prevTrack(storyTracks, roomPlaylist)}
          className="p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
          title="Previous Track"
        >
          <SkipBack size={18} />
        </button>

        <button 
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white text-bg flex items-center justify-center hover:bg-lime transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>

        <button 
          onClick={() => nextTrack(storyTracks, roomPlaylist)}
          className="p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
          title="Next Track"
        >
          <SkipForward size={18} />
        </button>

        {onToggleMode && (
          <button 
            onClick={onToggleMode}
            className="ml-1 px-3 py-1.5 rounded-full bg-surface-2 text-[10px] uppercase tracking-wider text-muted hover:text-white border border-white/10 hover:border-white/20 transition-colors"
            title="Switch Player Mode"
          >
            {activeMode === 'story' ? 'Room' : 'Map'}
          </button>
        )}
      </div>
    </div>
  );
}
