interface PlayerDockProps {
  title: string;
  artist: string;
  isPlaying: boolean;
  activeMode: 'story' | 'room';
  progress: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenRoom: () => void;
  onProgressChange: (val: number) => void;
}

export function PlayerDock({
  title,
  artist,
  isPlaying,
  activeMode,
  progress,
  onTogglePlay,
  onPrev,
  onNext,
  onOpenRoom,
  onProgressChange
}: PlayerDockProps) {
  return (
    <section className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 heartbeat-panel w-[94%] max-w-[720px] p-3 sm:p-4 rounded-2xl flex flex-col gap-2 select-none">
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Cover Art cassette badge */}
        <div className="w-11 h-11 sm:w-13 sm:h-13 bg-surface-2 rounded-xl border border-white/10 shrink-0 relative flex flex-col items-center justify-center overflow-hidden">
          <span className="absolute top-1 left-1.5 text-[7px] font-mono text-muted leading-tight">SIDE<br />A</span>
          <span className="text-coral text-xs sm:text-sm">♥</span>
          <span className="absolute bottom-1 left-1.5 text-[7px] font-mono text-muted truncate max-w-[36px]">
            {activeMode === 'story' ? 'STORY' : 'ROOM'}
          </span>
        </div>

        {/* Track Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] uppercase tracking-widest font-mono text-muted">
              {activeMode === 'story' ? 'STAGE PREVIEW' : 'SHARED ROOM'}
            </span>
            <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-coral/15 text-coral font-mono">
              {activeMode === 'story' ? 'YouTube' : 'Sync'}
            </span>
          </div>
          <h2 className="text-white text-xs sm:text-sm font-medium truncate font-sans">
            {title}
          </h2>
          <p className="text-muted text-[10px] sm:text-xs truncate">
            {artist}
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button 
            onClick={onPrev}
            className="p-1.5 text-muted hover:text-white transition-colors"
            title="Previous track"
          >
            ⏮
          </button>

          <button 
            onClick={onTogglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-bg flex items-center justify-center hover:bg-lime transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M7 5h3v14H7V5Zm7 0h3v14h-3V5Z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="m8 5 11 7-11 7V5Z" />
              </svg>
            )}
          </button>

          <button 
            onClick={onNext}
            className="p-1.5 text-muted hover:text-white transition-colors"
            title="Next track"
          >
            ⏭
          </button>

          <button 
            onClick={onOpenRoom}
            className="px-2.5 py-1 rounded-full bg-surface-2 hover:bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white transition-colors"
            title="Open Listening Room"
          >
            ◌ room
          </button>
        </div>
      </div>

      {/* Track Progress Bar */}
      <div className="flex items-center gap-3 text-[9px] font-mono text-muted pt-1">
        <input 
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onProgressChange(Number(e.target.value))}
          className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-lime"
        />
        <span>0:18</span>
        <span>/</span>
        <span>3:42</span>
      </div>
    </section>
  );
}
