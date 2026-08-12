export interface StageTrack {
  id: string;
  level: number;
  name: string;
  phase: string;
  tag: string;
  symbol: string;
  color: string;
  song: string;
  artist: string;
  duration: number;
  bpm: number;
  description: string;
  prompt: string;
  choices: string[];
  win: string;
  youtubeTrackId: string;
  youtubeUrl: string;
  spotifyPlaylistId?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface RoomEntry {
  id: string;
  title: string;
  addedBy: 'Person 1' | 'Person 2';
  url: string;
  mood: string;
  timestamp: string;
  provider: string;
  embedUrl: string;
  spotifyUri?: string;
}

export interface PlaybackContext {
  type: 'story' | 'room';
  currentId: string;
}

export type RoomMood = 'soft' | 'electric' | 'deep';
