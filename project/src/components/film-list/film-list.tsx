import FilmCard from '../film-card/film-card';

import { Film } from '../../types/film';

type FilmListProps = {
  films: Film[];
  hasVideoPreview?: boolean;
}

function FilmList({films, hasVideoPreview = true}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            hasVideoPreview={hasVideoPreview}
          />
        ))
      }
    </div>
  );
}

export default FilmList;
