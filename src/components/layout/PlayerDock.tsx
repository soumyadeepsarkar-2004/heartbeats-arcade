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
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSection: () => void;
  onProgressChange: (val: number) => void;
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
  onTogglePlay,
  onPrev,
  onNext,
  onToggleSection,
  onProgressChange
}: PlayerDockProps) {
  return (
    <section className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 heartbeat-panel w-[95%] max-w-[720px] p-2.5 sm:p-4 rounded-2xl flex flex-col gap-1.5 select-none transition-all">
      
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* Cover Art Cassette Badge */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#171A38] rounded-xl border border-white/10 shrink-0 relative flex flex-col items-center justify-center overflow-hidden">
          <span className="absolute top-1 left-1 text-[6px] font-mono text-white/60 leading-none">SIDE<br />A</span>
          <span className={`text-[#FF7A59] text-xs sm:text-sm ${isPlaying ? 'animate-pulse' : ''}`}>♥</span>
          <span className="absolute bottom-1 left-1 text-[6px] font-mono text-white/60 truncate max-w-[32px]">
            {activeMode === 'story' ? 'STORY' : 'ROOM'}
          </span>
        </div>

        {/* Track Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-full ${
              activeMode === 'story' ? 'bg-[#FF7A59]/20 text-[#FF7A59]' : 'bg-[#C8FF4F]/20 text-[#C8FF4F]'
            }`}>
              {activeMode === 'story' ? 'Story Map' : 'Shared Room'}
            </span>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono hidden sm:inline-block">
              {activeMode === 'story' ? 'YouTube' : 'Sync'}
            </span>
          </div>

          <h2 className="text-white text-xs sm:text-sm font-bold truncate font-sans">
            {title}
          </h2>
          <p className="text-white/60 text-[10px] sm:text-xs truncate">
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
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={onPrev}
            className="p-1.5 text-white/70 hover:text-white transition-colors text-sm sm:text-base cursor-pointer"
            title={activeMode === 'story' ? "Previous unlocked story song" : "Previous room track"}
          >
            ⏮
          </button>

          {/* Center Play/Pause Button with Crisp Dark Black Icons */}
          <button 
            onClick={onTogglePlay}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#080B17] flex items-center justify-center hover:bg-[#C8FF4F] transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
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

          <button 
            onClick={onNext}
            className="p-1.5 text-white/70 hover:text-white transition-colors text-sm sm:text-base cursor-pointer"
            title={activeMode === 'story' ? "Next unlocked story song" : "Next room track"}
          >
            ⏭
          </button>

          <button 
            onClick={onToggleSection}
            className={`px-2.5 py-1 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeMode === 'room'
                ? 'bg-[#C8FF4F]/20 border-[#C8FF4F] text-[#C8FF4F] font-bold'
                : 'bg-[#171A38] hover:bg-white/10 border-white/10 text-white font-bold'
            }`}
            title="Switch Player Section Loop (Story Map vs Shared Room)"
          >
            {activeMode === 'story' ? '◌ room' : '✦ map'}
          </button>
        </div>

      </div>

      {/* Track Progress Bar & Real-time Timestamps */}
      <div className="flex items-center gap-2.5 text-[8px] sm:text-[9px] font-mono text-white/70 pt-0.5">
        <span className="w-7 text-right">{fmtTime(currentTimeSec)}</span>
        <input 
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onProgressChange(Number(e.target.value))}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
        />
        <span className="w-7">{fmtTime(totalDurationSec)}</span>
      </div>

    </section>
  );
}
