import { CinematicWorld } from './components/world/CinematicWorld';
import { Topbar } from './components/layout/Topbar';
import { Hero } from './components/layout/Hero';
import { PlayerDock } from './components/layout/PlayerDock';
import { MapModal } from './components/modals/MapModal';
import { GameModal } from './components/modals/GameModal';
import { WinModal } from './components/modals/WinModal';
import { RoomModal } from './components/modals/RoomModal';
import { useAmbientState } from './hooks/useAmbientState';
import { useAudioEngine } from './hooks/useAudioEngine';

export function App() {
  const {
    stages,
    activeStage,
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
    resetStory
  } = useAmbientState();

  const {
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
  } = useAudioEngine();

  const handleCompleteStage = () => {
    completeStage();
    // Directly play the unlocked stage track
    playStageTrack(activeStage);
  };

  const handleToggleSection = () => {
    if (activeMode === 'story') {
      setActiveMode('room');
      if (roomEntries.length > 0) {
        playRoomEntry(roomEntries[0]);
      }
    } else {
      setActiveMode('story');
      playStageTrack(activeStage);
    }
  };

  return (
    <div className="relative min-h-screen text-ink overflow-x-hidden select-none">
      
      {/* 20-Second Ambient Video Loop & Atmospheric World Stack */}
      <CinematicWorld />
      
      {/* Noise Grain Overlay */}
      <div className="noise" />

      {/* Global Audio Stream Embed */}
      {isPlaying && embedUrl && (
        <iframe 
          key={embedUrl}
          src={embedUrl}
          className="hidden pointer-events-none"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          aria-hidden="true"
        />
      )}

      {/* Top Header */}
      <Topbar 
        heartCount={completedCount}
        onOpenRoom={() => setActiveModal('room')}
      />

      {/* Main Full-Screen Hero View */}
      <Hero 
        currentStageName={activeStage.name}
        onOpenRoom={() => setActiveModal('room')}
        onOpenMap={() => setActiveModal('map')}
      />

      {/* Fixed Bottom Player Dock */}
      <PlayerDock 
        title={currentTrackTitle}
        artist={currentArtist}
        isPlaying={isPlaying}
        activeMode={activeMode}
        progress={progress}
        currentTimeSec={currentTimeSec}
        totalDurationSec={totalDurationSec}
        stages={stages}
        currentStageId={activeStage.id}
        roomEntries={roomEntries}
        onTogglePlay={togglePlay}
        onPrev={() => prevTrack(stages, activeStage.id, roomEntries)}
        onNext={() => nextTrack(stages, activeStage.id, roomEntries)}
        onToggleSection={handleToggleSection}
        onProgressChange={seekProgress}
      />

      {/* 1. Story Map Modal */}
      <MapModal 
        isOpen={activeModal === 'map'}
        stages={stages}
        completedCount={completedCount}
        onClose={() => setActiveModal(null)}
        onSelectStage={(id) => {
          openStage(id);
          const target = stages.find(s => s.id === id);
          if (target && target.isUnlocked) {
            playStageTrack(target);
          }
        }}
        onResetStory={resetStory}
      />

      {/* 2. Relationship Quest Modal (A/B/C Choices) */}
      <GameModal 
        isOpen={activeModal === 'game'}
        stage={activeStage}
        selectedChoice={selectedChoice}
        onClose={() => setActiveModal(null)}
        onSelectChoice={setSelectedChoice}
        onComplete={handleCompleteStage}
        onPlaySong={playStageTrack}
      />

      {/* 3. Level Cleared Celebration Modal */}
      <WinModal 
        isOpen={activeModal === 'win'}
        stage={activeStage}
        onNextLevel={openNextStage}
        onBackToMap={() => setActiveModal('map')}
        onPlaySong={playStageTrack}
      />

      {/* 4. Shared Listening Room Modal */}
      <RoomModal 
        isOpen={activeModal === 'room'}
        entries={roomEntries}
        embedUrl={embedUrl}
        onClose={() => setActiveModal(null)}
        onAddEntry={addRoomEntry}
        onSelectPlaylist={(p) => {
          playRoomEntry({
            id: p.id,
            title: p.title,
            addedBy: 'Person 1',
            url: p.embedUrl,
            mood: 'soft',
            timestamp: 'Just now',
            provider: p.provider,
            embedUrl: p.embedUrl,
          });
        }}
      />

    </div>
  );
}

export default App;
