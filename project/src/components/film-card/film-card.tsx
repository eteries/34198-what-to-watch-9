import { Link } from 'react-router-dom';

import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';
import { useEffect, useState } from 'react';

type FilmCardProps = {
  film: Film
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const {name, id} = film;
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setIsPlaying(false);
      return;
    }

    const timerId = setTimeout(() => setIsPlaying(true), 1000);

    return () => {
      clearInterval(timerId);
    };

  }, [isHovered]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          autoPlay={isPlaying}
          video={film}
          showControls={false}
          muted
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${id}`}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
