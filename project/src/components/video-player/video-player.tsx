import { useState, useEffect, useRef } from 'react';
import { Film } from '../../types/film';
import { useNavigate } from 'react-router-dom';

type VideoPlayerProps = {
  autoPlay: boolean;
  video: Film;
  showControls?: boolean;
  muted?: boolean;
}

function VideoPlayer({autoPlay, video, showControls = true, muted = false}: VideoPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentProgress, setCurrentProgress] = useState(0);

  const {name, videoLink, previewImage} = video;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();

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
      if (document.fullscreenElement === undefined) {
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

  return (
    <>
      <video
        src={videoLink}
        className="player__video"
        poster={previewImage}
        ref={videoRef}
        muted={muted}
      />

      {showControls &&

        <>
          <button
            type="button"
            className="player__exit"
            onClick={() => navigate(-1)}>Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={currentProgress} max="100" />
                <div className="player__toggler" style={{left: `${currentProgress}%`}}>Toggle</div>
              </div>
              <div className="player__time-value">{videoRef.current?.duration}</div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                disabled={isLoading}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </button>
              <div className="player__name">{name}</div>

              <button type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen" />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </>}
    </>
  );
}

export default VideoPlayer;
