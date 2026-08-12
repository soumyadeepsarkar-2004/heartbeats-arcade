import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AmbientParticles } from "./AmbientParticles";
import { ParallaxController } from "./ParallaxController";
import { WorldLighting } from "./WorldLighting";
import { useAudioAnalyser } from "../../hooks/useAudioAnalyser";
import { useAudioEngine } from "../music/AudioEngine";

export function CinematicWorld() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying } = useAudioEngine();
  const { bass, mid, treble } = useAudioAnalyser(isPlaying);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay may be blocked until user interaction.
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#080b17]">
      <ParallaxController>
        <WorldLighting bass={bass} mid={mid} treble={treble} />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/two-heartbeat-ambient-loop-20s.webm"
          poster="/assets/twilight-cassette-city.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,111,150,.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,7,20,.05),rgba(4,7,20,.35))]" />
        
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-60">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <AmbientParticles count={50} />
          </Canvas>
        </div>
      </ParallaxController>
      
      <div className="world-grain absolute inset-0 z-10" />
      
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_180px_rgba(0,0,0,.55)]" />
    </div>
  );
}
