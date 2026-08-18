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
  youtubePlaylistId?: string;
  ytMusicUrl?: string;
  spotifyPlaylistId?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  youtubeTrackId: string;
  ytMusicUrl?: string;
}

export interface CuratedPlaylist {
  id: string;
  title: string;
  provider: string;
  tag: string;
  color: string;
  youtubePlaylistId?: string;
  youtubeTrackId?: string;
  embedUrl: string;
  ytMusicUrl?: string;
  tracks?: PlaylistTrack[];
}

export interface RoomEntry {
  id: string;
  title: string;
  artist?: string;
  addedBy: 'Person 1' | 'Person 2';
  url: string;
  mood: string;
  timestamp: string;
  provider: string;
  embedUrl: string;
  youtubeTrackId?: string;
  youtubePlaylistId?: string;
  ytMusicUrl?: string;
  spotifyUri?: string;
  thumbnailUrl?: string;
  color?: string;
}

export interface PlaybackContext {
  type: 'story' | 'room';
  currentId: string;
}

export type RoomMood = 'soft' | 'electric' | 'deep';

export interface RoomSyncMessage {
  type: 'SYNC_STATE' | 'SYNC_TRACK' | 'SYNC_PLAY_PAUSE' | 'SYNC_SEEK' | 'SYNC_ADD_ENTRY' | 'SYNC_MOOD' | 'HEARTBEAT';
  sender: 'Person 1' | 'Person 2';
  timestamp: number;
  payload: any;
}
