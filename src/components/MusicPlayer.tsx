import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
} from 'lucide-react';

const MusicPlayer: React.FC = () => {
  console.log('MusicPlayer loaded');

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Percentage
  const [volume, setVolume] = useState(80); // Percentage
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  const MOCK_SONG_DURATION = 210; // 3 minutes 30 seconds

  // Mock song data
  const currentSong = {
    title: "Doraemon's Theme",
    artist: 'Kumiko Osugi',
    albumArt: 'https://via.placeholder.com/64x64?text=D',
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + 100 / MOCK_SONG_DURATION;
          if (nextProgress >= 100) {
            // In a real app, you'd handle next song logic here
            setIsPlaying(false);
            return 100;
          }
          return nextProgress;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, MOCK_SONG_DURATION]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRepeatToggle = () => {
    setRepeatMode(current => {
      if (current === 'off') return 'all';
      if (current === 'all') return 'one';
      return 'off';
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentTime = formatTime((progress / 100) * MOCK_SONG_DURATION);
  const totalTime = formatTime(MOCK_SONG_DURATION);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 50) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="h-4 w-4 text-green-500" />;
      case 'all':
        return <Repeat className="h-4 w-4 text-green-500" />;
      default:
        return <Repeat className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-zinc-900 text-white p-3 grid grid-cols-3 items-center border-t border-zinc-800">
      {/* Song Info */}
      <div className="flex items-center gap-3">
        <img src={currentSong.albumArt} alt="Album Art" className="h-14 w-14 rounded-md" />
        <div>
          <p className="font-semibold text-sm truncate">{currentSong.title}</p>
          <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:text-white" onClick={() => setIsShuffled(!isShuffled)}>
            <Shuffle className={`h-4 w-4 ${isShuffled ? 'text-green-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="bg-white text-black rounded-full h-9 w-9 hover:bg-zinc-200"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-black" /> : <Play className="h-5 w-5 fill-black" />}
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-white">
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-white" onClick={handleRepeatToggle}>
            {getRepeatIcon()}
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-zinc-400">{currentTime}</span>
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <span className="text-xs text-zinc-400">{totalTime}</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center justify-end gap-2">
        {getVolumeIcon()}
        <Slider
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          max={100}
          step={1}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;