import { useState } from 'react';

export interface StageTrack {
  id: string;
  level: number;
  title: string;
  subtitle: string;
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
  isUnlocked: boolean;
  isActive: boolean;
}

export const INITIAL_STAGES: StageTrack[] = [
  {
    id: 'talking',
    level: 1,
    title: 'Talking Stage',
    subtitle: 'Late night text messages.',
    phase: 'level one · soft launch',
    tag: 'the first reply',
    symbol: '…',
    color: '#FF7A59',
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
    isUnlocked: true,
    isActive: true,
  },
  {
    id: 'closer',
    level: 2,
    title: 'Getting Closer',
    subtitle: 'Sharing playlists and secrets.',
    phase: 'level two · open tabs',
    tag: 'the easy laugh',
    symbol: '↗',
    color: '#FFC25B',
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
    isUnlocked: false,
    isActive: false,
  },
  {
    id: 'crush',
    level: 3,
    title: 'Crush',
    subtitle: 'Butterflies and overthinking.',
    phase: 'level three · heart eyes',
    tag: 'butterfly FM',
    symbol: '♥',
    color: '#FF5E96',
    song: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    duration: 261,
    bpm: 116,
    description: 'You have a favorite photo of them and it is absolutely not a big deal. Okay, maybe a little.',
    prompt: 'Pick the tell that gives you away.',
    choices: ['Their name makes you sit up', 'You save a meme just for them', 'Every lyric gets suspiciously specific'],
    win: "You're glowing. Your friends noticed three songs ago.",
    youtubeTrackId: 'Umqb9KENgmk',
    youtubeUrl: 'https://www.youtube-nocookie.com/embed/Umqb9KENgmk?autoplay=1&enablejsapi=1',
    isUnlocked: false,
    isActive: false,
  },
  {
    id: 'falling',
    level: 4,
    title: 'Falling in Love',
    subtitle: 'Everything feels like a movie.',
    phase: 'level four · free fall',
    tag: 'the big maybe',
    symbol: '♡',
    color: '#C084FC',
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
    isUnlocked: false,
    isActive: false,
  },
  {
    id: 'inlove',
    level: 5,
    title: 'In Love',
    subtitle: 'Comfortable silence.',
    phase: 'level five · side b',
    tag: 'sunday repeat',
    symbol: '∞',
    color: '#70D4BD',
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
    isUnlocked: false,
    isActive: false,
  },
  {
    id: 'deepcut',
    level: 6,
    title: 'Deep Cut',
    subtitle: 'The hardest conversations.',
    phase: 'level six · low lights',
    tag: 'the honest part',
    symbol: '≈',
    color: '#79B4FF',
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
    isUnlocked: false,
    isActive: false,
  },
  {
    id: 'forever',
    level: 7,
    title: 'Golden Era',
    subtitle: 'Looking back at how it started.',
    phase: 'level seven · final track',
    tag: 'keep playing',
    symbol: '✦',
    color: '#C8FF4F',
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
    isUnlocked: false,
    isActive: false,
  },
];

export function useAmbientState() {
  const [chapters, setChapters] = useState<StageTrack[]>(INITIAL_STAGES);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeChapter = chapters.find(c => c.isActive) || chapters[0];

  const unlockNextChapter = () => {
    setChapters(prev => {
      const activeIdx = prev.findIndex(c => c.isActive);
      const nextIdx = activeIdx + 1;
      if (nextIdx >= prev.length) return prev;

      return prev.map((ch, i) => ({
        ...ch,
        isUnlocked: i <= nextIdx ? true : ch.isUnlocked,
      }));
    });
  };

  const selectChapter = (id: string) => {
    const target = chapters.find(c => c.id === id);
    if (!target || !target.isUnlocked) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setChapters(prev => prev.map(ch => ({
        ...ch,
        isActive: ch.id === id
      })));
      setIsTransitioning(false);
    }, 1000);
  };

  return {
    chapters,
    activeChapter,
    isTransitioning,
    unlockNextChapter,
    selectChapter
  };
}
