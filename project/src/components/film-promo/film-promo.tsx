import { PropsWithChildren } from 'react';

import FilmActions from '../film-actions/film-actions';

import { Film } from '../../types/film';

type FilmPromoProps = {
  film: Film;
};

function FilmPromo({film, children}: PropsWithChildren<FilmPromoProps>): JSX.Element {
  const {id, name, genre, released, posterImage, backgroundImage, isFavorite} = film;
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      {children}

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <FilmActions id={id} isFavorite={isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmPromo;
