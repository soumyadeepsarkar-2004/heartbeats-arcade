import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface YouTubePlayerRef {
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
}

interface YouTubeAudioPlayerProps {
  videoId?: string;
  playlistId?: string;
  isPlaying: boolean;
  onStateChange?: (isPlaying: boolean) => void;
  onProgressSync?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  currentTrackTitle: string;
  currentArtist: string;
  ytMusicUrl?: string;
  isRoomOpen: boolean;
}

export const YouTubeAudioPlayer = forwardRef<YouTubePlayerRef, YouTubeAudioPlayerProps>(({
  videoId = 'iAIBF2ngbWY',
  playlistId,
  isPlaying,
  onStateChange,
  onProgressSync,
  onEnded,
  currentTrackTitle,
  currentArtist: _currentArtist,
  ytMusicUrl: _ytMusicUrl,
  isRoomOpen
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const timerRef = useRef<number | null>(null);

  const lastLoadedIdRef = useRef<string | null>(null);

  // Expose player controls to parent components via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.playVideo();
        } catch {
          // ignore
        }
      }
    },
    pause: () => {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        try {
          playerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
    },
    seekTo: (seconds: number) => {
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        try {
          playerRef.current.seekTo(seconds, true);
        } catch {
          // ignore
        }
      }
    },
    setVolume: (volume: number) => {
      if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
        try {
          playerRef.current.setVolume(volume);
        } catch {
          // ignore
        }
      }
    }
  }), []);

  // 1. Load YouTube IFrame API Script dynamically
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevOnReady) prevOnReady();
      setIsApiReady(true);
    };

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // 2. Initialize YT.Player instance when API is ready
  useEffect(() => {
    if (!isApiReady || !containerRef.current || playerRef.current) return;

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          controls: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          fs: 0
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            if (isPlaying && playerRef.current?.playVideo) {
              playerRef.current.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
            if (event.data === 1) {
              onStateChange?.(true);
            } else if (event.data === 2) {
              onStateChange?.(false);
            } else if (event.data === 0) {
              onStateChange?.(false);
              onEnded?.();
            }
          }
        }
      });
    } catch (e) {
      console.warn('Failed to initialize YouTube Player', e);
    }
  }, [isApiReady, onStateChange, onEnded, isPlaying]);

  // 3. Load Video or Playlist ONLY when ID actually changes
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    const targetId = playlistId ? `pl-${playlistId}` : `vid-${videoId}`;
    if (lastLoadedIdRef.current === targetId) return;

    lastLoadedIdRef.current = targetId;

    try {
      if (playlistId) {
        playerRef.current.loadPlaylist({
          listType: 'playlist',
          list: playlistId,
          index: 0,
          startSeconds: 0
        });
      } else if (videoId) {
        playerRef.current.loadVideoById({
          videoId: videoId,
          startSeconds: 0
        });
      }

      if (isPlaying && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }
    } catch {
      // Fallback
    }
  }, [videoId, playlistId, isPlayerReady, isPlaying]);

  // 4. Pure Play / Pause state synchronization
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo?.();
      } else {
        playerRef.current.pauseVideo?.();
      }
    } catch {
      // ignore
    }
  }, [isPlaying, isPlayerReady]);

  // 5. Progress sync interval
  const syncProgress = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      try {
        const curr = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        if (dur > 0) {
          onProgressSync?.(curr, dur);
        }
      } catch {
        // ignore
      }
    }
  }, [onProgressSync]);

  useEffect(() => {
    if (isPlaying && isPlayerReady) {
      timerRef.current = window.setInterval(syncProgress, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPlayerReady, syncProgress]);

  return (
    <div 
      id="yt-player-container-wrapper"
      className={
        isRoomOpen
          ? "w-full aspect-video max-h-[220px] sm:max-h-[260px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
          : "fixed bottom-0 -right-[999px] w-1 h-1 opacity-0 pointer-events-none z-[-1000]"
      }
    >
      <div ref={containerRef} className="w-full h-full" />
      
      {isRoomOpen && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2 pointer-events-none">
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#171A38]/90 text-[#C8FF4F] font-bold border border-[#C8FF4F]/30 backdrop-blur-md">
            {isPlaying ? '● Live Stream' : '⏸ Paused'}
          </span>
          <span className="text-[9px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md truncate max-w-[150px]">
            {currentTrackTitle}
          </span>
        </div>
      )}
    </div>
  );
});

YouTubeAudioPlayer.displayName = 'YouTubeAudioPlayer';
