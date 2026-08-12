import { useState, useCallback } from 'react';
import type { StageTrack, RoomEntry } from '../types';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'story' | 'room'>('story');
  const [currentTrackTitle, setCurrentTrackTitle] = useState('Pehle Bhi Main');
  const [currentArtist, setCurrentArtist] = useState('Vishal Mishra');
  const [embedUrl, setEmbedUrl] = useState('https://www.youtube-nocookie.com/embed/6RxJCCHVY_U?autoplay=1&enablejsapi=1');
  const [progress, setProgress] = useState(18);

  const playStageTrack = useCallback((stage: StageTrack) => {
    setActiveMode('story');
    setCurrentTrackTitle(stage.song);
    setCurrentArtist(stage.artist);
    if (stage.youtubeUrl) {
      setEmbedUrl(stage.youtubeUrl);
    }
    setIsPlaying(true);
  }, []);

  const playRoomEntry = useCallback((entry: RoomEntry) => {
    setActiveMode('room');
    setCurrentTrackTitle(entry.title);
    setCurrentArtist(`Shared by ${entry.addedBy}`);
    setEmbedUrl(entry.embedUrl);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const nextTrack = useCallback((stages: StageTrack[], currentStageId: string) => {
    if (activeMode === 'story') {
      const unlocked = stages.filter(s => s.isUnlocked);
      const idx = unlocked.findIndex(s => s.id === currentStageId);
      const nextIdx = (idx + 1) % unlocked.length;
      playStageTrack(unlocked[nextIdx]);
    }
  }, [activeMode, playStageTrack]);

  const prevTrack = useCallback((stages: StageTrack[], currentStageId: string) => {
    if (activeMode === 'story') {
      const unlocked = stages.filter(s => s.isUnlocked);
      const idx = unlocked.findIndex(s => s.id === currentStageId);
      const prevIdx = (idx - 1 + unlocked.length) % unlocked.length;
      playStageTrack(unlocked[prevIdx]);
    }
  }, [activeMode, playStageTrack]);

  return {
    isPlaying,
    activeMode,
    currentTrackTitle,
    currentArtist,
    embedUrl,
    progress,
    setProgress,
    playStageTrack,
    playRoomEntry,
    togglePlay,
    setActiveMode,
    nextTrack,
    prevTrack
  };
}
