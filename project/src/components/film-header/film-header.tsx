import { Link, useNavigate } from 'react-router-dom';

import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

import { AppRoutes } from '../../constants';
import { Film } from '../../types/film';

type FilmHeaderProps = {
  film: Film;
}

function FilmHeader({film}: FilmHeaderProps): JSX.Element {
  const navigate = useNavigate();
  const onClickPlay = () => navigate(`/player/${ film.id }`);
  const onClickAdd = () => navigate(AppRoutes.MyList);

  return (
    <>
      <div className="film-card__bg">
        <img src={ film.backgroundImage } alt={ film.name }/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo/>

        <UserMenu/>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{ film.name }</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{ film.genre }</span>
            <span className="film-card__year">{ film.released }</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={ onClickPlay }>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list film-card__button" type="button" onClick={ onClickAdd }>
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"/>
              </svg>
              <span>My list</span>
            </button>
            <Link to={ `/films/${ film.id }/review` } className="btn film-card__button">Add review</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmHeader;
