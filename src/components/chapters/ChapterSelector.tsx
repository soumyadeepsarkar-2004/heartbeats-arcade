import { ChapterCard } from './ChapterCard';
import { LevelProgress } from './LevelProgress';
import type { StageTrack } from '../../hooks/useAmbientState';
import { useAudioEngine } from '../music/AudioEngine';

interface ChapterSelectorProps {
  chapters: StageTrack[];
  activeChapter: StageTrack;
  onSelectChapter: (id: string) => void;
  onCompleteChapter: () => void;
}

export function ChapterSelector({ chapters, activeChapter, onSelectChapter, onCompleteChapter }: ChapterSelectorProps) {
  const { playTrack, currentTrack } = useAudioEngine();

  const handlePlaySong = (stage: StageTrack) => {
    playTrack({
      id: stage.id,
      title: stage.song,
      artist: stage.artist,
      duration: stage.duration,
      youtubeUrl: stage.youtubeUrl,
      mode: 'story',
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-serif text-white tracking-widest">Story Map</h2>
        <LevelProgress currentLevel={activeChapter.level} totalLevels={chapters.length} />
      </div>
      
      <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar">
        {chapters.map(chapter => (
          <ChapterCard 
            key={chapter.id} 
            chapter={chapter} 
            onClick={onSelectChapter}
            onPlaySong={handlePlaySong}
            isPlayingThisSong={currentTrack?.title === chapter.song}
          />
        ))}
      </div>
      
      {/* Dev unlock button */}
      <button 
        onClick={onCompleteChapter}
        className="text-[10px] uppercase tracking-widest text-muted hover:text-white mt-2 self-start"
      >
        [Dev: Clear Level & Unlock Next Song]
      </button>
    </div>
  );
}
