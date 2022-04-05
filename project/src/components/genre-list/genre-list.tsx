import { MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/content-management/content-management';

type GenreListProps = {
  genres: string[];
  onChange: () => void;
};

function GenreList({genres, onChange}:   GenreListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {genre: activeGenre} = useAppSelector(({CONTENT}) => CONTENT);
  const setActiveClass = (genre: string) => genre === activeGenre ? 'catalog__genres-item--active' : '';

  const onGenreClick = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    dispatch(changeGenre(genre));
    onChange();
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li className={`catalog__genres-item ${setActiveClass(genre)}`} key={genre}>
          <a href="#"
            className="catalog__genres-link"
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => onGenreClick(evt, genre)}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
