import { useEffect } from 'react';

import GenreList from '../genre-list/genre-list';
import Logo from '../logo/logo';
import FilmList from '../film-list/film-list';
import FilmPromo from '../film-promo/film-promo';
import Footer from '../footer/footer';
import Loading from '../loading/loading';
import UserMenu from '../user-menu/user-menu';

import { ALL_GENRES, Setting } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UseShowMore from '../../hooks/use-show-more/use-show-more';
import { filterFilms } from '../../store/content-management/content-management';
import { fetchPromoFilmAction } from '../../store/async-actions';
import { mapToUniqueKeys } from '../../utils';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const {films, promoFilm, filteredFilms} = useAppSelector(({CONTENT}) => CONTENT);
  const {isLoading} = useAppSelector(({APP}) => APP);
  const genres = mapToUniqueKeys(films, 'genre', ALL_GENRES).slice(0, Setting.GenresMaxLength);
  const [visibleFilms, isButtonShown, showMore] = UseShowMore(filteredFilms, Setting.FilmListChunk);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  },[]);

  if (isLoading) {
    return <Loading position="screen" />;
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
