import { useState, useCallback, useEffect, useRef } from 'react';
import type { StageTrack, RoomEntry } from '../types';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'story' | 'room'>('story');
  const [currentTrackTitle, setCurrentTrackTitle] = useState('Pehle Bhi Main');
  const [currentArtist, setCurrentArtist] = useState('Vishal Mishra');
  const [embedUrl, setEmbedUrl] = useState('https://www.youtube.com/embed/vFh_63d91n8?autoplay=1&enablejsapi=1&playsinline=1');
  const [progress, setProgress] = useState(15);
  const [currentTimeSec, setCurrentTimeSec] = useState(24);
  const [totalDurationSec, setTotalDurationSec] = useState(262);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Native Web Audio API Synthesizer Fallback Engine
  const startSynthHarmonies = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      const notes = [261.63, 329.63, 392.00, 493.88, 523.25]; // C4, E4, G4, B4, C5 romantic chord notes
      let noteIdx = 0;

      synthIntervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtxRef.current.currentTime);
        
        gain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 1.2);

        noteIdx++;
      }, 1600);
    } catch {
      // Gracefully ignore audio context restriction if blocked
    }
  }, []);

  const stopSynthHarmonies = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // Play a specific stage track (Story Map)
  const playStageTrack = useCallback((stage: StageTrack) => {
    setActiveMode('story');
    setCurrentTrackTitle(stage.song);
    setCurrentArtist(stage.artist);
    setTotalDurationSec(stage.duration);
    setCurrentTimeSec(0);
    setProgress(0);
    
    if (stage.youtubeUrl) {
      setEmbedUrl(`${stage.youtubeUrl}&playsinline=1`);
    }
    setIsPlaying(true);
    startSynthHarmonies();
  }, [startSynthHarmonies]);

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
    startSynthHarmonies();
  }, [startSynthHarmonies]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      const nextState = !prev;
      if (nextState) {
        startSynthHarmonies();
      } else {
        stopSynthHarmonies();
      }
      return nextState;
    });
  }, [startSynthHarmonies, stopSynthHarmonies]);

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

  // Progress simulation for audio timer
  useEffect(() => {
    if (!isPlaying) {
      stopSynthHarmonies();
      return;
    }
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
  }, [isPlaying, totalDurationSec, stopSynthHarmonies]);

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
