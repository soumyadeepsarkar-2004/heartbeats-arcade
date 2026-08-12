interface LevelProgressProps {
  currentLevel: number;
  totalLevels: number;
}

export function LevelProgress({ currentLevel, totalLevels }: LevelProgressProps) {
  const progress = (currentLevel / totalLevels) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-muted">
        <span>Level {currentLevel.toString().padStart(2, '0')}</span>
        <span>{totalLevels.toString().padStart(2, '0')}</span>
      </div>
      <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-coral transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
