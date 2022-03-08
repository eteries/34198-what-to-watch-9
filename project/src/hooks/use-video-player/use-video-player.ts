import { useEffect, useRef, useState } from 'react';
import { Film } from '../../types/film';
import { Player } from '../../types/player';

function UseVideoPlayer(video: Film, autoPlay: boolean, showControls:boolean): Player {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentProgress, setCurrentProgress] = useState(0);

  const {videoLink} = video;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }

    return () => {
      if (videoRef.current !== null) {
        videoRef.current.onloadeddata = null;
        videoRef.current = null;
      }
    };
  }, [videoLink]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying || autoPlay) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();

    if (!showControls) {
      videoRef.current.load();
    }
  }, [isPlaying, autoPlay]);

  useEffect(() => {
    if (!showControls) {
      return;
    }



    const fullScreenBtn = document.querySelector('.player__full-screen') as HTMLButtonElement;

    const onFullScreenClick = () => {
      if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
        return;
      }

      if (document.exitFullscreen !== undefined) {
        document.exitFullscreen();
      }
    }

    fullScreenBtn.addEventListener('click', onFullScreenClick);

    return () => fullScreenBtn.removeEventListener('click', onFullScreenClick);
  });

  useEffect(() => {
    const onPlaying = ():void => {
      if (videoRef.current !== null) {
        setCurrentProgress(videoRef.current.currentTime / videoRef.current.duration * 100);
        return;
      }

      setCurrentProgress(0);
    }

    if (videoRef.current !== null) {
      videoRef.current.onplaying = onPlaying;
    }
  })

  const getDuration = () => {
    if (videoRef.current !== null) {
      return videoRef.current.duration;
    }

    return 0;
  }

  return {
    videoRef,
    duration: getDuration(),
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying(!isPlaying),
    getCurrentProgress: () => currentProgress,
    getIsLoading: () => isLoading,
  }
}

export default UseVideoPlayer;
