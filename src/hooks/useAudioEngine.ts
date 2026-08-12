import { useState, useCallback, useEffect } from 'react';
import type { StageTrack, RoomEntry } from '../types';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'story' | 'room'>('story');
  const [currentTrackTitle, setCurrentTrackTitle] = useState('Pehle Bhi Main');
  const [currentArtist, setCurrentArtist] = useState('Vishal Mishra');
  const [embedUrl, setEmbedUrl] = useState('https://www.youtube.com/embed/vFh_63d91n8?autoplay=1&enablejsapi=1');
  const [progress, setProgress] = useState(15);
  const [currentTimeSec, setCurrentTimeSec] = useState(24);
  const [totalDurationSec, setTotalDurationSec] = useState(262);

  // Play a specific stage track (Story Map)
  const playStageTrack = useCallback((stage: StageTrack) => {
    setActiveMode('story');
    setCurrentTrackTitle(stage.song);
    setCurrentArtist(stage.artist);
    setTotalDurationSec(stage.duration);
    setCurrentTimeSec(0);
    setProgress(0);
    
    if (stage.youtubeUrl) {
      setEmbedUrl(stage.youtubeUrl);
    }
    setIsPlaying(true);
  }, []);

  // Play a room playlist entry (Shared Room)
  const playRoomEntry = useCallback((entry: RoomEntry) => {
    setActiveMode('room');
    setCurrentTrackTitle(entry.title);
    setCurrentArtist(`Shared by ${entry.addedBy}`);
    setTotalDurationSec(210);
    setCurrentTimeSec(0);
    setProgress(0);
    
    if (entry.embedUrl) {
      setEmbedUrl(entry.embedUrl);
    }
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Section-Isolated Next Track Logic
  const nextTrack = useCallback((stages: StageTrack[], currentStageId: string, roomEntries: RoomEntry[]) => {
    if (activeMode === 'story') {
      // Loop STRICTLY within unlocked Story Map tracks
      const unlockedStages = stages.filter(s => s.isUnlocked);
      if (unlockedStages.length === 0) return;

      const currentIdx = unlockedStages.findIndex(s => s.id === currentStageId);
      const nextIdx = (currentIdx + 1) % unlockedStages.length;
      playStageTrack(unlockedStages[nextIdx]);
    } else {
      // Loop STRICTLY within Room entries
      if (roomEntries.length === 0) return;
      const currentIdx = roomEntries.findIndex(r => r.title === currentTrackTitle);
      const nextIdx = (currentIdx + 1) % roomEntries.length;
      playRoomEntry(roomEntries[nextIdx]);
    }
  }, [activeMode, currentTrackTitle, playStageTrack, playRoomEntry]);

  // Section-Isolated Previous Track Logic
  const prevTrack = useCallback((stages: StageTrack[], currentStageId: string, roomEntries: RoomEntry[]) => {
    if (activeMode === 'story') {
      // Loop STRICTLY within unlocked Story Map tracks
      const unlockedStages = stages.filter(s => s.isUnlocked);
      if (unlockedStages.length === 0) return;

      const currentIdx = unlockedStages.findIndex(s => s.id === currentStageId);
      const prevIdx = (currentIdx - 1 + unlockedStages.length) % unlockedStages.length;
      playStageTrack(unlockedStages[prevIdx]);
    } else {
      // Loop STRICTLY within Room entries
      if (roomEntries.length === 0) return;
      const currentIdx = roomEntries.findIndex(r => r.title === currentTrackTitle);
      const prevIdx = (currentIdx - 1 + roomEntries.length) % roomEntries.length;
      playRoomEntry(roomEntries[prevIdx]);
    }
  }, [activeMode, currentTrackTitle, playStageTrack, playRoomEntry]);

  // Progress simulation for audio timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec(prev => {
        const nextTime = prev + 1;
        if (nextTime >= totalDurationSec) {
          return 0;
        }
        setProgress(Math.round((nextTime / totalDurationSec) * 100));
        return nextTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, totalDurationSec]);

  const seekProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
    setCurrentTimeSec(Math.round((newProgress / 100) * totalDurationSec));
  }, [totalDurationSec]);

  return {
    isPlaying,
    activeMode,
    currentTrackTitle,
    currentArtist,
    embedUrl,
    progress,
    currentTimeSec,
    totalDurationSec,
    playStageTrack,
    playRoomEntry,
    togglePlay,
    setActiveMode,
    nextTrack,
    prevTrack,
    seekProgress
  };
}
