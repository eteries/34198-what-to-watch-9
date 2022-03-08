import { Link, useParams } from 'react-router-dom';

import Logo from '../logo/logo';
import NotFound from '../not-found/not-found';
import ReviewForm from '../review-form/review-form';
import UserMenu from '../user-menu/user-menu';

import { FILMS } from '../../mocks/films';

function AddReview(): JSX.Element {
  const {id: idParam} = useParams();
  const film = FILMS.find(({id}) => id.toString() === idParam);

  if (film === undefined) {
    return <NotFound />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserMenu />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
}

export default AddReview;
