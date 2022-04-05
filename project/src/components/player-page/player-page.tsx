import { useNavigate, useParams } from 'react-router-dom';

import NotFound from '../not-found/not-found';
import VideoPlayer from '../video-player/video-player';

import { useAppSelector } from '../../hooks';

function PlayerPage(): JSX.Element {
  const {id: idParam} = useParams();
  const {films} = useAppSelector(({CONTENT}) => CONTENT);
  const film = films.find(({id}) => id.toString() === idParam);
  const navigate = useNavigate();

  if (film === undefined) {
    return <NotFound />;
  }

  return (
    <div className="player">
      <VideoPlayer
        hasAutoPlay={false}
        video={film}
        showControls
        isMuted
        onExit={() => navigate(-1)}
      />
    </div>
  );
}

export default PlayerPage;
