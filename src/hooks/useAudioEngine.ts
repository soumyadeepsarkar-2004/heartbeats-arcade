import { useState, useCallback, useRef } from 'react';
import type { StageTrack, RoomEntry } from '../types';
import type { YouTubePlayerRef } from '../components/audio/YouTubeAudioPlayer';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'story' | 'room'>('story');
  const [currentTrackTitle, setCurrentTrackTitle] = useState('Pehle Bhi Main');
  const [currentArtist, setCurrentArtist] = useState('Vishal Mishra');
  const [currentTrackColor, setCurrentTrackColor] = useState('#FF7A59');
  const [videoId, setVideoId] = useState<string | undefined>('9cHq63r1vHQ');
  const [playlistId, setPlaylistId] = useState<string | undefined>(undefined);
  const [ytMusicUrl, setYtMusicUrl] = useState<string | undefined>('https://music.youtube.com/watch?v=9cHq63r1vHQ&list=PLUc_Kv5jDS44');
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [totalDurationSec, setTotalDurationSec] = useState(251);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const playerRef = useRef<YouTubePlayerRef | null>(null);

  // Play a specific stage track (Story Map)
  const playStageTrack = useCallback((stage: StageTrack) => {
    setActiveMode('story');
    setCurrentTrackTitle(stage.song);
    setCurrentArtist(stage.artist);
    setCurrentTrackColor(stage.color || '#FF7A59');
    setTotalDurationSec(stage.duration || 240);
    setCurrentTimeSec(0);
    setProgress(0);
    
    setVideoId(stage.youtubeTrackId || '9cHq63r1vHQ');
    setPlaylistId(stage.youtubePlaylistId);
    setYtMusicUrl(stage.ytMusicUrl || `https://music.youtube.com/watch?v=${stage.youtubeTrackId}`);
    
    setIsPlaying(true);
  }, []);

  // Play a room playlist entry (Shared Room)
  const playRoomEntry = useCallback((entry: RoomEntry) => {
    setActiveMode('room');
    setCurrentTrackTitle(entry.title);
    setCurrentArtist(entry.artist || `Shared by ${entry.addedBy}`);
    setCurrentTrackColor(entry.color || '#C8FF4F');
    setTotalDurationSec(210);
    setCurrentTimeSec(0);
    setProgress(0);
    
    setVideoId(entry.youtubeTrackId);
    setPlaylistId(entry.youtubePlaylistId);
    setYtMusicUrl(entry.ytMusicUrl || (entry.youtubeTrackId ? `https://music.youtube.com/watch?v=${entry.youtubeTrackId}` : undefined));
    
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      const nextState = !prev;
      if (nextState) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
      return nextState;
    });
  }, []);

  // Handle Real-time position update from YouTube Player API
  const handleProgressSync = useCallback((currSec: number, durSec: number) => {
    if (durSec > 0) {
      setTotalDurationSec(Math.round(durSec));
      setCurrentTimeSec(Math.round(currSec));
      setProgress(Math.round((currSec / durSec) * 100));
    }
  }, []);

  // Handle Seek from UI Range Slider
  const seekProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
    const targetSec = Math.round((newProgress / 100) * totalDurationSec);
    setCurrentTimeSec(targetSec);
    playerRef.current?.seekTo(targetSec);
  }, [totalDurationSec]);

  // Section-Isolated Next Track Logic
  const nextTrack = useCallback((stages: StageTrack[], currentStageId: string, roomEntries: RoomEntry[]) => {
    if (activeMode === 'story') {
      const unlockedStages = stages.filter(s => s.isUnlocked);
      if (unlockedStages.length === 0) return;

      const currentIdx = unlockedStages.findIndex(s => s.id === currentStageId);
      const nextIdx = (currentIdx + 1) % unlockedStages.length;
      playStageTrack(unlockedStages[nextIdx]);
    } else {
      if (roomEntries.length === 0) return;
      const currentIdx = roomEntries.findIndex(r => r.title === currentTrackTitle);
      const nextIdx = (currentIdx + 1) % roomEntries.length;
      playRoomEntry(roomEntries[nextIdx]);
    }
  }, [activeMode, currentTrackTitle, playStageTrack, playRoomEntry]);

  // Section-Isolated Previous Track Logic
  const prevTrack = useCallback((stages: StageTrack[], currentStageId: string, roomEntries: RoomEntry[]) => {
    if (activeMode === 'story') {
      const unlockedStages = stages.filter(s => s.isUnlocked);
      if (unlockedStages.length === 0) return;

      const currentIdx = unlockedStages.findIndex(s => s.id === currentStageId);
      const prevIdx = (currentIdx - 1 + unlockedStages.length) % unlockedStages.length;
      playStageTrack(unlockedStages[prevIdx]);
    } else {
      if (roomEntries.length === 0) return;
      const currentIdx = roomEntries.findIndex(r => r.title === currentTrackTitle);
      const prevIdx = (currentIdx - 1 + roomEntries.length) % roomEntries.length;
      playRoomEntry(roomEntries[prevIdx]);
    }
  }, [activeMode, currentTrackTitle, playStageTrack, playRoomEntry]);

  const toggleMiniPlayer = useCallback(() => {
    setShowMiniPlayer(prev => !prev);
  }, []);

  return {
    isPlaying,
    activeMode,
    currentTrackTitle,
    currentArtist,
    currentTrackColor,
    videoId,
    playlistId,
    ytMusicUrl,
    progress,
    currentTimeSec,
    totalDurationSec,
    showMiniPlayer,
    playerRef,
    setIsPlaying,
    setCurrentTimeSec,
    playStageTrack,
    playRoomEntry,
    togglePlay,
    setActiveMode,
    nextTrack,
    prevTrack,
    seekProgress,
    handleProgressSync,
    toggleMiniPlayer
  };
}
