import { useState, type FormEvent } from 'react';
import { STARTER_PLAYLISTS } from '../../data/stages';
import type { RoomEntry, RoomMood, CuratedPlaylist } from '../../types';
import { resolveMusicLink } from '../../utils/linkResolver';

interface RoomModalProps {
  isOpen: boolean;
  entries: RoomEntry[];
  currentTrackTitle: string;
  currentArtist?: string;
  isPlaying: boolean;
  ytMusicUrl?: string;
  currentRole: 'Person 1' | 'Person 2';
  partnerActive: boolean;
  partnerNotification: string | null;
  videoPlayerNode?: React.ReactNode;
  onChangeRole: (role: 'Person 1' | 'Person 2') => void;
  onClose: () => void;
  onAddEntry: (entry: RoomEntry) => void;
  onSelectPlaylist: (playlist: CuratedPlaylist) => void;
  onSelectEntry: (entry: RoomEntry) => void;
}

export function RoomModal({
  isOpen,
  entries,
  currentTrackTitle,
  currentArtist,
  isPlaying,
  ytMusicUrl,
  currentRole,
  partnerActive: _partnerActive,
  partnerNotification,
  videoPlayerNode,
  onChangeRole,
  onClose,
  onAddEntry,
  onSelectPlaylist,
  onSelectEntry
}: RoomModalProps) {
  const [urlInput, setUrlInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<RoomMood>('soft');
  const [filter, setFilter] = useState<'all' | 'Person 1' | 'Person 2'>('all');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(STARTER_PLAYLISTS[0].id);
  const [isResolving, setIsResolving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || isResolving) return;

    setIsResolving(true);
    try {
      const newEntry = await resolveMusicLink(urlInput, currentRole, selectedMood);
      onAddEntry(newEntry);
      onSelectEntry(newEntry);
      setUrlInput('');
    } catch {
      // ignore
    } finally {
      setIsResolving(false);
    }
  };

  const activeCuratedPlaylist = STARTER_PLAYLISTS.find(p => p.id === activePlaylistId) || STARTER_PLAYLISTS[0];
  const filteredEntries = entries.filter(e => filter === 'all' || e.addedBy === filter);
  const activeEntry = entries.find(e => e.title === currentTrackTitle);
  const isSpotifyActive = activeEntry?.provider === 'Spotify' || ytMusicUrl?.includes('spotify.com');

  return (
    <div className={
      isOpen 
        ? "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-bg/80 backdrop-blur-md select-none transition-opacity duration-300 opacity-100 pointer-events-auto" 
        : "fixed bottom-0 -right-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1000]"
    }>
      <section className="heartbeat-panel w-full max-w-5xl p-5 sm:p-8 rounded-3xl relative max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl border border-white/15">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close Room Modal"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center text-xl sm:text-2xl transition-all duration-200 cursor-pointer z-20 border border-white/10 hover:scale-105 active:scale-95"
        >
          ✕
        </button>

        {/* Room Header & Real-Time Sync Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 pr-10 sm:pr-14">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">shared listening room</span>
              <span className="w-2 h-2 rounded-full bg-[#C8FF4F] animate-pulse" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-wide leading-tight">
              music for<br />
              <i className="font-serif italic font-normal text-coral">two.</i>
            </h2>
          </div>

          {/* User Role Switcher (P1 vs P2) */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">active listener persona</span>
            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => onChangeRole('Person 1')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  currentRole === 'Person 1' 
                    ? 'bg-[#FF7A59] text-white font-bold shadow-md' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                P1 (You)
              </button>
              <button
                onClick={() => onChangeRole('Person 2')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  currentRole === 'Person 2' 
                    ? 'bg-[#C8FF4F] text-[#080B17] font-bold shadow-md' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                P2 (Partner)
              </button>
            </div>
          </div>
        </div>

        {/* Partner Real-time Activity Notification Banner */}
        {partnerNotification && (
          <div className="mb-4 p-2.5 rounded-xl bg-[#171A38] border border-[#C8FF4F]/50 text-xs font-mono text-[#C8FF4F] flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>{partnerNotification}</span>
            </div>
            <span className="text-[10px] text-white/50">Live Sync</span>
          </div>
        )}

        <p className="text-xs text-muted max-w-xl mb-6">
          Choose from 3 curated playlists or paste any Spotify, YouTube, or YT Music link. Both listeners stay automatically synchronized!
        </p>

        {/* Room Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Left Column: Active Embedded Video Player Display & 3 Curated Playlists */}
          <div className="lg:col-span-7 bg-surface/50 border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-1">
              <span>now streaming in room</span>
              {ytMusicUrl && (
                <a 
                  href={ytMusicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-coral hover:underline text-[10px] uppercase tracking-wider font-bold"
                >
                  open stream ↗
                </a>
              )}
            </div>

            {/* Currently Playing Card with Embedded Video Screen or Spotify Widget */}
            <div className="w-full p-3 sm:p-4 bg-[#171A38] rounded-xl border border-white/10 flex flex-col gap-3 relative overflow-hidden shadow-lg">
              
              {/* Embedded Player Screen: YouTube Video vs Spotify Preview */}
              {isSpotifyActive ? (
                <div className="w-full aspect-video max-h-[220px] bg-[#121212] rounded-2xl overflow-hidden shadow-2xl border border-[#1DB954]/40 flex flex-col items-center justify-center p-4 text-center relative">
                  <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 border border-[#1DB954] flex items-center justify-center text-[#1DB954] text-xl mb-2 shadow-lg">
                    🎧
                  </div>
                  <span className="text-[9px] font-mono text-[#1DB954] uppercase tracking-widest font-bold mb-1">
                    Spotify Track Active
                  </span>
                  <h4 className="text-white text-base font-bold font-serif max-w-xs truncate">{currentTrackTitle}</h4>
                  <p className="text-xs text-white/60 font-mono mt-0.5 truncate">{currentArtist}</p>
                  {activeEntry?.embedUrl && (
                    <iframe 
                      src={activeEntry.embedUrl} 
                      width="100%" 
                      height="80" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy" 
                      className="rounded-xl mt-2"
                    />
                  )}
                </div>
              ) : (
                videoPlayerNode
              )}

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8FF4F] font-bold block mb-0.5">
                    {isPlaying ? '● Live Stream Synced' : '⏸ Paused'}
                  </span>
                  <h3 className="text-white text-sm sm:text-base font-bold font-serif max-w-md truncate">{currentTrackTitle}</h3>
                  {currentArtist && (
                    <p className="text-xs text-white/60 font-mono mt-0.5 truncate">{currentArtist}</p>
                  )}
                </div>

                <div className="w-9 h-9 rounded-full bg-[#FF7A59]/20 border border-[#FF7A59]/40 flex items-center justify-center text-[#FF7A59] text-base shrink-0 shadow-md">
                  {isPlaying ? (
                    <span className="animate-spin text-sm">💿</span>
                  ) : (
                    <span>🎵</span>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Curated Playlists Selector */}
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-2">
                3 curated room playlists
              </span>

              {/* Playlist Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {STARTER_PLAYLISTS.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      setActivePlaylistId(playlist.id);
                      onSelectPlaylist(playlist);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer group ${
                      activePlaylistId === playlist.id
                        ? 'bg-[#171A38] border-[#C8FF4F] shadow-lg'
                        : 'bg-surface-2/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span 
                      className="text-[8px] font-mono block uppercase tracking-wider"
                      style={{ color: playlist.color }}
                    >
                      {playlist.tag}
                    </span>
                    <strong className="text-white text-xs truncate block font-serif">{playlist.title}</strong>
                  </button>
                ))}
              </div>

              {/* Playlist Track Listing */}
              {activeCuratedPlaylist.tracks && activeCuratedPlaylist.tracks.length > 0 && (
                <div className="bg-[#171A38]/80 border border-white/10 rounded-xl p-2.5 max-h-36 overflow-y-auto custom-scrollbar space-y-1">
                  <span className="text-[9px] font-mono text-muted uppercase tracking-widest block mb-1.5 px-1">
                    Tracks in {activeCuratedPlaylist.title}:
                  </span>
                  {activeCuratedPlaylist.tracks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        const newEntry: RoomEntry = {
                          id: `pl-t-${t.id}`,
                          title: t.title,
                          artist: t.artist,
                          addedBy: currentRole,
                          url: t.ytMusicUrl || `https://music.youtube.com/watch?v=${t.youtubeTrackId}`,
                          mood: selectedMood,
                          timestamp: 'Just now',
                          provider: 'YouTube Music',
                          embedUrl: `https://www.youtube-nocookie.com/embed/${t.youtubeTrackId}?autoplay=1&enablejsapi=1`,
                          youtubeTrackId: t.youtubeTrackId,
                          ytMusicUrl: t.ytMusicUrl,
                          color: activeCuratedPlaylist.color
                        };
                        onAddEntry(newEntry);
                        onSelectEntry(newEntry);
                      }}
                      className="p-2 rounded-lg bg-surface-2/40 hover:bg-surface-2 border border-white/5 hover:border-[#C8FF4F]/30 flex items-center justify-between text-xs cursor-pointer transition-all"
                    >
                      <div className="truncate pr-2">
                        <span className="text-white font-medium block truncate font-sans">{t.title}</span>
                        <span className="text-white/50 text-[10px] truncate block">{t.artist}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C8FF4F] shrink-0">▶ Play</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Shared Music Diary & Universal Form */}
          <div className="lg:col-span-5 bg-surface/50 border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                <span className="uppercase tracking-widest text-[10px]">shared music diary</span>
                <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-lg border border-white/5">
                  <button onClick={() => setFilter('all')} className={`px-2 py-0.5 text-[9px] rounded cursor-pointer ${filter === 'all' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>all</button>
                  <button onClick={() => setFilter('Person 1')} className={`px-2 py-0.5 text-[9px] rounded cursor-pointer ${filter === 'Person 1' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>p1</button>
                  <button onClick={() => setFilter('Person 2')} className={`px-2 py-0.5 text-[9px] rounded cursor-pointer ${filter === 'Person 2' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>p2</button>
                </div>
              </div>

              {/* Diary Entries List with Empty Placeholder */}
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar mb-4 pr-1">
                {filteredEntries.length === 0 ? (
                  <div className="p-5 rounded-2xl bg-surface-2/30 border border-dashed border-white/10 text-center flex flex-col items-center justify-center gap-1.5 my-2">
                    <span className="text-xl">🎵</span>
                    <p className="text-xs text-white/90 font-medium font-sans">Shared Music Diary is Empty</p>
                    <p className="text-[10px] text-muted max-w-xs leading-relaxed font-mono">
                      Click any song from the 3 curated playlists or drop a Spotify / YouTube link below!
                    </p>
                  </div>
                ) : (
                  filteredEntries.map(entry => (
                    <div 
                      key={entry.id} 
                      onClick={() => onSelectEntry(entry)}
                      className="p-2.5 rounded-xl bg-surface-2/60 border border-white/5 hover:border-lime/30 flex items-center justify-between text-xs cursor-pointer transition-all group"
                    >
                      <div className="min-w-0 pr-2">
                        <strong className="text-white block font-serif truncate group-hover:text-[#C8FF4F] transition-colors">{entry.title}</strong>
                        <span className="text-muted text-[10px] block font-mono">
                          {entry.artist ? `${entry.artist} · ` : ''}Shared by {entry.addedBy}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                          entry.provider === 'Spotify' ? 'bg-[#1DB954]/20 text-[#1DB954]' : 'bg-[#FF0000]/20 text-[#FF7A59]'
                        }`}>
                          {entry.provider}
                        </span>
                        <span className="text-[9px] font-mono text-lime uppercase font-bold">{entry.mood}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Universal Add Link Form (Spotify, YouTube, YT Music) */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-white/5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                drop Spotify, YouTube, or YT Music link
              </label>

              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="text-[10px] font-mono">shared as:</span>
                <span className="text-white font-mono font-bold text-xs">{currentRole}</span>
              </div>

              <div className="flex gap-2">
                <input 
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="paste Spotify or YouTube link"
                  required
                  className="flex-1 bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-muted/40 focus:outline-none focus:border-lime"
                />
                <button 
                  type="submit" 
                  disabled={isResolving}
                  className="px-4 py-2 rounded-lg bg-lime text-bg text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResolving ? 'loading...' : 'play'}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Mood Selector Row */}
        <div className="bg-surface-2/40 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">pick the next feeling</span>
            <p className="text-xs text-gray-300">Save a tiny note about where the music is taking you.</p>
          </div>

          <div className="flex items-center gap-2">
            {(['soft', 'electric', 'deep'] as RoomMood[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setSelectedMood(m);
                  if (m === 'soft') {
                    setActivePlaylistId(STARTER_PLAYLISTS[0].id);
                    onSelectPlaylist(STARTER_PLAYLISTS[0]);
                  } else if (m === 'electric') {
                    setActivePlaylistId(STARTER_PLAYLISTS[1].id);
                    onSelectPlaylist(STARTER_PLAYLISTS[1]);
                  } else if (m === 'deep') {
                    setActivePlaylistId(STARTER_PLAYLISTS[2].id);
                    onSelectPlaylist(STARTER_PLAYLISTS[2]);
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                  selectedMood === m
                    ? 'bg-lime text-bg font-bold shadow-[0_0_12px_rgba(200,255,79,0.3)]'
                    : 'bg-surface border border-white/10 text-muted hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
