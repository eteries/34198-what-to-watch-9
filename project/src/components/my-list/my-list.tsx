import FilmList from '../film-list/film-list';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction } from '../../store/async-actions';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import { useEffect } from 'react';
import { AppRoutes } from '../../constants';
import { Link } from 'react-router-dom';

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

        {favoriteFilms.length > 0 && <FilmList films={favoriteFilms} />}
        {favoriteFilms.length === 0 && (
          <p style={{textAlign: 'center'}}>
            Add your favorite films from <Link style={{color: 'inherit'}} to={AppRoutes.Main}>the catalog</Link> to watch them lately.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
