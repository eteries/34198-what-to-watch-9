import FilmList from '../film-list/film-list';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

import { Film } from '../../types/film';

type MyListProps = {
  favorites: Film[]
}

function MyList({favorites}: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserMenu />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favorites} />
      </section>

      <footer className="page-footer">
        <Logo theme="light" />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
