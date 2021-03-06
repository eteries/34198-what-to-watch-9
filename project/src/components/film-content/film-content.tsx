import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FilmActions from '../film-actions/film-actions';
import FilmDescription from '../film-description/film-description';
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction, fetchSimilarFilmsAction } from '../../store/async-actions';
import { Film } from '../../types/film';
import { Setting } from '../../constants';

type FilmContentProps = {
  film: Film;
}

function FilmContent({film}: FilmContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {similarFilms} = useAppSelector(({CONTENT}) => CONTENT);
  const {user} = useAppSelector(({USER}) => USER);
  const {id, name, backgroundImage, posterImage, genre, released, isFavorite} = film;
  const selectedSimilarFilms = similarFilms
    .filter((item) => item.id !== id)
    .slice(0, Setting.SimilarFilmsMaxNum);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
    dispatch(fetchSimilarFilmsAction(id));
    window.scroll(0, 0);
  }, [id]);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} key={backgroundImage} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserMenu />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <FilmActions id={id} isFavorite={isFavorite} />
                {user !== null &&
                  <Link
                    to={ `/films/${ id }/review` }
                    className="btn film-card__button"
                  >
                    Add review
                  </Link> }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218"
                height="327"
              />
            </div>

            <FilmDescription film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        {selectedSimilarFilms.length > 0 &&
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmList films={ selectedSimilarFilms } />
          </section>}
        <Footer />
      </div>
    </>
  );
}

export default FilmContent;
