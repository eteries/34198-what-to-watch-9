import { useState, useEffect, useRef } from 'react';
import { Film } from '../../types/film';

type VideoPlayerProps = {
  autoPlay: boolean;
  video: Film;
  showControls: boolean;
}

function VideoPlayer({autoPlay, video, showControls}: VideoPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const {name, videoLink, previewImage} = video;

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

    if (autoPlay) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [autoPlay]);

  const play = () => {
    if (videoRef.current !== null) {
      videoRef.current.play()
    }
  }


  return (
    <>
      <video
        src={videoLink}
        className="player__video"
        poster={previewImage}
        ref={videoRef}
      />

      {showControls &&

        <>
          <button type="button" className="player__exit">Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value="30" max="100" />
                <div className="player__toggler" style={{left: '30%'}}>Toggle</div>
              </div>
              <div className="player__time-value">1:30:29</div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                disabled={isLoading}
                onClick={play}
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
