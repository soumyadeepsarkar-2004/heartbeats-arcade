import { useEffect, useRef } from "react";

interface WorldLightingProps {
  bass?: number;   // 0.0 to 1.0
  mid?: number;    // 0.0 to 1.0
  treble?: number; // 0.0 to 1.0
}

export function WorldLighting({ bass = 0, mid = 0, treble = 0 }: WorldLightingProps) {
  // We apply CSS custom properties to the parent or specific layers based on audio analysis
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Smoothly interpolate for elegant visualizer
    const glowIntensity = 10 + (treble * 15);
    const brightness = 1 + (bass * 0.15);
    
    containerRef.current.style.setProperty('--radio-glow', `${glowIntensity}px`);
    containerRef.current.style.setProperty('--world-brightness', `${brightness}`);
  }, [bass, mid, treble]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-10 transition-all duration-75 ease-out"
      style={{
        backgroundColor: `rgba(255, 122, 89, ${bass * 0.05})`, // Very subtle coral flash on bass
        filter: 'brightness(var(--world-brightness, 1))'
      }}
    />
  );
}
