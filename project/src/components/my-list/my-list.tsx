import FilmList from '../film-list/film-list';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction } from '../../store/async-actions';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import { useEffect } from 'react';

function MyList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {favoriteFilms} = useAppSelector((state: State) => state);

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserMenu />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
