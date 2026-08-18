import { useEffect, useState, useCallback, useRef } from 'react';
import type { RoomSyncMessage, RoomEntry } from '../types';
import { supabase, isSupabaseConfigured } from '../utils/supabase';

interface UseRoomSyncProps {
  currentRole: 'Person 1' | 'Person 2';
  onSyncTrack: (entry: RoomEntry) => void;
  onSyncPlayPause: (isPlaying: boolean) => void;
  onSyncSeek: (seconds: number) => void;
  onSyncAddEntry: (entry: RoomEntry) => void;
}

export function useRoomSync({
  currentRole,
  onSyncTrack,
  onSyncPlayPause,
  onSyncSeek,
  onSyncAddEntry
}: UseRoomSyncProps) {
  const [partnerActive, setPartnerActive] = useState(false);
  const [partnerNotification, setPartnerNotification] = useState<string | null>(null);
  
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const supabaseChannelRef = useRef<any>(null);
  const notificationTimeoutRef = useRef<number | null>(null);

  const showNotification = useCallback((text: string) => {
    setPartnerNotification(text);
    setPartnerActive(true);

    if (notificationTimeoutRef.current) {
      window.clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = window.setTimeout(() => {
      setPartnerNotification(null);
    }, 4000);
  }, []);

  // Process incoming sync message from either Supabase WebSockets or BroadcastChannel
  const handleIncomingSync = useCallback((msg: RoomSyncMessage) => {
    // Ignore self messages
    if (msg.sender === currentRole) return;

    setPartnerActive(true);

    switch (msg.type) {
      case 'SYNC_TRACK': {
        const entry = msg.payload as RoomEntry;
        showNotification(`${msg.sender} selected "${entry.title}"`);
        onSyncTrack(entry);
        break;
      }
      case 'SYNC_PLAY_PAUSE': {
        const isPlaying = msg.payload as boolean;
        showNotification(`${msg.sender} ${isPlaying ? 'resumed playback' : 'paused playback'}`);
        onSyncPlayPause(isPlaying);
        break;
      }
      case 'SYNC_SEEK': {
        const sec = msg.payload as number;
        showNotification(`${msg.sender} seeked playback position`);
        onSyncSeek(sec);
        break;
      }
      case 'SYNC_ADD_ENTRY': {
        const entry = msg.payload as RoomEntry;
        showNotification(`${msg.sender} added "${entry.title}" to Shared Diary`);
        onSyncAddEntry(entry);
        break;
      }
    }
  }, [currentRole, showNotification, onSyncTrack, onSyncPlayPause, onSyncSeek, onSyncAddEntry]);

  // Initialize Broadcast Transports (Supabase WebSockets + Local BroadcastChannel Fallback)
  useEffect(() => {
    // 1. Initialize Supabase Realtime Broadcast Channel if configured
    if (isSupabaseConfigured) {
      try {
        const channel = supabase.channel('heartbeats_shared_room_sync', {
          config: { broadcast: { self: false } }
        });

        channel
          .on('broadcast', { event: 'room_sync' }, ({ payload }) => {
            if (payload) handleIncomingSync(payload as RoomSyncMessage);
          })
          .subscribe();

        supabaseChannelRef.current = channel;
      } catch {
        // Fallback
      }
    }

    // 2. Local BroadcastChannel API Fallback
    try {
      const bc = new BroadcastChannel('heartbeats_shared_room_sync');
      bc.onmessage = (event) => {
        if (event.data) handleIncomingSync(event.data as RoomSyncMessage);
      };
      broadcastChannelRef.current = bc;
    } catch {
      // Fallback for older browsers
    }

    // 3. LocalStorage Event Fallback
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'heartbeats_room_sync_event' && e.newValue) {
        try {
          const msg: RoomSyncMessage = JSON.parse(e.newValue);
          handleIncomingSync(msg);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (broadcastChannelRef.current) broadcastChannelRef.current.close();
      if (supabaseChannelRef.current) supabase.removeChannel(supabaseChannelRef.current);
    };
  }, [handleIncomingSync]);

  // Generic message dispatcher across all active channels
  const dispatchSync = useCallback((type: RoomSyncMessage['type'], payload: any) => {
    const msg: RoomSyncMessage = {
      type,
      sender: currentRole,
      timestamp: Date.now(),
      payload
    };

    // Broadcast via Supabase WebSockets (Internet Multi-Device)
    if (supabaseChannelRef.current && isSupabaseConfigured) {
      try {
        supabaseChannelRef.current.send({
          type: 'broadcast',
          event: 'room_sync',
          payload: msg
        });
      } catch {
        // ignore
      }
    }

    // Broadcast via HTML5 BroadcastChannel (Same Device / Local)
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage(msg);
      } catch {
        // ignore
      }
    }

    // Broadcast via localStorage event
    try {
      localStorage.setItem('heartbeats_room_sync_event', JSON.stringify(msg));
    } catch {
      // ignore
    }
  }, [currentRole]);

  return {
    partnerActive,
    partnerNotification,
    syncTrackChange: (entry: RoomEntry) => dispatchSync('SYNC_TRACK', entry),
    syncPlayPause: (isPlaying: boolean) => dispatchSync('SYNC_PLAY_PAUSE', isPlaying),
    syncSeek: (seconds: number) => dispatchSync('SYNC_SEEK', seconds),
    syncAddEntry: (entry: RoomEntry) => dispatchSync('SYNC_ADD_ENTRY', entry)
  };
}
