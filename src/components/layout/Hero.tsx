interface HeroProps {
  currentStageName: string;
  onOpenRoom: () => void;
  onOpenMap: () => void;
}

export function Hero({ currentStageName, onOpenRoom, onOpenMap }: HeroProps) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-32 text-center select-none">
      
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-widest uppercase text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-coral" />
        shared listening diary
      </div>

      {/* Main Title with Playfair Display */}
      <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl tracking-tight text-white leading-none mb-6">
        listen<br />
        <i className="font-serif italic font-normal text-coral">together.</i>
      </h1>

      {/* Hero Copy */}
      <p className="max-w-md text-sm sm:text-base text-muted/90 font-sans leading-relaxed mb-8">
        Drop a playlist, press play, and keep the moment as a small music diary.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={onOpenRoom}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-lime text-bg font-mono font-semibold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_25px_rgba(200,255,79,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>◌</span>
          <span>enter the room</span>
          <span className="text-base">↗</span>
        </button>

        <button 
          onClick={onOpenMap}
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted hover:text-white transition-colors py-2 px-4"
        >
          open story map <span className="text-coral underline underline-offset-4 ml-1">{currentStageName.toLowerCase()} →</span>
        </button>
      </div>

      {/* Pink Tape Sticker */}
      <div className="absolute right-[8%] sm:right-[15%] top-[25%] sm:top-[28%] tape-sticker p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center transform rotate-[-6deg] pointer-events-none hidden sm:flex">
        <span className="text-[9px] uppercase tracking-widest opacity-80 font-mono">made for</span>
        <strong className="text-xl sm:text-2xl font-bold tracking-tight my-0.5 font-serif">two</strong>
        <small className="text-[8px] uppercase tracking-wider opacity-90 leading-tight font-mono">
          press play<br />when ready
        </small>
      </div>
    </section>
  );
}
