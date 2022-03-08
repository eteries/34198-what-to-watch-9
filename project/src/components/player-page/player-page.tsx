import { useNavigate, useParams } from 'react-router-dom';

import NotFound from '../not-found/not-found';
import VideoPlayer from '../video-player/video-player';

import { FILMS } from '../../mocks/films';

function PlayerPage(): JSX.Element {
  const {id: idParam} = useParams();
  const film = FILMS.find(({id}) => id.toString() === idParam);
  const navigate = useNavigate();

  if (film === undefined) {
    return <NotFound />;
  }

  return (
    <div className="player">
      <VideoPlayer
        autoPlay={false}
        video={film}
        showControls
        muted
        onExit={() => navigate(-1)}
      />
    </div>
  );
}

export default PlayerPage;
