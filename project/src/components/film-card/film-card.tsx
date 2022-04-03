import { Link, useNavigate } from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';

import { AppRoutes, Settings } from '../../constants';
import useDelayedEffect from '../../hooks/use-delayed-effect/use-delayed-effect';
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const {name, id} = film;
  const [isPlaying, setIsPlaying] = useDelayedEffect(Settings.VideoPreviewDelay);
  const navigate = useNavigate();

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div
        className="small-film-card__image"
        role="button"
        onClick={() => navigate(`${AppRoutes.Films}/${id}`)}
      >
        <VideoPlayer
          hasAutoPlay={isPlaying}
          video={film}
          showControls={false}
          isMuted
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`${AppRoutes.Films}/${id}`}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
