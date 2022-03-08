import { Film } from '../../types/film';
import useVideoPlayer from '../../hooks/use-video-player/use-video-player';

type VideoPlayerProps = {
  autoPlay: boolean;
  video: Film;
  showControls?: boolean;
  muted?: boolean;
  onExit?: () => void
}

function VideoPlayer({
  autoPlay,
  video,
  showControls = true,
  muted = false,
  onExit,
}: VideoPlayerProps): JSX.Element {
  const player = useVideoPlayer(video, autoPlay, showControls);
  const {videoRef, getIsLoading, toggle, getCurrentProgress, duration} = player;
  const {name, videoLink, previewImage} = video;

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
            onClick={onExit}
          >
            Exit
          </button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value={getCurrentProgress()} max="100" />
                <div className="player__toggler" style={{left: `${getCurrentProgress()}%`}}>Toggle</div>
              </div>
              <div className="player__time-value">{duration}</div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                disabled={getIsLoading()}
                onClick={toggle}
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
