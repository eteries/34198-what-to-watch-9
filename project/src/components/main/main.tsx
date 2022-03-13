import GenreList from '../genre-list/genre-list';
import Logo from '../logo/logo';
import FilmList from '../film-list/film-list';
import FilmPromo from '../film-promo/film-promo';
import UserMenu from '../user-menu/user-menu';

import { ALL_GENRES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterFilms } from '../../store/actions';
import { mapToUniqueKeys } from '../../utils';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const {films, filteredFilms} = useAppSelector((state) => state);
  const genres = mapToUniqueKeys(films, 'genre', ALL_GENRES);

  return (
    <>
      <FilmPromo film={films[0]}>
        <header className="page-header film-card__head">
          <Logo />

          <UserMenu />
        </header>
      </FilmPromo>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} onChange={() => dispatch(filterFilms())}/>

          <FilmList films={filteredFilms} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo theme="light" />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Main;
