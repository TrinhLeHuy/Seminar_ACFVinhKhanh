/**
 * Audio Player Component - View
 * Plays audio guides for locations
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import type { AudioGuide } from '@shared/models/AudioGuide';
import { LANGUAGE_NAMES } from '@shared/models/AudioGuide';

interface AudioPlayerProps {
  audioGuide: AudioGuide;
  className?: string;
}

export const AudioPlayer = ({ audioGuide, className }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <audio ref={audioRef} src={audioGuide.audioUrl} preload="metadata" />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="shrink-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {LANGUAGE_NAMES[audioGuide.language as keyof typeof LANGUAGE_NAMES] ||
                audioGuide.language}
            </span>
            <span className="text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
