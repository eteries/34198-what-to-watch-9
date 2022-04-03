import { Link, useNavigate } from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';

import { AppRoutes, VIDEO_PREVIEW_DELAY } from '../../constants';
import useDelayedEffect from '../../hooks/use-delayed-effect/use-delayed-effect';
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
  hasVideoPreview?: boolean;
}

function FilmCard({film, hasVideoPreview = true}: FilmCardProps): JSX.Element {
  const {name, id, previewImage} = film;
  const [isPlaying, setIsPlaying] = useDelayedEffect(VIDEO_PREVIEW_DELAY);
  const navigate = useNavigate();

  const previewTemplate = (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      <div className="small-film-card__image">
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

  const imageTemplate = (
    <article
      className="small-film-card catalog__films-card"
      onClick={() => navigate(`${AppRoutes.Films}/${id}`)}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} />
      </div>
      <h3 className="small-film-card__title">
        {name}
      </h3>
    </article>
  );

  return (
    <>
      { hasVideoPreview && previewTemplate }
      { !hasVideoPreview && imageTemplate }
    </>
  );
}

export default FilmCard;
