const stages = [
  {
    id: 'talking',
    name: 'Talking Stage',
    phase: 'level one · soft launch',
    tag: 'the first reply',
    symbol: '…',
    color: '#ff8e78',
    song: 'Pehle Bhi Main',
    artist: 'Vishal Mishra',
    duration: 262,
    bpm: 92,
    description: 'A small spark, a very big screen, and the first message waiting to be sent.',
    prompt: 'Pick the energy for your opening line.',
    choices: ['A joke with zero pressure', 'A song link after midnight', 'A very brave "hey :)"'],
    win: 'You pressed send. The universe did a tiny little cartwheel.',
    youtubeTrackId: '6RxJCCHVY_U',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/6RxJCCHVY_U?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DX5q67ZpWyRrZ'
  },
  {
    id: 'closer',
    name: 'Getting Closer',
    phase: 'level two · open tabs',
    tag: 'the easy laugh',
    symbol: '↗',
    color: '#ffc25b',
    song: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    duration: 158,
    bpm: 102,
    description: 'The chat gets longer. The jokes get specific. Your playlist starts having witnesses.',
    prompt: 'Choose your accidental intimacy moment.',
    choices: ['The 2 a.m. "still awake?"', 'Sharing a niche childhood photo', 'A walk that takes the long way home'],
    win: 'Somehow, the conversation grew a porch light and stayed on.',
    youtubeTrackId: 'ApXoWvfEYVU',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/ApXoWvfEYVU?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DX4WYAVz2EC21'
  },
  {
    id: 'crush',
    name: 'Crush',
    phase: 'level three · heart eyes',
    tag: 'butterfly FM',
    symbol: '♥',
    color: '#ff5e96',
    song: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    duration: 261,
    bpm: 116,
    description: 'You have a favorite photo of them and it is absolutely not a big deal. Okay, maybe a little.',
    prompt: 'Pick the tell that gives you away.',
    choices: ['Their name makes you sit up', 'You save a meme just for them', 'Every lyric gets suspiciously specific'],
    win: 'You’re glowing. Your friends noticed three songs ago.',
    youtubeTrackId: 'Umqb9KENgmk',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/Umqb9KENgmk?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DXa6iPZDThhLh'
  },
  {
    id: 'falling',
    name: 'Falling in Love',
    phase: 'level four · free fall',
    tag: 'the big maybe',
    symbol: '♡',
    color: '#a895ff',
    song: 'Perfect',
    artist: 'Ed Sheeran',
    duration: 263,
    bpm: 84,
    description: 'There is no cool way to say it: you are falling. Luckily, the landing looks soft.',
    prompt: 'Choose the proof that it is real.',
    choices: ['They know your comfort order', 'Silence feels like a good room', 'Their good news feels like yours'],
    win: 'The ground moved a little. You did not mind.',
    youtubeTrackId: '2Vv-BfVoq4g',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/2Vv-BfVoq4g?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DWZ059d0vLwW5'
  },
  {
    id: 'inlove',
    name: 'In Love',
    phase: 'level five · side b',
    tag: 'sunday repeat',
    symbol: '∞',
    color: '#70d4bd',
    song: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal',
    duration: 237,
    bpm: 100,
    description: 'The everyday stuff starts sounding like a favorite chorus.',
    prompt: 'Choose your ordinary magic.',
    choices: ['Dancing while dinner burns', 'The grocery list handwriting', 'A nap that becomes a whole plan'],
    win: 'Turns out devotion wears socks and steals the blanket.',
    youtubeTrackId: 'gJXDByFMI0g',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/gJXDByFMI0g?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DWWQRwui0ExPn'
  },
  {
    id: 'deepcut',
    name: 'Deep Cut',
    phase: 'level six · low lights',
    tag: 'the honest part',
    symbol: '≈',
    color: '#79b4ff',
    song: 'Channa Mereya',
    artist: 'Arijit Singh',
    duration: 289,
    bpm: 76,
    description: 'Not every song is a bop. The brave ones make room for the messy verses too.',
    prompt: 'Choose the kindest way through a hard day.',
    choices: ['Ask, then really listen', 'Take a breather without leaving', 'Repair it with words and snacks'],
    win: 'You made room for the whole song — even the quiet bridge.',
    youtubeTrackId: '284Ov7yGfz0',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/284Ov7yGfz0?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DX6V1fKi28wOI'
  },
  {
    id: 'forever',
    name: 'Golden Era',
    phase: 'level seven · final track',
    tag: 'keep playing',
    symbol: '✦',
    color: '#d7ff72',
    song: 'Kal Ho Naa Ho',
    artist: 'Sonu Nigam',
    duration: 332,
    bpm: 96,
    description: 'A future made from little rituals, recurring jokes, and choosing each other out loud.',
    prompt: 'Pick the promise worth keeping.',
    choices: ['Keep being curious', 'Make room for both dreams', 'Never stop making the playlist'],
    win: 'Final track unlocked. Good news: there is always another side.',
    youtubeTrackId: 'g0eO74UmRBs',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/g0eO74UmRBs?autoplay=1&enablejsapi=1',
    spotifyPlaylistId: '37i9dQZF1DXbT5kSmcDj1v'
  }
];

const storageKey = 'heartbeats-arcade-progress-v1';
const roomStorageKey = 'heartbeats-arcade-room-v1';

// Global Spotify iFrame API Controller State
let spotifyEmbedController = null;
let isSpotifyEmbedPlaying = false;
let activeAudioEngine = 'synth'; // 'synth' | 'spotify' | 'youtube' | 'iframe'

// Initialize Spotify Embed Controller API when script loads
window.onSpotifyIframeApiReady = function (IFrameAPI) {
  console.log('[Spotify iFrame API] Script ready');
  window.SpotifyIFrameAPI = IFrameAPI;
  initSpotifyEmbedController();
};

function initSpotifyEmbedController() {
  const iframeElement = document.getElementById('playlistEmbed');
  if (!iframeElement || !window.SpotifyIFrameAPI || spotifyEmbedController) return;

  const options = {
    width: '100%',
    height: '100%',
    uri: 'spotify:playlist:37i9dQZF1DX5q67ZpWyRrZ'
  };

  window.SpotifyIFrameAPI.createController(iframeElement, options, (EmbedController) => {
    spotifyEmbedController = EmbedController;
    console.log('[Spotify Embed Controller] Initialized successfully');

    EmbedController.addListener('ready', () => {
      console.log('[Spotify Embed] Controller Ready Event');
    });

    EmbedController.addListener('playback_update', (e) => {
      if (!e || !e.data) return;
      isSpotifyEmbedPlaying = !e.data.isPaused;
      
      if (activeAudioEngine === 'spotify') {
        const dock = $('.player-dock');
        const playButton = $('.play-button');
        
        if (isSpotifyEmbedPlaying) {
          dock?.classList.add('is-playing');
          playButton?.setAttribute('aria-pressed', 'true');
        } else {
          dock?.classList.remove('is-playing');
          playButton?.setAttribute('aria-pressed', 'false');
        }

        if (e.data.duration > 0) {
          const progressPct = (e.data.position / e.data.duration) * 100;
          state.progress = progressPct;
          updateProgressUI(e.data.position / 1000, e.data.duration / 1000);
        }
      }
    });
  });
}

function loadUriIntoSpotifyEmbed(uri, trackTitle = '', trackArtist = '', stageColor = '#ff8e78') {
  activeAudioEngine = 'spotify';
  
  if (state.playing) {
    state.playing = false;
    clearInterval(beatTimer);
    cancelAnimationFrame(progressTimer);
  }

  const badge = $('#sourceBadge');
  if (badge) badge.textContent = 'Spotify iFrame';

  const nowText = $('#nowPlaying');
  if (nowText) nowText.textContent = 'SPOTIFY EMBED / ROOM';

  const dock = $('.player-dock');
  dock?.classList.add('is-playing');
  $('.play-button')?.setAttribute('aria-pressed', 'true');

  if (trackTitle) $('#playerTitle').textContent = trackTitle;
  if (trackArtist) $('#playerArtist').textContent = trackArtist;
  if (stageColor) $('#coverArt')?.style.setProperty('--stage', stageColor);

  if (spotifyEmbedController) {
    spotifyEmbedController.loadUri(uri);
    spotifyEmbedController.play();
  } else {
    const embed = $('#playlistEmbed');
    if (embed) {
      const parts = uri.split(':');
      if (parts.length === 3) {
        embed.src = `https://open.spotify.com/embed/${parts[1]}/${parts[2]}?utm_source=generator&theme=0&autoplay=1`;
      }
    }
  }
}

function toggleSpotifyEmbedPlayback() {
  if (spotifyEmbedController) {
    spotifyEmbedController.togglePlay();
  } else {
    postMessageToEmbed({ type: 'esExpose', value: 'playPause' });
  }
}

function postMessageToEmbed(message) {
  const embed = $('#playlistEmbed');
  if (embed && embed.contentWindow) {
    embed.contentWindow.postMessage(JSON.stringify(message), '*');
  }
}

function toggleYouTubeEmbedPlayback(play) {
  const embed = $('#playlistEmbed');
  if (embed && embed.contentWindow) {
    const action = play ? 'playVideo' : 'pauseVideo';
    embed.contentWindow.postMessage(JSON.stringify({ event: 'command', func: action, args: [] }), '*');
  }
}

function loadYouTubeUrlAndPlay(url) {
  const embed = $('#playlistEmbed');
  if (!embed) return;
  embed.onload = () => {
    setTimeout(() => {
      if (state.playing && activeAudioEngine === 'youtube') {
        toggleYouTubeEmbedPlayback(true);
      }
    }, 500);
  };
  embed.src = url;
  togglePlay(true);
}

function playActiveMedia() {
  if (activeAudioEngine === 'spotify') {
    if (spotifyEmbedController) {
      spotifyEmbedController.play();
    } else {
      postMessageToEmbed({ type: 'esExpose', value: 'play' });
    }
  } else if (activeAudioEngine === 'youtube') {
    toggleYouTubeEmbedPlayback(true);
  } else if (activeAudioEngine === 'synth') {
    if (!state.playing) togglePlay();
  }
}

function pauseActiveMedia() {
  if (activeAudioEngine === 'spotify') {
    if (spotifyEmbedController) {
      spotifyEmbedController.pause();
    } else {
      postMessageToEmbed({ type: 'esExpose', value: 'pause' });
    }
  } else if (activeAudioEngine === 'youtube') {
    toggleYouTubeEmbedPlayback(false);
  } else if (activeAudioEngine === 'synth') {
    if (state.playing) togglePlay();
  }
}

const starterPlaylists = [
  { id: 'starter-90s', title: '90s Love Hits', provider: 'Spotify', tag: 'the big feelings', color: '#ff9a82', spotifyUri: 'spotify:playlist:37i9dQZF1DXa6iPZDThhLh', sourceUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXa6iPZDThhLh', embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXa6iPZDThhLh?utm_source=generator&theme=0' },
  { id: 'starter-indie', title: 'Indie India', provider: 'Spotify', tag: 'the soft launch', color: '#d7ff72', spotifyUri: 'spotify:playlist:37i9dQZF1DX5q67ZpWyRrZ', sourceUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX5q67ZpWyRrZ', embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5q67ZpWyRrZ?utm_source=generator&theme=0' },
  { id: 'starter-lofi', title: 'lofi beats', provider: 'Spotify', tag: 'after the call', color: '#a99cff', spotifyUri: 'spotify:playlist:37i9dQZF1DWWQRwui0ExPn', sourceUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn', embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0' }
];

const moodMeta = { soft: { symbol: '♡', color: '#ff9a82' }, electric: { symbol: '✦', color: '#d7ff72' }, deep: { symbol: '≈', color: '#a99cff' } };

let state = { completed: [], current: 0, selected: null, playing: false, muted: false, progress: 18 };
let roomState = { entries: [], selected: '', mood: null, roomCode: 'm-08', selectionMode: 'auto', filterPerson: 'all' };
let playbackContext = { type: 'story', currentId: stages[0].id };
let activeStage = 0;
let audioContext;
let beatTimer;
let progressTimer;
let lastBeat = 0;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const fmtTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;
const stageAt = (index) => stages[Math.max(0, Math.min(index, stages.length - 1))];
const makeRoomCode = () => `m-${String(Math.floor(10 + Math.random() * 90))}`;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Array.isArray(saved.completed)) state = { ...state, ...saved, current: Math.min(saved.current || 0, stages.length - 1) };
  } catch { localStorage.removeItem(storageKey); }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({ completed: state.completed, current: state.current, muted: state.muted, progress: state.progress }));
}

function decodeRoom(payload) {
  try { return JSON.parse(decodeURIComponent(escape(atob(payload)))); } catch { return null; }
}

function encodeRoom(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function loadRoom() {
  const sharedPayload = new URLSearchParams(location.hash.replace(/^#/, '')).get('room');
  const sharedRoom = sharedPayload ? decodeRoom(sharedPayload) : null;
  try {
    const saved = JSON.parse(localStorage.getItem(roomStorageKey));
    if (saved && Array.isArray(saved.entries)) roomState = { ...roomState, ...saved };
  } catch { localStorage.removeItem(roomStorageKey); }
  if (sharedRoom && Array.isArray(sharedRoom.entries)) roomState = { ...roomState, ...sharedRoom, roomCode: sharedRoom.roomCode || makeRoomCode() };
  if (!roomState.roomCode) roomState.roomCode = makeRoomCode();
  if (roomState.selectionMode === 'manual' && roomState.selected) {
    playbackContext = { type: 'room', currentId: roomState.selected };
  } else {
    playbackContext = { type: 'story', currentId: stageAt(activeStage).id };
  }
}

function saveRoom(updateLink = false) {
  localStorage.setItem(roomStorageKey, JSON.stringify(roomState));
  if (updateLink) {
    const share = encodeRoom({ entries: roomState.entries, selected: roomState.selected, mood: roomState.mood, roomCode: roomState.roomCode, selectionMode: roomState.selectionMode });
    history.replaceState(null, '', `${location.pathname}#room=${share}`);
  }
}

function roomLibrary() {
  return [...starterPlaylists, ...roomState.entries];
}

function recommendedRoomPlaylistId(stageIndex = activeStage) {
  if (stageIndex <= 1) return 'starter-indie';
  if (stageIndex <= 3) return 'starter-90s';
  return 'starter-lofi';
}

function playlistForStage(stageId) {
  const stage = stages.find((s) => s.id === stageId) || stages[0];
  const playlistId = {
    talking: 'starter-indie',
    closer: 'starter-indie',
    crush: 'starter-90s',
    falling: 'starter-90s',
    inlove: 'starter-lofi',
    deepcut: 'starter-lofi',
    forever: 'starter-90s'
  }[stageId] || 'starter-indie';

  const basePlaylist = starterPlaylists.find((playlist) => playlist.id === playlistId) || starterPlaylists[0];
  return {
    ...basePlaylist,
    spotifyUri: stage.spotifyPlaylistId ? `spotify:playlist:${stage.spotifyPlaylistId}` : basePlaylist.spotifyUri,
    trackUri: stage.spotifyTrackId ? `spotify:track:${stage.spotifyTrackId}` : null
  };
}

function resolvePlaylist(id) {
  return roomLibrary().find((playlist) => playlist.id === id) || starterPlaylists[0];
}

function buildStageSource(stage) {
  return {
    kind: 'stage',
    stageId: stage.id,
    title: stage.song,
    artist: stage.artist,
    duration: stage.duration,
    bpm: stage.bpm,
    color: stage.color,
    embedUrl: stage.youtubeUrl || null,
    provider: 'YouTube',
    sourceLabel: `YouTube · ${stage.phase}`,
  };
}

function buildPlaylistSource(playlist) {
  const currentStage = stageAt(activeStage);
  return {
    kind: 'playlist',
    playlistId: playlist.id,
    title: playlist.title,
    artist: `${playlist.provider} · ${playlist.addedBy ? 'by ' + playlist.addedBy : playlist.tag || 'shared playlist'}`,
    duration: currentStage.duration,
    bpm: currentStage.bpm,
    color: playlist.color || currentStage.color,
    embedUrl: playlist.embedUrl,
    spotifyUri: playlist.spotifyUri || null,
    provider: playlist.provider,
    sourceLabel: `${playlist.provider} · shared room`,
  };
}

function currentTempoSource() {
  if (playbackContext.type === 'room') {
    return buildPlaylistSource(resolvePlaylist(playbackContext.currentId));
  }
  const stage = stages.find(s => s.id === playbackContext.currentId) || stageAt(activeStage);
  return buildStageSource(stage);
}

function renderPlaybackSource() {
  const source = currentTempoSource();
  $('#playerTitle').textContent = source.title;
  $('#playerArtist').textContent = `${source.artist} · ${fmtTime(source.duration)}`;
  $('.cover-name').textContent = source.title.toLowerCase();
  
  const nowText = $('#nowPlaying');
  if (nowText) nowText.textContent = playbackContext.type === 'story' ? `STORY · ${stageAt(activeStage).phase}` : 'SHARED ROOM PLAYLIST';
  
  const badge = $('#sourceBadge');
  if (badge) badge.textContent = source.provider || (activeAudioEngine === 'youtube' ? 'YouTube' : 'Music Embed');
  
  $('#coverArt')?.style.setProperty('--stage', source.color);
  updateProgressUI();
}

function currentRoomPlaylist() {
  return resolvePlaylist(roomState.selected || recommendedRoomPlaylistId(activeStage));
}

function renderRoom() {
  const active = currentRoomPlaylist();
  const stage = stageAt(activeStage);
  roomState.selected = active.id;
  $('#roomCode').textContent = roomState.roomCode;
  $('#roomStage').textContent = `${stage.phase} · best match for ${stage.name}`;
  $('#roomStage').style.color = stage.color;
  
  if (active.spotifyUri && spotifyEmbedController) {
    spotifyEmbedController.loadUri(active.spotifyUri);
  } else if ($('#playlistEmbed').src !== active.embedUrl) {
    $('#playlistEmbed').src = active.embedUrl;
  }

  $('#roomPlaylistName').textContent = active.title;
  $('#roomPlaylistMeta').textContent = `${active.provider} · ${active.addedBy ? 'Shared by ' + active.addedBy : active.tag || 'your diary'}`;
  $('#starterRow').innerHTML = starterPlaylists.map((playlist) => `<button class="starter-pick ${playlist.id === active.id ? 'is-active' : ''}" type="button" data-room-pick="${playlist.id}" style="--pick-color:${playlist.color}"><span>${playlist.tag}</span><strong>${playlist.title}</strong></button>`).join('');
  
  const filter = roomState.filterPerson || 'all';
  const filteredEntries = roomState.entries.filter((entry) => {
    if (filter === 'all') return true;
    return entry.addedBy === filter;
  });

  $('#diaryCount').textContent = `${roomState.entries.length} saved`;
  $('#diaryList').innerHTML = filteredEntries.length
    ? filteredEntries.map((entry) => `<div class="diary-entry-wrapper">
        <button type="button" class="diary-entry ${entry.id === active.id ? 'is-active' : ''}" data-room-pick="${entry.id}" style="--entry-color:${moodMeta[entry.mood]?.color || '#ff9a82'}">
          <span class="entry-mark">${moodMeta[entry.mood]?.symbol || '♡'}</span>
          <span class="entry-info">
            <strong>${escapeHTML(entry.title)}</strong>
            <span>${entry.provider} · ${entry.addedBy ? 'by ' + escapeHTML(entry.addedBy) : 'your pick'}</span>
          </span>
          <span class="entry-badge">${entry.addedBy ? (entry.addedBy === 'Person 1' ? 'P1' : 'P2') : 'Room'}</span>
        </button>
        <button type="button" class="delete-entry-btn" data-delete-entry="${entry.id}" title="Remove song">×</button>
      </div>`).join('')
    : `<div class="diary-empty">${filter === 'all' ? 'nothing here yet.<br />drop any song or playlist link.' : 'no songs added by ' + filter + ' yet.'}</div>`;

  $$('#diaryFilters button').forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });

  $$('#moodOptions button').forEach((button) => button.classList.toggle('is-selected', button.dataset.mood === roomState.mood));
  $('#moodStatus').textContent = roomState.mood ? `${roomState.mood} / saved` : 'still deciding';
}

function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character])); }

function applyRoomSelection(playlist, mode = 'manual') {
  if (!playlist) return;
  roomState.selected = playlist.id;
  roomState.selectionMode = mode;
  playbackContext = { type: 'room', currentId: playlist.id };
  
  if (playlist.spotifyUri && spotifyEmbedController) {
    activeAudioEngine = 'spotify';
    spotifyEmbedController.loadUri(playlist.spotifyUri);
    spotifyEmbedController.play();
  } else if (playlist.embedUrl) {
    activeAudioEngine = playlist.provider.toLowerCase().includes('youtube') ? 'youtube' : 'iframe';
    const embed = $('#playlistEmbed');
    if (embed) embed.src = playlist.embedUrl;
  }
  
  renderPlaybackSource();
  renderRoom();
  saveRoom(true);
}

function syncRoomFromStage(stageIndex = activeStage) {
  if (roomState.selectionMode === 'manual') return;
  const playlist = resolvePlaylist(recommendedRoomPlaylistId(stageIndex));
  roomState.selected = playlist.id;
  roomState.selectionMode = 'auto';
  saveRoom(false);
  renderRoom();
}

function selectRoomPlaylist(id) {
  const playlist = resolvePlaylist(id);
  if (!playlist) return;
  applyRoomSelection(playlist, 'manual');
  showToast(`Loaded "${playlist.title}" into the room.`);
}

function deleteDiaryEntry(id) {
  const index = roomState.entries.findIndex((entry) => entry.id === id);
  if (index === -1) return;
  const deleted = roomState.entries.splice(index, 1)[0];
  if (roomState.selected === id) {
    const fallback = resolvePlaylist(recommendedRoomPlaylistId(activeStage));
    roomState.selected = fallback.id;
    applyRoomSelection(fallback, 'auto');
  }
  renderRoom();
  saveRoom(true);
  showToast(`Removed "${deleted.title}" from room diary.`);
}

/**
 * Universal Multi-Platform Music URL Parser
 * Supports Spotify, YouTube, YouTube Music, Apple Music, SoundCloud, Bandcamp, Vimeo, raw iframe tags, and any web music URL!
 */
function parsePlaylistUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const str = rawUrl.trim();

  // If user pasted raw <iframe src="..."> HTML code
  if (str.includes('<iframe')) {
    const match = str.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return {
        provider: 'Custom Embed',
        sourceUrl: match[1],
        embedUrl: match[1]
      };
    }
  }

  try {
    const url = new URL(str);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    // 1. Spotify
    if (host === 'open.spotify.com' || host === 'spotify.com') {
      const match = url.pathname.match(/\/(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/);
      if (match) {
        const type = match[1];
        const id = match[2];
        return {
          provider: 'Spotify',
          spotifyUri: `spotify:${type}:${id}`,
          sourceUrl: `https://open.spotify.com/${type}/${id}`,
          embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`
        };
      }
    }

    // 2. YouTube & YouTube Music
    if (host === 'youtube.com' || host.endsWith('.youtube.com') || host === 'youtu.be') {
      const isMusic = host.includes('music');
      const list = url.searchParams.get('list');
      const video = url.searchParams.get('v') || (host === 'youtu.be' ? url.pathname.replace('/', '') : null);
      if (list) {
        const embedHost = isMusic ? 'https://music.youtube.com' : 'https://www.youtube-nocookie.com';
        return {
          provider: isMusic ? 'YouTube Music' : 'YouTube',
          sourceUrl: url.href,
          embedUrl: `${embedHost}/embed/videoseries?list=${encodeURIComponent(list)}&autoplay=1&enablejsapi=1`
        };
      }
      if (video) {
        const embedHost = isMusic ? 'https://music.youtube.com' : 'https://www.youtube-nocookie.com';
        return {
          provider: isMusic ? 'YouTube Music' : 'YouTube',
          sourceUrl: url.href,
          embedUrl: `${embedHost}/embed/${encodeURIComponent(video)}?autoplay=1&enablejsapi=1`
        };
      }
    }

    // 3. Apple Music
    if (host === 'music.apple.com' || host.endsWith('.apple.com')) {
      const embedUrl = url.href.replace('music.apple.com', 'embed.music.apple.com');
      return {
        provider: 'Apple Music',
        sourceUrl: url.href,
        embedUrl: embedUrl
      };
    }

    // 4. SoundCloud
    if (host === 'soundcloud.com' || host === 'm.soundcloud.com') {
      const encodedUrl = encodeURIComponent(url.href);
      return {
        provider: 'SoundCloud',
        sourceUrl: url.href,
        embedUrl: `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false`
      };
    }

    // 5. Bandcamp
    if (host.includes('bandcamp.com')) {
      return {
        provider: 'Bandcamp',
        sourceUrl: url.href,
        embedUrl: url.href
      };
    }

    // 6. Generic Music Embed / Any URL fallback
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      const parts = host.split('.');
      const domainName = parts.length > 1 ? parts[parts.length - 2] : host;
      const providerName = domainName.charAt(0).toUpperCase() + domainName.slice(1);
      return {
        provider: providerName || 'Music Embed',
        sourceUrl: url.href,
        embedUrl: url.href
      };
    }
  } catch {
    if (str.startsWith('http://') || str.startsWith('https://')) {
      return {
        provider: 'Music Embed',
        sourceUrl: str,
        embedUrl: str
      };
    }
  }

  return null;
}

function addPlaylist(event) {
  event.preventDefault();
  const urlInput = $('#playlistUrl');
  const titleInput = $('#playlistTitle');
  const parsed = parsePlaylistUrl(urlInput.value);
  if (!parsed) { showToast('Paste a valid Spotify, YouTube, Apple Music, or music link.'); return; }
  
  const mood = $('#playlistMood').value;
  const addedByInput = document.querySelector('input[name="addedBy"]:checked');
  const addedBy = addedByInput ? addedByInput.value : 'Person 1';

  const entry = {
    id: `diary-${Date.now()}`,
    title: titleInput.value.trim() || `${parsed.provider} pick`,
    mood,
    addedBy,
    stageId: stageAt(activeStage).id,
    stageLabel: stageAt(activeStage).phase,
    tag: `${addedBy}'s pick`,
    color: moodMeta[mood].color,
    ...parsed
  };

  roomState.entries.unshift(entry);
  applyRoomSelection(entry, 'manual');
  event.target.reset();
  showToast(`Saved to your music diary by ${addedBy}!`);
}

function setRoomMood(mood) {
  roomState.mood = mood;
  roomState.selectionMode = 'auto';
  const playlist = resolvePlaylist(recommendedRoomPlaylistId(activeStage));
  roomState.selected = playlist.id;
  applyRoomSelection(playlist, 'auto');
  showToast(`${mood} is the next feeling.`);
}

async function copyRoomLink() {
  const share = encodeRoom({
    entries: roomState.entries,
    selected: roomState.selected,
    mood: roomState.mood,
    roomCode: roomState.roomCode,
    selectionMode: roomState.selectionMode
  });

  let baseUrl = location.href.split('#')[0];
  const isFileProtocol = location.protocol === 'file:';

  if (isFileProtocol) {
    baseUrl = 'http://localhost:8000/index.html';
  }

  const link = `${baseUrl}#room=${share}`;

  try {
    await navigator.clipboard.writeText(link);
    if (isFileProtocol) {
      showToast('Copied! Publish your site to GitHub Pages/Netlify to share public links over the internet.');
    } else {
      showToast('Room invite link copied! Send it to your partner to stream together.');
    }
  } catch {
    showToast('Your room link is ready in this page’s address bar.');
  }
}

window.addEventListener('hashchange', () => {
  loadRoom();
  if (!$('#roomModal').hidden) {
    renderRoom();
  }
});

function syncCountdown() {
  const button = $('.sync-button');
  if (button.disabled) return;
  button.disabled = true;
  
  // Pause whatever is playing
  pauseActiveMedia();
  showToast('Paused for sync countdown...');
  
  let count = 3;
  button.textContent = `${count}…`;
  const timer = setInterval(() => {
    count -= 1;
    if (count > 0) { button.textContent = `${count}…`; return; }
    clearInterval(timer);
    button.textContent = 'hit play together';
    showToast('▶ Playing together now!');
    
    // Automatically resume playing
    playActiveMedia();
    
    setTimeout(() => { button.disabled = false; button.textContent = 'start a 3–2–1'; }, 2200);
  }, 1000);
}

function isUnlocked(index) { return index === 0 || state.completed.includes(stages[index - 1]?.id); }
function stageState(index) { return state.completed.includes(stages[index].id) ? 'discovered' : index === state.current ? 'up next' : 'locked'; }
function setStageColor(stage) { document.documentElement.style.setProperty('--stage', stage.color); }

function renderProgress() {
  $('#heartCount').textContent = state.completed.length;
  $('#completeCount').textContent = state.completed.length;
  const resumeStage = $('#resumeStage');
  if (resumeStage) resumeStage.textContent = stageAt(state.current).name.toLowerCase();
}

function renderMap() {
  $('#levelGrid').innerHTML = stages.map((stage, index) => {
    const unlocked = isUnlocked(index);
    const done = state.completed.includes(stage.id);
    const current = index === state.current && !done;
    return `<button class="level-card ${current ? 'is-current' : ''}" type="button" data-stage="${index}" ${unlocked ? '' : 'disabled'} style="--card-color:${stage.color}" aria-label="${stage.name}, ${done ? 'discovered' : unlocked ? 'available' : 'locked'}">
      <span class="card-top"><span>0${index + 1}</span><span>${done ? '✦' : unlocked ? 'open' : 'locked'}</span></span>
      <span class="card-symbol">${unlocked ? stage.symbol : '×'}</span>
      <h3>${stage.name}</h3><p>${stage.tag}</p><p class="card-state">${stageState(index)}</p>
    </button>`;
  }).join('');
}

function updatePlayer(stage = stageAt(activeStage), reset = false) {
  activeStage = stages.indexOf(stage);
  if (activeStage < 0) activeStage = 0;
  if (reset) state.progress = 0;
  setStageColor(stage);
  playbackContext = { type: 'story', currentId: stage.id };
  renderPlaybackSource();
  syncRoomFromStage(activeStage);
}

function updateProgressUI(currentSec, totalSec) {
  const source = currentTempoSource();
  const duration = totalSec || source.duration;
  const seconds = currentSec !== undefined ? currentSec : (duration * state.progress / 100);
  const input = $('#progressInput');
  if (input) {
    input.value = Math.round(state.progress);
    input.style.background = `linear-gradient(90deg, var(--acid) 0 ${state.progress}%, rgba(255,255,255,.25) ${state.progress}% 100%)`;
  }
  $('#elapsed').textContent = fmtTime(seconds);
  $('#duration').textContent = fmtTime(duration);
}

function showModal(id) {
  $$('.modal-layer').forEach((modal) => { if (modal.id !== id) modal.hidden = true; });
  if (id === 'roomModal') { renderRoom(); initSpotifyEmbedController(); }
  const modal = $(`#${id}`);
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const target = modal.querySelector('.close-button, button:not([disabled])');
  requestAnimationFrame(() => target?.focus());
}

function closeModals() { $$('.modal-layer').forEach((modal) => modal.hidden = true); document.body.style.overflow = ''; }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }

function openGame(index) {
  const stage = stageAt(index);
  if (!isUnlocked(index)) return showToast('That track is still wrapped in cellophane. Clear the stage before it.');
  activeStage = index;
  state.selected = null;
  const soundtrack = playlistForStage(stage.id);
  setStageColor(stage);
  $('#gameNumber').textContent = String(index + 1).padStart(2, '0');
  $('#gameState').textContent = state.completed.includes(stage.id) ? 'replay' : 'unlocked';
  $('#gamePhase').textContent = stage.phase;
  $('#gameTitle').textContent = stage.name;
  $('#gameDescription').textContent = stage.description;
  $('#gameSoundtrackTitle').textContent = soundtrack.title;
  $('#gameSoundtrackMeta').textContent = `${soundtrack.provider} · free to open`;
  $('#gamePrompt').textContent = stage.prompt;
  $('#gameSymbol').textContent = stage.symbol;
  $('#gameVisual').style.setProperty('--stage', stage.color);
  $('#choiceList').innerHTML = stage.choices.map((choice, i) => `<button class="choice" type="button" data-choice="${i}"><span class="choice-letter">${String.fromCharCode(65 + i)}</span><span>${escapeHTML(choice)}</span></button>`).join('');
  const replaying = state.completed.includes(stage.id);
  $('.lock-button').disabled = !replaying;
  $('.lock-button span:first-child').textContent = replaying ? 'play that back' : 'lock in the vibe';
  showModal('gameModal');
}

function selectChoice(index) {
  state.selected = index;
  $$('.choice').forEach((choice, choiceIndex) => choice.classList.toggle('is-selected', choiceIndex === index));
  $('.lock-button').disabled = false;
}

function completeStage() {
  const stage = stageAt(activeStage);
  if (state.selected === null && !state.completed.includes(stage.id)) { showToast('Pick a little feeling first.'); return; }
  if (!state.completed.includes(stage.id)) {
    state.completed.push(stage.id);
    state.current = Math.min(activeStage + 1, stages.length - 1);
    saveState();
    renderProgress();
    renderMap();
  }
  // Switch to story context and auto-play the stage's YouTube song
  playbackContext = { type: 'story', currentId: stage.id };
  activeAudioEngine = 'youtube';
  setStageColor(stage);
  state.progress = 0;
  renderPlaybackSource();
  // Load the YouTube embed for this stage's song
  if (stage.youtubeUrl) {
    loadYouTubeUrlAndPlay(stage.youtubeUrl);
  }
  $('#winIcon').textContent = stage.symbol;
  $('#winTitle').innerHTML = activeStage === stages.length - 1 ? 'You made it to the <i>long outro.</i>' : 'That felt like a <i>good sign.</i>';
  $('#winText').textContent = stage.win;
  $('#winSong').textContent = stage.song;
  $('#winArtist').textContent = stage.artist;
  $('#winCover').style.setProperty('--stage', stage.color);
  $('.confetti').style.setProperty('--stage', stage.color);
  showModal('winModal');
}

function openNext() {
  const next = Math.min(activeStage + 1, stages.length - 1);
  if (activeStage === stages.length - 1) { closeModals(); showModal('mapModal'); return; }
  openGame(next);
}

function resetStory() {
  state = { ...state, completed: [], current: 0, selected: null, progress: 18 };
  saveState();
  activeStage = 0;
  updatePlayer(stageAt(0));
  renderProgress();
  renderMap();
  showToast('Fresh tape. Same good taste.');
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
}

function hit(freq, duration, type = 'sine', gainAmount = .06, delay = 0) {
  if (!audioContext || state.muted) return;
  const now = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type; oscillator.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(gainAmount, now + .012); gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  oscillator.connect(gain).connect(audioContext.destination); oscillator.start(now); oscillator.stop(now + duration + .03);
}

function beat() {
  const stage = currentTempoSource();
  const chord = [220, 277.18, 329.63, 440];
  hit(chord[lastBeat % chord.length], .24, lastBeat % 4 === 0 ? 'triangle' : 'sine', .052);
  if (lastBeat % 2 === 0) hit(80, .09, 'sine', .08, .02);
  if (lastBeat % 4 === 3) hit(660, .12, 'square', .016, .03);
  lastBeat += 1;
  const beatLength = 60000 / stage.bpm;
  clearInterval(beatTimer);
  beatTimer = setInterval(beat, beatLength);
}

function startProgress() {
  let last = performance.now();
  const advance = (now) => {
    if (!state.playing) return;
    state.progress += ((now - last) / 1000) / currentTempoSource().duration * 100;
    last = now;
    if (state.progress >= 100) { state.progress = 0; }
    updateProgressUI();
    progressTimer = requestAnimationFrame(advance);
  };
  progressTimer = requestAnimationFrame(advance);
}

function togglePlay() {
  const dock = $('.player-dock');

  if (activeAudioEngine === 'spotify' || activeAudioEngine === 'youtube') {
    const isPlaying = dock.classList.contains('is-playing');
    if (isPlaying) {
      pauseActiveMedia();
      dock.classList.remove('is-playing');
      $('.play-button').setAttribute('aria-pressed', 'false');
    } else {
      playActiveMedia();
      dock.classList.add('is-playing');
      $('.play-button').setAttribute('aria-pressed', 'true');
    }
    return;
  }

  if (state.playing) {
    state.playing = false;
    clearInterval(beatTimer);
    cancelAnimationFrame(progressTimer);
    dock.classList.remove('is-playing');
    $('.play-button').setAttribute('aria-pressed', 'false');
    return;
  }

  activeAudioEngine = 'synth';
  const badge = $('#sourceBadge');
  if (badge) badge.textContent = 'Synth Loop';
  ensureAudio();
  state.playing = true;
  dock.classList.add('is-playing');
  $('.play-button').setAttribute('aria-pressed', 'true');
  lastBeat = 0;
  beat();
  startProgress();
}

function changeTrack(offset) {
  if (playbackContext.type === 'room') {
    // Room context: cycle through room library only
    const available = roomLibrary();
    const now = available.findIndex((playlist) => playlist.id === playbackContext.currentId);
    const next = available[(now + offset + available.length) % available.length];
    if (next) applyRoomSelection(next, roomState.selectionMode);
    showToast(`Now playing: ${next.title}`);
    return;
  }
  // Story context: cycle through UNLOCKED stages only
  const unlocked = stages.filter((s, i) => isUnlocked(i));
  if (unlocked.length === 0) return;
  const currentIdx = unlocked.findIndex((s) => s.id === playbackContext.currentId);
  const nextIdx = (currentIdx + offset + unlocked.length) % unlocked.length;
  const next = unlocked[nextIdx];
  playbackContext = { type: 'story', currentId: next.id };
  activeStage = stages.indexOf(next);
  activeAudioEngine = 'youtube';
  setStageColor(next);
  state.progress = 0;
  renderPlaybackSource();
  // Load the YouTube song for this stage
  if (next.youtubeUrl) {
    loadYouTubeUrlAndPlay(next.youtubeUrl);
  }
  showToast(`Now playing: ${next.song} · ${next.artist}`);
}

function toggleMute() {
  state.muted = !state.muted;
  saveState();
  $('.sound-toggle')?.setAttribute('aria-pressed', String(state.muted));
  const label = $('.sound-label');
  if (label) label.textContent = state.muted ? 'muted' : 'sound';
  if (state.playing && !state.muted) hit(440, .15, 'triangle', .05);
  showToast(state.muted ? 'Preview sound muted.' : 'Preview sound is back.');
}

function handleAction(action) {
  if (action === 'open-room') {
    // Switch context to room when clicking the Room button on the dock
    playbackContext = { type: 'room', currentId: roomState.selected || recommendedRoomPlaylistId(activeStage) };
    renderPlaybackSource();
    renderRoom();
    showModal('roomModal');
  }
  else if (action === 'open-map') { renderMap(); showModal('mapModal'); }
  else if (action === 'open-current') openGame(state.current);
  else if (action === 'close-modal') closeModals();
  else if (action === 'close-all') { closeModals(); renderMap(); showModal('mapModal'); }
  else if (action === 'complete') completeStage();
  else if (action === 'next-level') openNext();
  else if (action === 'play') togglePlay();
  else if (action === 'previous') changeTrack(-1);
  else if (action === 'next') changeTrack(1);
  else if (action === 'mute') toggleMute();
  else if (action === 'copy-room') copyRoomLink();
  else if (action === 'sync-countdown') syncCountdown();
  else if (action === 'load-current-track' || action === 'use-stage-soundtrack') {
    const stage = stageAt(activeStage);
    playbackContext = { type: 'story', currentId: stage.id };
    activeAudioEngine = 'youtube';
    if (stage.youtubeUrl) {
      loadYouTubeUrlAndPlay(stage.youtubeUrl);
    }
    renderPlaybackSource();
    showModal('roomModal');
    showToast(`Playing "${stage.song}" by ${stage.artist}`);
  }
  else if (action === 'embed-play') { togglePlay(true); }
  else if (action === 'embed-pause') { togglePlay(false); }
  else if (action === 'reset') resetStory();
}

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action) handleAction(action);
  
  const roomPick = event.target.closest('[data-room-pick]')?.dataset.roomPick;
  if (roomPick) selectRoomPlaylist(roomPick);

  const deleteEntryId = event.target.closest('[data-delete-entry]')?.dataset.deleteEntry;
  if (deleteEntryId) deleteDiaryEntry(deleteEntryId);

  const filterBtn = event.target.closest('[data-filter]');
  if (filterBtn) {
    roomState.filterPerson = filterBtn.dataset.filter;
    renderRoom();
  }

  const stage = event.target.closest('[data-stage]')?.dataset.stage;
  if (stage !== undefined) openGame(Number(stage));

  const choice = event.target.closest('[data-choice]')?.dataset.choice;
  if (choice !== undefined) selectChoice(Number(choice));

  if (event.target.classList.contains('modal-layer')) closeModals();
});

$('#playlistForm')?.addEventListener('submit', addPlaylist);
$$('#moodOptions button').forEach((button) => button.addEventListener('click', () => setRoomMood(button.dataset.mood)));
$('#progressInput')?.addEventListener('input', (event) => { state.progress = Number(event.target.value); updateProgressUI(); });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModals();
  if (event.key === ' ' && !['INPUT', 'BUTTON'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    togglePlay();
  }
});

function updateClock() {
  const clock = $('#clock');
  if (clock) clock.textContent = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()).toLowerCase();
}

loadState();
activeStage = Math.max(0, state.completed.length ? Math.min(state.current, stages.length - 1) : 0);
loadRoom();
updateClock();
setInterval(updateClock, 20000);
renderProgress();
renderMap();
updatePlayer(stageAt(activeStage));
