import { Link } from 'react-router-dom';

import Logo from '../logo/logo';

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

      <footer className="page-footer">
        <Logo theme="light" />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;
