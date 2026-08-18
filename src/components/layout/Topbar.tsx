import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TopbarProps {
  heartCount: number;
  partnerActive?: boolean;
  partnerNotification?: string | null;
  onOpenRoom: () => void;
}

export function Topbar({
  heartCount,
  partnerActive = false,
  partnerNotification,
  onOpenRoom
}: TopbarProps) {
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
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 pointer-events-none select-none">
      
      {/* Left: Clock & Heart Count Badge */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md text-xs font-mono tracking-wider text-muted shadow-lg">
        <span className="w-2 h-2 rounded-full bg-lime animate-pulse mr-0.5" />
        <Clock className="w-3.5 h-3.5 text-white/70 inline-block" />
        <span className="text-white/90">{timeStr}</span>
        <span className="text-white/20 px-0.5">/</span>
        <span className="text-white font-semibold">{heartCount}</span>
        <span className="text-coral">♥</span>

        {partnerActive && (
          <>
            <span className="text-white/20 hidden sm:inline px-0.5">/</span>
            <span className="text-[#C8FF4F] font-bold hidden sm:inline-flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF4F] animate-ping" />
              Synced
            </span>
          </>
        )}
      </div>

      {/* Middle Toast Notification for Partner Sync Activity */}
      {partnerNotification && (
        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171A38]/95 border border-[#C8FF4F]/50 backdrop-blur-xl text-xs font-mono text-white shadow-2xl animate-bounce">
          <span className="text-[#C8FF4F]">⚡</span>
          <span>{partnerNotification}</span>
        </div>
      )}

      {/* Right: Shared Listening Room Button */}
      <button 
        onClick={onOpenRoom}
        className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/25 hover:bg-surface-2 backdrop-blur-md text-xs uppercase tracking-widest font-mono text-white transition-all duration-300 group cursor-pointer shadow-lg"
      >
        <span className="text-coral group-hover:rotate-45 transition-transform duration-300">◌</span> room
      </button>

    </header>
  );
}
