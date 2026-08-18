import type { RoomEntry } from '../types';

export async function resolveMusicLink(
  rawUrl: string,
  addedBy: 'Person 1' | 'Person 2',
  mood: string
): Promise<RoomEntry> {
  const url = rawUrl.trim();
  const timestamp = 'Just now';
  const id = `r-${Date.now()}`;

  // 1. Check if Spotify URL
  if (url.includes('spotify.com')) {
    try {
      const oembedRes = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
      if (oembedRes.ok) {
        const data = await oembedRes.json();
        // data.title = "Song Title", data.author_name = "Artist Name", data.thumbnail_url
        const title = data.title || 'Spotify Track';
        const artist = data.author_name || 'Spotify';
        const thumbnailUrl = data.thumbnail_url;

        // Try to construct YouTube search embed fallback or Spotify embed
        let spotifyUri = '';
        if (url.includes('/track/')) {
          const trackId = url.split('/track/')[1]?.split('?')[0];
          spotifyUri = `spotify:track:${trackId}`;
        } else if (url.includes('/playlist/')) {
          const plId = url.split('/playlist/')[1]?.split('?')[0];
          spotifyUri = `spotify:playlist:${plId}`;
        }

        return {
          id,
          title,
          artist,
          addedBy,
          url,
          mood,
          timestamp,
          provider: 'Spotify',
          embedUrl: url.includes('/embed') ? url : url.replace('open.spotify.com/', 'open.spotify.com/embed/'),
          spotifyUri,
          thumbnailUrl,
          color: '#1DB954'
        };
      }
    } catch {
      // ignore fetch error and use fallback
    }

    return {
      id,
      title: 'Spotify Shared Music',
      addedBy,
      url,
      mood,
      timestamp,
      provider: 'Spotify',
      embedUrl: url.includes('/embed') ? url : url.replace('open.spotify.com/', 'open.spotify.com/embed/'),
      color: '#1DB954'
    };
  }

  // 2. Parse YouTube or YouTube Music URL
  let youtubeTrackId: string | undefined = undefined;
  let youtubePlaylistId: string | undefined = undefined;

  try {
    const parsedUrl = new URL(url);

    // Playlist ID param
    const listParam = parsedUrl.searchParams.get('list');
    if (listParam) {
      youtubePlaylistId = listParam;
    }

    // Video ID param
    const vParam = parsedUrl.searchParams.get('v');
    if (vParam) {
      youtubeTrackId = vParam;
    } else if (parsedUrl.hostname.includes('youtu.be')) {
      youtubeTrackId = parsedUrl.pathname.slice(1).split('?')[0];
    } else if (parsedUrl.pathname.includes('/shorts/')) {
      youtubeTrackId = parsedUrl.pathname.split('/shorts/')[1]?.split('?')[0];
    }
  } catch {
    if (url.length === 11) {
      youtubeTrackId = url;
    }
  }

  const isPlaylist = Boolean(youtubePlaylistId);
  const provider = url.includes('music.youtube') ? 'YouTube Music' : 'YouTube';

  const embedUrl = youtubePlaylistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${youtubePlaylistId}&autoplay=1&enablejsapi=1`
    : `https://www.youtube-nocookie.com/embed/${youtubeTrackId || 'vFh_63d91n8'}?autoplay=1&enablejsapi=1`;

  const ytMusicUrl = url.includes('music.youtube')
    ? url
    : youtubePlaylistId
      ? `https://music.youtube.com/playlist?list=${youtubePlaylistId}`
      : `https://music.youtube.com/watch?v=${youtubeTrackId || 'vFh_63d91n8'}`;

  return {
    id,
    title: isPlaylist ? 'Shared YT Playlist' : 'Shared YT Track',
    addedBy,
    url,
    mood,
    timestamp,
    provider,
    embedUrl,
    youtubeTrackId,
    youtubePlaylistId,
    ytMusicUrl,
    color: '#FF0000'
  };
}
