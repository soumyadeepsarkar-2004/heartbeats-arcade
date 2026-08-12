import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxControllerProps {
  children: ReactNode;
  intensity?: number;
}

export function ParallaxController({ children, intensity = 1 }: ParallaxControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      // Apply subtle translations. Background layers should move less, foreground more.
      // For this container, we just shift the whole thing slightly.
      const moveX = x * 8 * intensity;
      const moveY = y * 4 * intensity;
      
      // Use standard transform to prevent reflows
      containerRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform origin-center"
    >
      {children}
    </div>
  );
}
