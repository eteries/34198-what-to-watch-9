import { Link } from 'react-router-dom';

import Footer from '../footer/footer';

function NotFound(): JSX.Element {
  return (
    <div className="page-content" style={{minHeight: '100vh', padding: '10vh'}}>
      <section className="catalog">
        <h2 className="visually-hidden">Not Found</h2>

        <div className="catalog__more">
          <div className="catalog__button">
            <b style={{fontSize: '64px'}}>404</b>
            <p style={{fontSize: '32px'}}>Not Found</p>
            <Link to="/" style={{fontSize: '24px', color: '#d9ca74'}}>Start from home page</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFound;
