import { Link, useParams } from 'react-router-dom';

import FilmActions from '../film-actions/film-actions';
import FilmDescription from '../film-description/film-description';
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import NotFound from '../not-found/not-found';
import UserMenu from '../user-menu/user-menu';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/async-actions';
import { useEffect } from 'react';

function FilmPage(): JSX.Element {
  const {id: idParam} = useParams();
  const films = useAppSelector(({films}) => films);
  const film = films.find(({id}) => id.toString() === idParam);

  if (film === undefined) {
    return <NotFound />;
  }

  const dispatch = useAppDispatch();
  const similarFilms = films.filter(({genre}) => genre === film.genre);

  useEffect(() => {
    dispatch(fetchReviewsAction(film.id));
    scroll(0, 0);
  }, [film.id]);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} key={film.backgroundImage} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserMenu />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <FilmActions id={film.id} />

                <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218"
                height="327"
              />
            </div>

            <FilmDescription film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={similarFilms} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
