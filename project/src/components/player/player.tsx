import { FILMS } from '../../mocks/films';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found/not-found';

function Player(): JSX.Element {
  const {id: idParam} = useParams();
  const film = FILMS.find(({id}) => id.toString() === idParam);

  if (film === undefined) {
    return <NotFound />;
  }

  const {name, videoLink, backgroundImage} = film;

  return (
    <div className="player">
      <video src={videoLink} className="player__video" poster={backgroundImage} />

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100" />
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
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
    </div>
  );
}

export default Player;
