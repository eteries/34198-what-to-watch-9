import { Link } from 'react-router-dom';

import './not-found.css';

import Footer from '../footer/footer';

function NotFound(): JSX.Element {
  return (
    <div className="page-content" style={{minHeight: '100vh', padding: '10vh'}}>
      <section className="catalog">
        <h2 className="visually-hidden">Not Found</h2>

        <div className="catalog__more">
          <div className="catalog__button">
            <b className="not-found-title">404</b>
            <p className="not-found-text">Not Found</p>
            <Link to="/" className="not-found-link">Start from home page</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFound;
