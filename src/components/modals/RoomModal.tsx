import { useState, type FormEvent } from 'react';
import { STARTER_PLAYLISTS } from '../../data/stages';
import type { RoomEntry, RoomMood } from '../../types';

interface RoomModalProps {
  isOpen: boolean;
  entries: RoomEntry[];
  embedUrl: string;
  onClose: () => void;
  onAddEntry: (entry: RoomEntry) => void;
  onSelectPlaylist: (playlist: typeof STARTER_PLAYLISTS[0]) => void;
}

export function RoomModal({
  isOpen,
  entries,
  embedUrl,
  onClose,
  onAddEntry,
  onSelectPlaylist
}: RoomModalProps) {
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [addedBy, setAddedBy] = useState<'Person 1' | 'Person 2'>('Person 1');
  const [selectedMood, setSelectedMood] = useState<RoomMood>('soft');
  const [filter, setFilter] = useState<'all' | 'Person 1' | 'Person 2'>('all');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newEntry: RoomEntry = {
      id: `r-${Date.now()}`,
      title: titleInput.trim() || 'Shared Playlist Track',
      addedBy,
      url: urlInput.trim(),
      mood: selectedMood,
      timestamp: 'Just now',
      provider: urlInput.includes('spotify') ? 'Spotify' : 'YouTube',
      embedUrl: urlInput.includes('embed') 
        ? urlInput.trim() 
        : `https://www.youtube-nocookie.com/embed/${urlInput.split('v=')[1] || ''}?autoplay=1&enablejsapi=1`,
    };

    onAddEntry(newEntry);
    setUrlInput('');
    setTitleInput('');
  };

  const filteredEntries = entries.filter(e => filter === 'all' || e.addedBy === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
      <section className="heartbeat-panel w-full max-w-5xl p-6 sm:p-8 rounded-3xl relative max-h-[92vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
        >
          ×
        </button>

        {/* Room Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted flex items-center gap-2">
              shared listening room <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-wide leading-tight">
              music for<br />
              <i className="font-serif italic font-normal text-coral">two.</i>
            </h2>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-surface-2 border border-white/10 text-right">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">tape id</span>
            <strong className="text-lime font-mono text-xs">m-08</strong>
          </div>
        </div>

        <p className="text-xs text-muted max-w-xl mb-6">
          Choose a playlist for the moment, add your Spotify or YouTube link, and share music with your partner.
        </p>

        {/* Room Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Left Column: Embed Player & Starter Picks */}
          <div className="lg:col-span-7 bg-surface/50 border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-1">
              <span>best match in the room</span>
              <button className="text-coral hover:underline text-[10px] uppercase tracking-wider">copy invite ↗</button>
            </div>

            {/* Embedded Stream Player */}
            <div className="w-full h-48 sm:h-56 bg-bg/80 rounded-xl overflow-hidden border border-white/5 relative">
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>

            {/* Starter Playlist Picks */}
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-2">starter playlist picks</span>
              <div className="grid grid-cols-3 gap-2">
                {STARTER_PLAYLISTS.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => onSelectPlaylist(playlist)}
                    className="p-2.5 rounded-xl bg-surface-2/60 border border-white/5 hover:border-lime/30 text-left transition-all"
                  >
                    <span className="text-[8px] font-mono text-coral block">{playlist.tag}</span>
                    <strong className="text-white text-xs truncate block font-serif">{playlist.title}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Shared Music Diary & Form */}
          <div className="lg:col-span-5 bg-surface/50 border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                <span className="uppercase tracking-widest text-[10px]">shared music diary</span>
                <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-lg border border-white/5">
                  <button onClick={() => setFilter('all')} className={`px-2 py-0.5 text-[9px] rounded ${filter === 'all' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>all</button>
                  <button onClick={() => setFilter('Person 1')} className={`px-2 py-0.5 text-[9px] rounded ${filter === 'Person 1' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>p1</button>
                  <button onClick={() => setFilter('Person 2')} className={`px-2 py-0.5 text-[9px] rounded ${filter === 'Person 2' ? 'bg-lime text-bg font-bold' : 'text-muted'}`}>p2</button>
                </div>
              </div>

              {/* Diary Entries List */}
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar mb-4 pr-1">
                {filteredEntries.length === 0 ? (
                  <p className="text-xs text-muted text-center py-4">No songs added yet.</p>
                ) : (
                  filteredEntries.map(entry => (
                    <div key={entry.id} className="p-2.5 rounded-xl bg-surface-2/60 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block font-serif">{entry.title}</strong>
                        <span className="text-muted text-[10px]">Shared by {entry.addedBy}</span>
                      </div>
                      <span className="text-[9px] font-mono text-lime uppercase">{entry.mood}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Song Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-white/5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                drop a Spotify or YouTube link
              </label>

              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="text-[10px] font-mono">shared by:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="addedBy" value="Person 1" checked={addedBy === 'Person 1'} onChange={() => setAddedBy('Person 1')} className="accent-lime" />
                  <span>P1 (You)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="addedBy" value="Person 2" checked={addedBy === 'Person 2'} onChange={() => setAddedBy('Person 2')} className="accent-lime" />
                  <span>P2 (Partner)</span>
                </label>
              </div>

              <div className="flex gap-2">
                <input 
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="paste Spotify or YouTube link"
                  required
                  className="flex-1 bg-surface-2 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-muted/40 focus:outline-none focus:border-lime"
                />
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-lime text-bg text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors">
                  save
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
                onClick={() => setSelectedMood(m)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
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
