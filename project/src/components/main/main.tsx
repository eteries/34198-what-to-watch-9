import { useEffect } from 'react';

import GenreList from '../genre-list/genre-list';
import Logo from '../logo/logo';
import FilmList from '../film-list/film-list';
import FilmPromo from '../film-promo/film-promo';
import Footer from '../footer/footer';
import Loading from '../loading/loading';
import UserMenu from '../user-menu/user-menu';

import { ALL_GENRES, Settings } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UseShowMore from '../../hooks/use-show-more/use-show-more';
import { filterFilms } from '../../store/actions';
import { fetchPromoFilmAction } from '../../store/async-actions';
import { mapToUniqueKeys } from '../../utils';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const {films, promoFilm, filteredFilms, isLoading} = useAppSelector((state) => state);
  const genres = mapToUniqueKeys(films, 'genre', ALL_GENRES).slice(0, Settings.GenresMaxLength);
  const [visibleFilms, isButtonShown, showMore] = UseShowMore(filteredFilms, Settings.FilmListChunk);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  },[]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#180202', minHeight: '100vh'}}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {promoFilm &&
        <FilmPromo film={promoFilm}>
          <header className="page-header film-card__head">
            <Logo />

            <UserMenu />
          </header>
        </FilmPromo>}

      {!promoFilm &&
        <header className="page-header film-card__head">
          <Logo />

          <UserMenu />
        </header>}

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} onChange={() => dispatch(filterFilms())}/>

          <FilmList films={visibleFilms} />

          <div className="catalog__more">
            {isButtonShown &&
            <button
              className="catalog__button"
              type="button"
              onClick={showMore}
            >
              Show more
            </button> }
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Main;
