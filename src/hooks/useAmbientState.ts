import { useState, useCallback } from 'react';
import { STAGES, STARTER_PLAYLISTS } from '../data/stages';
import type { StageTrack, RoomEntry } from '../types';

export function useAmbientState() {
  const [stages, setStages] = useState<StageTrack[]>(STAGES);
  const [activeStageId, setActiveStageId] = useState<string>('talking');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  
  // Modal Visibility State
  const [activeModal, setActiveModal] = useState<'map' | 'game' | 'win' | 'room' | null>(null);

  // Initial Shared Room Diary Entries (Empty by default - filled as users select or paste links!)
  const [roomEntries, setRoomEntries] = useState<RoomEntry[]>([]);
  const [selectedRoomPlaylist, setSelectedRoomPlaylist] = useState(STARTER_PLAYLISTS[0]);

  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];
  const completedCount = stages.filter(s => s.isCompleted).length;

  const openStage = useCallback((id: string) => {
    const stage = stages.find(s => s.id === id);
    if (!stage || !stage.isUnlocked) return;
    setActiveStageId(id);
    setSelectedChoice(null);
    setActiveModal('game');
  }, [stages]);

  const completeStage = useCallback(() => {
    setStages(prev => {
      const idx = prev.findIndex(s => s.id === activeStageId);
      const nextIdx = idx + 1;
      return prev.map((s, i) => {
        if (i === idx) return { ...s, isCompleted: true };
        if (i === nextIdx) return { ...s, isUnlocked: true };
        return s;
      });
    });
    setActiveModal('win');
  }, [activeStageId]);

  const openNextStage = useCallback(() => {
    const idx = stages.findIndex(s => s.id === activeStageId);
    const nextIdx = idx + 1;
    if (nextIdx < stages.length) {
      setActiveStageId(stages[nextIdx].id);
      setSelectedChoice(null);
      setActiveModal('game');
    } else {
      setActiveModal('map');
    }
  }, [stages, activeStageId]);

  const addRoomEntry = useCallback((entry: RoomEntry) => {
    setRoomEntries(prev => [entry, ...prev]);
  }, []);

  const resetStory = useCallback(() => {
    setStages(STAGES);
    setActiveStageId('talking');
    setSelectedChoice(null);
    setActiveModal('map');
  }, []);

  return {
    stages,
    activeStage,
    activeStageId,
    completedCount,
    selectedChoice,
    setSelectedChoice,
    activeModal,
    setActiveModal,
    openStage,
    completeStage,
    openNextStage,
    roomEntries,
    addRoomEntry,
    selectedRoomPlaylist,
    setSelectedRoomPlaylist,
    resetStory
  };
}
