import { createContext, useContext, useState, type ReactNode } from 'react';
import type { StageTrack } from '../../hooks/useAmbientState';

export interface TrackSource {
  id: string;
  title: string;
  artist: string;
  duration: number;
  youtubeUrl: string;
  mode: 'story' | 'room';
}

interface AudioContextType {
  isPlaying: boolean;
  activeMode: 'story' | 'room';
  currentTrack: TrackSource | null;
  volume: number;
  playTrack: (track: TrackSource) => void;
  togglePlay: () => void;
  setMode: (mode: 'story' | 'room') => void;
  setVolume: (vol: number) => void;
  nextTrack: (storyTracks?: StageTrack[], roomPlaylist?: TrackSource[]) => void;
  prevTrack: (storyTracks?: StageTrack[], roomPlaylist?: TrackSource[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'story' | 'room'>('story');
  const [currentTrack, setCurrentTrack] = useState<TrackSource | null>(null);
  const [volume, setVolumeState] = useState(0.8);

  const playTrack = (track: TrackSource) => {
    setCurrentTrack(track);
    setActiveMode(track.mode);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(prev => !prev);

  const setMode = (mode: 'story' | 'room') => {
    setActiveMode(mode);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
  };

  const nextTrack = (storyTracks?: StageTrack[], roomPlaylist?: TrackSource[]) => {
    if (activeMode === 'story' && storyTracks) {
      const unlocked = storyTracks.filter(st => st.isUnlocked);
      if (unlocked.length === 0) return;
      const currentIdx = unlocked.findIndex(st => st.song === currentTrack?.title);
      const nextIdx = (currentIdx + 1) % unlocked.length;
      const nextStage = unlocked[nextIdx];
      playTrack({
        id: nextStage.id,
        title: nextStage.song,
        artist: nextStage.artist,
        duration: nextStage.duration,
        youtubeUrl: nextStage.youtubeUrl,
        mode: 'story',
      });
    } else if (activeMode === 'room' && roomPlaylist && roomPlaylist.length > 0) {
      const currentIdx = roomPlaylist.findIndex(t => t.id === currentTrack?.id);
      const nextIdx = (currentIdx + 1) % roomPlaylist.length;
      playTrack(roomPlaylist[nextIdx]);
    }
  };

  const prevTrack = (storyTracks?: StageTrack[], roomPlaylist?: TrackSource[]) => {
    if (activeMode === 'story' && storyTracks) {
      const unlocked = storyTracks.filter(st => st.isUnlocked);
      if (unlocked.length === 0) return;
      const currentIdx = unlocked.findIndex(st => st.song === currentTrack?.title);
      const prevIdx = (currentIdx - 1 + unlocked.length) % unlocked.length;
      const prevStage = unlocked[prevIdx];
      playTrack({
        id: prevStage.id,
        title: prevStage.song,
        artist: prevStage.artist,
        duration: prevStage.duration,
        youtubeUrl: prevStage.youtubeUrl,
        mode: 'story',
      });
    } else if (activeMode === 'room' && roomPlaylist && roomPlaylist.length > 0) {
      const currentIdx = roomPlaylist.findIndex(t => t.id === currentTrack?.id);
      const prevIdx = (currentIdx - 1 + roomPlaylist.length) % roomPlaylist.length;
      playTrack(roomPlaylist[prevIdx]);
    }
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      activeMode,
      currentTrack,
      volume,
      playTrack,
      togglePlay,
      setMode,
      setVolume,
      nextTrack,
      prevTrack
    }}>
      {children}
      {currentTrack && isPlaying && (
        <iframe 
          id="globalPlaylistEmbed"
          src={currentTrack.youtubeUrl}
          className="hidden" 
          allow="autoplay"
        />
      )}
    </AudioContext.Provider>
  );
}

export function useAudioEngine() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioEngine must be used within an AudioProvider');
  }
  return context;
}
