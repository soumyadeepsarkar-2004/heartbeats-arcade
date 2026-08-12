import { Lock, Play, Music } from "lucide-react";
import type { StageTrack } from "../../hooks/useAmbientState";

interface ChapterCardProps {
  chapter: StageTrack;
  onClick: (id: string) => void;
  onPlaySong: (chapter: StageTrack) => void;
  isPlayingThisSong?: boolean;
}

export function ChapterCard({ chapter, onClick, onPlaySong, isPlayingThisSong }: ChapterCardProps) {
  return (
    <div
      className={`
        w-full text-left relative overflow-hidden rounded-xl p-4 transition-all duration-300 border flex flex-col justify-between gap-3
        ${chapter.isActive 
          ? 'bg-surface-2/80 border-coral/40 shadow-[0_4px_20px_rgba(255,122,89,0.18)]' 
          : chapter.isUnlocked
            ? 'bg-surface/50 border-white/5 hover:bg-surface-2/60 hover:border-white/10'
            : 'bg-bg/40 border-transparent opacity-50 cursor-not-allowed'
        }
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-[10px] uppercase tracking-widest font-mono ${chapter.isActive ? 'text-coral' : 'text-muted'}`}>
            Level {chapter.level.toString().padStart(2, '0')} · {chapter.tag}
          </span>
          {chapter.isUnlocked ? (
            <span className="text-[10px] uppercase tracking-wider text-lime flex items-center gap-1">
              <Music size={12} /> {chapter.song}
            </span>
          ) : (
            <Lock size={14} className="text-muted/50" />
          )}
        </div>
        
        <h3 
          onClick={() => chapter.isUnlocked && onClick(chapter.id)}
          className={`font-serif text-lg tracking-wide cursor-pointer ${chapter.isUnlocked ? 'text-white hover:text-coral' : 'text-muted/70'} transition-colors`}
        >
          {chapter.title}
        </h3>
        
        <p className="text-xs text-muted/80">{chapter.subtitle}</p>
      </div>

      {chapter.isUnlocked && (
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-[11px] text-gray-300 font-medium">
            ♫ {chapter.song} <span className="text-muted text-[10px]">by {chapter.artist}</span>
          </span>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPlaySong(chapter);
            }}
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1 transition-colors ${
              isPlayingThisSong 
                ? 'bg-lime text-bg' 
                : 'bg-white/10 text-white hover:bg-coral hover:text-bg'
            }`}
          >
            <Play size={10} fill="currentColor" /> {isPlayingThisSong ? 'Playing' : 'Play Song'}
          </button>
        </div>
      )}
      
      {chapter.isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-coral rounded-l-xl" />
      )}
    </div>
  );
}
