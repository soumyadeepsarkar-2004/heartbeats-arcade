import { useEffect } from 'react';
import type { StageTrack } from '../../types';

interface GameModalProps {
  isOpen: boolean;
  stage: StageTrack;
  selectedChoice: number | null;
  onClose: () => void;
  onSelectChoice: (idx: number) => void;
  onComplete: () => void;
  onPlaySong: (stage: StageTrack) => void;
}

export function GameModal({
  isOpen,
  stage,
  selectedChoice,
  onClose,
  onSelectChoice,
  onComplete,
  onPlaySong
}: GameModalProps) {
  // Automatically trigger dedicated stage soundtrack playback when entering a stage or moving to next chapter
  useEffect(() => {
    if (isOpen && stage) {
      onPlaySong(stage);
    }
  }, [isOpen, stage, onPlaySong]);

  if (!isOpen) return null;

  const isActionable = selectedChoice !== null || stage.isCompleted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
      <section className="heartbeat-panel w-full max-w-2xl p-6 sm:p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto custom-scrollbar select-none">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
        >
          ×
        </button>

        {/* Quest Meta */}
        <div className="flex items-center gap-3 text-xs font-mono text-white/70 mb-4 uppercase tracking-widest">
          <span className="text-[#FF7A59] font-bold">0{stage.level}</span>
          <span>·</span>
          <span>relationship quest</span>
          <span>·</span>
          <span className="text-[#C8FF4F] font-bold">{stage.isCompleted ? 'replay' : 'unlocked'}</span>
        </div>

        {/* Quest Main */}
        <div className="space-y-6">
          
          {/* Header Copy */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">{stage.phase}</p>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-wide mb-2">{stage.name}</h2>
            <p className="text-sm text-gray-200 leading-relaxed">{stage.description}</p>
          </div>

          {/* Stage Soundtrack Card */}
          <div className="bg-[#171A38]/90 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8FF4F] font-bold block mb-0.5">● Playing Stage Soundtrack</span>
              <strong className="text-white text-base font-serif block">{stage.song}</strong>
              <small className="text-xs text-white/70">{stage.artist} · YouTube</small>
            </div>
            
            <button 
              onClick={() => onPlaySong(stage)}
              className="px-4 py-2 rounded-full bg-[#C8FF4F] text-[#080B17] text-xs font-mono uppercase tracking-widest font-bold hover:bg-white hover:text-[#080B17] transition-colors cursor-pointer"
            >
              ♫ Replay Song
            </button>
          </div>

          {/* Prompt Question */}
          <div className="bg-[#10142A]/80 border border-white/10 rounded-2xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF7A59] font-bold block mb-1">01</span>
            <p className="text-white text-base font-medium">{stage.prompt}</p>
          </div>

          {/* Choices A / B / C */}
          <div className="space-y-3">
            {stage.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => onSelectChoice(i)}
                className={`
                  w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 text-sm font-sans cursor-pointer
                  ${selectedChoice === i
                    ? 'bg-[#171A38] border-[#C8FF4F] text-white shadow-[0_0_15px_rgba(200,255,79,0.2)]'
                    : 'bg-[#10142A]/60 border-white/10 hover:bg-[#171A38] hover:border-white/20 text-gray-200'
                  }
                `}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                  selectedChoice === i ? 'bg-[#C8FF4F] text-[#080B17]' : 'bg-white/10 text-white'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{choice}</span>
              </button>
            ))}
          </div>

          {/* Lock in the vibe Button */}
          <button
            onClick={onComplete}
            disabled={!isActionable}
            className={`
              w-full py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300
              ${isActionable
                ? 'bg-[#C8FF4F] text-[#080B17] hover:bg-white hover:text-[#080B17] shadow-[0_0_20px_rgba(200,255,79,0.4)] cursor-pointer'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            <span>{stage.isCompleted ? 'play that back' : 'lock in the vibe'}</span>
            <span className="text-base">↗</span>
          </button>

          <p className="text-center text-[10px] font-mono uppercase tracking-widest text-white/50">
            There are no wrong answers. Just better stories.
          </p>

        </div>
      </section>
    </div>
  );
}
