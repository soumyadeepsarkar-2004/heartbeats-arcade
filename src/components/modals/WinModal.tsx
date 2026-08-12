import type { StageTrack } from '../../types';

interface WinModalProps {
  isOpen: boolean;
  stage: StageTrack;
  onNextLevel: () => void;
  onBackToMap: () => void;
  onPlaySong: (stage: StageTrack) => void;
}

export function WinModal({
  isOpen,
  stage,
  onNextLevel,
  onBackToMap,
  onPlaySong
}: WinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
      <section className="heartbeat-panel w-full max-w-md p-8 rounded-3xl text-center relative select-none">
        
        <p className="text-[10px] font-mono uppercase tracking-widest text-lime mb-2">level cleared</p>
        <div className="text-4xl text-coral mb-3 animate-bounce">♡</div>

        <h2 className="text-3xl font-serif text-white tracking-wide mb-2">
          That felt like a <i className="font-serif italic font-normal text-coral">good sign.</i>
        </h2>
        <p className="text-xs text-muted mb-6">{stage.win}</p>

        {/* Unlocked Track Preview Box */}
        <div className="bg-surface-2/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 text-left mb-6">
          <div className="w-10 h-10 rounded-xl bg-coral/20 border border-coral/30 flex items-center justify-center text-coral text-lg shrink-0">
            ♥
          </div>
          
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-mono uppercase tracking-widest text-lime block">new vibe unlocked</span>
            <strong className="text-white text-sm truncate block font-serif">{stage.song}</strong>
            <small className="text-muted text-[10px] truncate block">{stage.artist}</small>
          </div>

          <button 
            onClick={() => onPlaySong(stage)}
            className="w-8 h-8 rounded-full bg-lime text-bg flex items-center justify-center text-xs font-mono hover:bg-white transition-colors shrink-0"
            title="Play track preview"
          >
            ▶
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={onNextLevel}
            className="w-full py-3.5 rounded-full bg-lime text-bg font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors flex items-center justify-center gap-1"
          >
            <span>next chapter</span>
            <span className="text-sm">↗</span>
          </button>

          <button 
            onClick={onBackToMap}
            className="text-xs font-mono uppercase tracking-widest text-muted hover:text-white transition-colors py-2"
          >
            back to map →
          </button>
        </div>

      </section>
    </div>
  );
}
