import type { StageTrack } from '../../types';

interface MapModalProps {
  isOpen: boolean;
  stages: StageTrack[];
  completedCount: number;
  onClose: () => void;
  onSelectStage: (id: string) => void;
  onResetStory: () => void;
}

export function MapModal({
  isOpen,
  stages,
  completedCount,
  onClose,
  onSelectStage,
  onResetStory
}: MapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
      <section className="heartbeat-panel w-full max-w-4xl p-6 sm:p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-muted">the relationship mixtape</p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-white">
              Pick your next <i className="font-serif italic font-normal text-coral">chapter.</i>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Sub-header meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-muted mb-6 pb-4 border-b border-white/10 gap-2">
          <span><b className="text-lime">{completedCount}</b> / {stages.length} tracks discovered</span>
          <span className="uppercase tracking-widest text-[10px]">choose soft, choose loud, choose honest</span>
        </div>

        {/* 7 Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => stage.isUnlocked && onSelectStage(stage.id)}
              disabled={!stage.isUnlocked}
              className={`
                text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[160px] relative overflow-hidden group
                ${stage.isCompleted
                  ? 'bg-surface-2/90 border-coral/40 shadow-[0_4px_20px_rgba(255,122,89,0.15)]'
                  : stage.isUnlocked
                    ? 'bg-surface/60 border-white/10 hover:bg-surface-2 hover:border-white/20'
                    : 'bg-bg/40 border-white/5 opacity-40 cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span>0{stage.level}</span>
                <span className={stage.isCompleted ? 'text-coral' : 'text-muted'}>
                  {stage.isCompleted ? '✦ DISCOVERED' : stage.isUnlocked ? 'OPEN' : 'LOCKED'}
                </span>
              </div>

              <div className="my-2">
                <div className="text-2xl mb-1 text-white/80">{stage.isUnlocked ? stage.symbol : '×'}</div>
                <h3 className="text-lg font-serif text-white tracking-wide">{stage.name}</h3>
                <p className="text-xs text-muted/80">{stage.tag}</p>
              </div>

              <div className="text-[9px] font-mono uppercase tracking-widest text-lime">
                {stage.isCompleted ? 'REPLAY' : stage.isUnlocked ? 'UP NEXT' : 'LOCKED'}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted pt-4 border-t border-white/10 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-coral">▰</span>
            <span>Every clear level gives you an original music preview.</span>
          </div>
          <button 
            onClick={onResetStory}
            className="text-xs uppercase tracking-widest text-muted hover:text-coral transition-colors underline"
          >
            reset story
          </button>
        </div>

      </section>
    </div>
  );
}
