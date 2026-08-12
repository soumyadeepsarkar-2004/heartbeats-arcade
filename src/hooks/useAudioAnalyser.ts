import { useEffect, useState, useRef } from 'react';

// For now, this fakes the Web Audio API analyser data since we can't extract it from YouTube.
// It generates a simulated rhythmic pulse based on an assumed 120BPM.
export function useAudioAnalyser(isPlaying: boolean) {
  const [analyserData, setAnalyserData] = useState({ bass: 0, mid: 0, treble: 0 });
  const requestRef = useRef<number>(0);
  
  useEffect(() => {
    if (!isPlaying) {
      setAnalyserData({ bass: 0, mid: 0, treble: 0 });
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      // Simulate a 120 BPM beat (2 beats per second = 500ms per beat)
      // Using a sine wave for smooth interpolation
      const beatCycle = (time % 500) / 500;
      
      // Sharp decay for bass to make it punchy
      const bass = Math.max(0, 1 - (beatCycle * 4)); 
      
      // Slower, smoother wave for mid
      const mid = (Math.sin(time * 0.002) + 1) / 2;
      
      // Nervous, faster flutter for treble (hi-hats)
      const treble = (Math.sin(time * 0.015) + 1) / 2 * 0.6;
      
      setAnalyserData({ bass, mid, treble });
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  return analyserData;
}
