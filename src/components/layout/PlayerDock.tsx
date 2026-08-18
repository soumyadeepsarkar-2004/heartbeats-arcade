import type { StageTrack, RoomEntry } from '../../types';

interface PlayerDockProps {
  title: string;
  artist: string;
  isPlaying: boolean;
  activeMode: 'story' | 'room';
  progress: number;
  currentTimeSec: number;
  totalDurationSec: number;
  stages: StageTrack[];
  currentStageId: string;
  roomEntries: RoomEntry[];
  ytMusicUrl?: string;
  currentTrackColor?: string;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSection: () => void;
  onProgressChange: (val: number) => void;
  onOpenRoom?: () => void;
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PlayerDock({
  title,
  artist,
  isPlaying,
  activeMode,
  progress,
  currentTimeSec,
  totalDurationSec,
  ytMusicUrl,
  currentTrackColor = '#FF7A59',
  onTogglePlay,
  onPrev,
  onNext,
  onToggleSection,
  onProgressChange,
  onOpenRoom
}: PlayerDockProps) {
  return (
    <section 
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[760px] p-3 sm:p-4 rounded-2xl flex flex-col gap-2 select-none transition-all duration-300 backdrop-blur-xl border shadow-2xl"
      style={{
        backgroundColor: '#0d1027',
        borderColor: `${currentTrackColor}70`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
      }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Rotating Music Vinyl Disc Cassette Badge */}
        <div 
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl border shrink-0 relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md group cursor-pointer"
          style={{ 
            backgroundColor: '#171A38',
            borderColor: `${currentTrackColor}60` 
          }}
          onClick={onOpenRoom}
          title="Click to open Shared Listening Room"
        >
          {/* Rotating Vinyl Record Disk */}
          <div 
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center transition-transform duration-500 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
            style={{ 
              backgroundColor: '#050714',
              boxShadow: isPlaying ? `0 0 10px ${currentTrackColor}50` : undefined
            }}
          >
            {/* Center Vinyl Label with Heart */}
            <div 
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-bold shadow-inner"
              style={{ 
                backgroundColor: currentTrackColor,
                color: '#080B17' 
              }}
            >
              ♥
            </div>
          </div>
        </div>

        {/* Track Title & Artist Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span 
              className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-full transition-colors"
              style={{
                backgroundColor: `${currentTrackColor}25`,
                color: currentTrackColor
              }}
            >
              {activeMode === 'story' ? 'Story Map' : 'Shared Room'}
            </span>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#C8FF4F]/10 text-[#C8FF4F] font-mono hidden sm:inline-block border border-[#C8FF4F]/20">
              Ad-Free Stream
            </span>
          </div>

          <h2 className="text-white text-xs sm:text-sm font-bold truncate font-sans tracking-wide">
            {title}
          </h2>
          <p className="text-white/60 text-[10px] sm:text-xs truncate font-mono">
            {artist}
          </p>
        </div>

        {/* Equalizer animation bars */}
        <div className="hidden md:flex items-end gap-0.5 h-4 px-1" title="Equalizer">
          <span className={`w-0.5 bg-[#C8FF4F] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-bounce' : 'h-1'}`} />
          <span className={`w-0.5 bg-[#FF7A59] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-bounce [animation-delay:0.2s]' : 'h-1.5'}`} />
          <span className={`w-0.5 bg-[#FF5E92] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-bounce [animation-delay:0.4s]' : 'h-1'}`} />
          <span className={`w-0.5 bg-[#AAA0FF] rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-bounce [animation-delay:0.1s]' : 'h-1.5'}`} />
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Open Room Video Stream Button */}
          <button
            onClick={onOpenRoom}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white transition-all text-[11px] font-mono cursor-pointer"
            title="Open Video Stream in Shared Listening Room"
          >
            📺
          </button>

          {/* Direct YT Music Link */}
          {ytMusicUrl && (
            <a
              href={ytMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all text-[9px] font-mono font-bold uppercase tracking-wider items-center gap-1"
              title="Open track in YT Music"
            >
              Music ↗
            </a>
          )}

          {/* Previous Track */}
          <button 
            onClick={onPrev}
            className="p-1.5 text-white/70 hover:text-white transition-colors text-sm sm:text-base cursor-pointer hover:scale-110 active:scale-95"
            title={activeMode === 'story' ? "Previous unlocked story song" : "Previous room track"}
          >
            ⏮
          </button>

          {/* Center Play/Pause Circle Button */}
          <button 
            onClick={onTogglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#080B17] flex items-center justify-center transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer hover:bg-[#C8FF4F]"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#080B17]" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#080B17] ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button 
            onClick={onNext}
            className="p-1.5 text-white/70 hover:text-white transition-colors text-sm sm:text-base cursor-pointer hover:scale-110 active:scale-95"
            title={activeMode === 'story' ? "Next unlocked story song" : "Next room track"}
          >
            ⏭
          </button>

          {/* Mode Switcher Button / Room Redirect */}
          <button 
            onClick={() => {
              onToggleSection();
              if (activeMode === 'story' && onOpenRoom) {
                onOpenRoom();
              }
            }}
            className="px-2.5 py-1 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold"
            title="Open Shared Listening Room & video stream"
          >
            {activeMode === 'story' ? '◌ room' : '✦ map'}
          </button>
        </div>

      </div>

      {/* Progress Bar & Real-Time Timestamps */}
      <div className="flex items-center gap-2.5 text-[9px] sm:text-[10px] font-mono text-white/70 pt-0.5">
        <span className="w-8 text-right font-medium">{fmtTime(currentTimeSec)}</span>
        
        {/* Range Slider Track */}
        <div className="flex-1 relative h-1.5 rounded-full bg-white/10 overflow-hidden cursor-pointer group">
          <div 
            className="absolute top-0 left-0 bottom-0 rounded-full transition-all duration-150 bg-[#C8FF4F]"
            style={{ 
              width: `${progress}%`,
              boxShadow: `0 0 10px #C8FF4F`
            }}
          />
          <input 
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => onProgressChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>

        <span className="w-8 font-medium">{fmtTime(totalDurationSec)}</span>
      </div>

    </section>
  );
}
