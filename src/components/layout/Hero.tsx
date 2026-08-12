interface HeroProps {
  currentStageName: string;
  onOpenRoom: () => void;
  onOpenMap: () => void;
}

export function Hero({ currentStageName, onOpenRoom, onOpenMap }: HeroProps) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-32 text-center select-none">
      
      {/* Pink Tape Sticker Header */}
      <div className="mb-4 inline-block transform -rotate-3 hover:rotate-0 transition-transform">
        <span className="bg-[#FF5E92] text-white px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest shadow-[0_10px_25px_rgba(255,94,146,0.4)]">
          made for two · press play when ready
        </span>
      </div>

      {/* Main Title with Playfair Display */}
      <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl tracking-tight text-white leading-none mb-6">
        listen<br />
        <i className="font-serif italic font-normal text-[#FF7A59]">together.</i>
      </h1>

      {/* Hero Copy */}
      <p className="max-w-md text-sm sm:text-base text-white/80 font-sans leading-relaxed mb-8">
        Drop a playlist, press play, and keep the moment as a small music diary.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={onOpenRoom}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8FF4F] text-[#080B17] font-mono font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#080B17] hover:shadow-[0_0_30px_rgba(200,255,79,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="text-base">◌</span>
          <span>enter the room</span>
          <span className="text-base">↗</span>
        </button>

        <button 
          onClick={onOpenMap}
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors py-2 px-4 cursor-pointer"
        >
          open story map <span className="text-[#FF7A59] underline underline-offset-4 font-bold ml-1">{currentStageName.toLowerCase()} →</span>
        </button>
      </div>

    </section>
  );
}
