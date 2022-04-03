import Loading from '../loading/loading';

import useVideoPlayer from '../../hooks/use-video-player/use-video-player';
import { Film } from '../../types/film';
import { formatTimeLeft } from '../../utils/transform';

type VideoPlayerProps = {
  hasAutoPlay: boolean;
  video: Film;
  showControls?: boolean;
  isMuted?: boolean;
  onExit?: () => void;
}

function VideoPlayer({
  hasAutoPlay,
  video,
  showControls = true,
  isMuted = false,
  onExit,
}: VideoPlayerProps): JSX.Element {
  const player = useVideoPlayer(video, hasAutoPlay, showControls);
  const {videoRef, getIsLoading, getIsPlaying, toggle, getCurrentProgress, getTimeLeft} = player;
  const {name, videoLink, previewImage} = video;

  return (
    <>
      {getIsLoading() && <Loading />}
      <video
        src={videoLink}
        className="player__video"
        poster={previewImage}
        ref={videoRef}
        muted={isMuted}
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
              <div className="player__time-value">{formatTimeLeft(getTimeLeft())}</div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                disabled={getIsLoading()}
                onClick={toggle}
              >
                {getIsPlaying() &&
                  <>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </>}

                {!getIsPlaying() &&
                  <>
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause" />
                    </svg>
                    <span>Pause</span>
                  </>}
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
