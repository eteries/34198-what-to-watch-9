import FilmCard from '../film-card/film-card';

import { Film } from '../../types/film';

type FilmListProps = {
  films: Film[]
}

function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard key={film.id}
            film={film}
          />
        ))
      }
    </div>
  );
}

export default FilmList;
