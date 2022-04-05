import { useEffect, useRef, useState } from 'react';

import { Film } from '../../types/film';
import { Player } from '../../types/player';
import { errorHandle } from '../../services/error';

function useVideoPlayer(video: Film, hasAutoPlay: boolean, showControls:boolean): Player {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(hasAutoPlay);
  const [currentProgress, setCurrentProgress] = useState(0);

  const {videoLink} = video;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onLoadedData = () => {
    if (videoRef.current !== null) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = onLoadedData;
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

    if (isPlaying || hasAutoPlay) {
      videoRef.current
        .play()
        .catch(() => errorHandle(null));
      return;
    }

    videoRef.current.pause();

    if (!showControls) {
      videoRef.current.load();
    }
  }, [isPlaying, hasAutoPlay]);

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
    };

    fullScreenBtn.addEventListener('click', onFullScreenClick);

    return () => fullScreenBtn.removeEventListener('click', onFullScreenClick);
  });

  useEffect(() => {
    const onTimeUpdate = ():void => {
      if (videoRef.current !== null) {
        setCurrentProgress(videoRef.current.currentTime / videoRef.current.duration * 100);

      }
    };

    if (videoRef.current !== null) {
      videoRef.current.ontimeupdate = onTimeUpdate;
    }

    return () => {
      if (videoRef.current !== null) {
        videoRef.current.ontimeupdate = null;
      }
    };
  });

  const getTimeLeft = (): number | null => {
    if (videoRef.current !== null && videoRef.current.duration !== Infinity) {
      return videoRef.current.duration - videoRef.current.currentTime;
    }

    return null;
  };

  return {
    videoRef,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying(!isPlaying),
    getCurrentProgress: () => currentProgress,
    getIsLoading: () => isLoading,
    getIsPlaying: () => isPlaying,
    getTimeLeft,
  };
}

export default useVideoPlayer;
