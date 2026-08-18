import { useState } from 'react';
import { CinematicWorld } from './components/world/CinematicWorld';
import { Topbar } from './components/layout/Topbar';
import { Hero } from './components/layout/Hero';
import { PlayerDock } from './components/layout/PlayerDock';
import { MapModal } from './components/modals/MapModal';
import { GameModal } from './components/modals/GameModal';
import { WinModal } from './components/modals/WinModal';
import { RoomModal } from './components/modals/RoomModal';
import { YouTubeAudioPlayer } from './components/audio/YouTubeAudioPlayer';
import { useAmbientState } from './hooks/useAmbientState';
import { useAudioEngine } from './hooks/useAudioEngine';
import { useRoomSync } from './hooks/useRoomSync';

export function App() {
  const [currentRole, setCurrentRole] = useState<'Person 1' | 'Person 2'>('Person 1');

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
    currentTrackColor,
    videoId,
    playlistId,
    ytMusicUrl,
    progress,
    currentTimeSec,
    totalDurationSec,
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
    handleProgressSync
  } = useAudioEngine();

  // Real-Time Dual Listener Sync Hook
  const {
    partnerActive,
    partnerNotification,
    syncTrackChange,
    syncPlayPause,
    syncSeek,
    syncAddEntry
  } = useRoomSync({
    currentRole,
    onSyncTrack: (entry) => playRoomEntry(entry),
    onSyncPlayPause: (playing) => setIsPlaying(playing),
    onSyncSeek: (sec) => {
      setCurrentTimeSec(sec);
      playerRef.current?.seekTo(sec);
    },
    onSyncAddEntry: (entry) => addRoomEntry(entry)
  });

  const handlePlayRoomEntry = (entry: any) => {
    playRoomEntry(entry);
    syncTrackChange(entry);
  };

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    togglePlay();
    syncPlayPause(nextState);
  };

  const handleSeekProgress = (val: number) => {
    seekProgress(val);
    const targetSec = Math.round((val / 100) * totalDurationSec);
    syncSeek(targetSec);
  };

  const handleAddRoomEntry = (entry: any) => {
    addRoomEntry(entry);
    syncAddEntry(entry);
  };

  const handleCompleteStage = () => {
    completeStage();
    playStageTrack(activeStage);
  };

  const handleToggleSection = () => {
    if (activeMode === 'story') {
      setActiveMode('room');
      if (roomEntries.length > 0) {
        handlePlayRoomEntry(roomEntries[0]);
      }
    } else {
      setActiveMode('story');
      playStageTrack(activeStage);
    }
  };

  const playerNode = (
    <YouTubeAudioPlayer 
      ref={playerRef}
      videoId={videoId}
      playlistId={playlistId}
      isPlaying={isPlaying}
      onStateChange={(playing) => setIsPlaying(playing)}
      onProgressSync={handleProgressSync}
      onEnded={() => nextTrack(stages, activeStage.id, roomEntries)}
      currentTrackTitle={currentTrackTitle}
      currentArtist={currentArtist}
      ytMusicUrl={ytMusicUrl}
      isRoomOpen={activeModal === 'room'}
    />
  );

  return (
    <div className="relative min-h-screen text-ink overflow-x-hidden select-none">
      
      {/* 20-Second Ambient Video Loop & Atmospheric World Stack */}
      <CinematicWorld />
      
      {/* Noise Grain Overlay */}
      <div className="noise" />

      {/* Clean Top Header */}
      <Topbar 
        heartCount={completedCount}
        partnerActive={partnerActive}
        partnerNotification={partnerNotification}
        onOpenRoom={() => setActiveModal('room')}
      />

      {/* Main Full-Screen Hero View */}
      <Hero 
        currentStageName={activeStage.name}
        onOpenRoom={() => setActiveModal('room')}
        onOpenMap={() => setActiveModal('map')}
      />

      {/* Fixed Bottom Player Dock with dynamic song color matching */}
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
        ytMusicUrl={ytMusicUrl}
        currentTrackColor={currentTrackColor}
        onTogglePlay={handleTogglePlay}
        onPrev={() => prevTrack(stages, activeStage.id, roomEntries)}
        onNext={() => nextTrack(stages, activeStage.id, roomEntries)}
        onToggleSection={handleToggleSection}
        onProgressChange={handleSeekProgress}
        onOpenRoom={() => setActiveModal('room')}
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

      {/* 4. Shared Listening Room Modal with Embedded Video Screen */}
      <RoomModal 
        isOpen={activeModal === 'room'}
        entries={roomEntries}
        currentTrackTitle={currentTrackTitle}
        currentArtist={currentArtist}
        isPlaying={isPlaying}
        ytMusicUrl={ytMusicUrl}
        currentRole={currentRole}
        partnerActive={partnerActive}
        partnerNotification={partnerNotification}
        videoPlayerNode={playerNode}
        onChangeRole={(role) => setCurrentRole(role)}
        onClose={() => setActiveModal(null)}
        onAddEntry={handleAddRoomEntry}
        onSelectEntry={(entry) => handlePlayRoomEntry(entry)}
        onSelectPlaylist={(p) => {
          const firstTrack = p.tracks?.[0];
          handlePlayRoomEntry({
            id: p.id,
            title: firstTrack?.title || p.title,
            artist: firstTrack?.artist || 'Curated Playlist',
            addedBy: currentRole,
            url: p.ytMusicUrl || p.embedUrl,
            mood: 'soft',
            timestamp: 'Just now',
            provider: p.provider,
            embedUrl: firstTrack?.youtubeTrackId
              ? `https://www.youtube-nocookie.com/embed/${firstTrack.youtubeTrackId}?autoplay=1&enablejsapi=1`
              : p.embedUrl,
            youtubeTrackId: firstTrack?.youtubeTrackId || p.youtubeTrackId,
            youtubePlaylistId: p.youtubePlaylistId,
            ytMusicUrl: firstTrack?.ytMusicUrl || p.ytMusicUrl,
            color: p.color
          });
        }}
      />

    </div>
  );
}

export default App;
