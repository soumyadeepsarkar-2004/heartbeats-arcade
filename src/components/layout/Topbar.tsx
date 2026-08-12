import { useState, useEffect } from 'react';

interface TopbarProps {
  heartCount: number;
  onOpenRoom: () => void;
}

export function Topbar({ heartCount, onOpenRoom }: TopbarProps) {
  const [timeStr, setTimeStr] = useState('09:41 pm');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase());
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md text-xs font-mono tracking-wider text-muted">
        <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
        <span>{timeStr}</span>
        <span className="text-white/20">/</span>
        <span className="text-white font-semibold">{heartCount}</span>
        <span className="text-coral">♥</span>
      </div>

      <button 
        onClick={onOpenRoom}
        className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/25 hover:bg-surface-2 backdrop-blur-md text-xs uppercase tracking-widest font-mono text-white transition-all duration-300 group"
      >
        <span className="text-coral group-hover:rotate-45 transition-transform duration-300">◌</span> room
      </button>
    </header>
  );
}
