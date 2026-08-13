import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AmbientParticles } from "./AmbientParticles";
import { ParallaxController } from "./ParallaxController";
import { WorldLighting } from "./WorldLighting";
import { useAudioAnalyser } from "../../hooks/useAudioAnalyser";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export function CinematicWorld() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying } = useAudioEngine();
  const { bass, mid, treble } = useAudioAnalyser(isPlaying);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay fallbacks handled gracefully
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#080b17] pointer-events-none select-none">
      <ParallaxController>
        <WorldLighting bass={bass} mid={mid} treble={treble} />
        
        {/* Full Viewport 20-Second Ambient Video Loop */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.05] contrast-[1.05]"
          poster="/assets/twilight-cassette-city.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/two-heartbeat-ambient-loop-20s.webm" type="video/webm" />
          <source src="assets/two-heartbeat-ambient-loop-20s.webm" type="video/webm" />
        </video>
        
        {/* Subtle Radial Lighting Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,122,89,.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,20,44,.1),rgba(16,20,44,.5))] pointer-events-none" />
        
        {/* Three.js Ambient Particle Canvas */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-70 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <AmbientParticles count={40} />
          </Canvas>
        </div>
      </ParallaxController>
      
      <div className="world-grain absolute inset-0 z-10 pointer-events-none opacity-[0.03]" />
    </div>
  );
}
