import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';
import { useState } from 'react';

type FilmListProps = {
  films: Film[]
}

type ActiveId = null | number;

function FilmList({films}: FilmListProps): JSX.Element {
  const [activeId, setActiveId] = useState(null as ActiveId);
  const handleOnHover = (id: number): void => setActiveId(id);

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard key={film.id} film={film} onHover={handleOnHover} isActive={activeId === film.id} />
        ))
      }
    </div>
  );
}

export default FilmList;
