function NotFound(): JSX.Element {
  return (
    <div className="page-content" style={{minHeight: '100vh', padding: '10vh'}}>
      <section className="catalog">
        <h2 className="visually-hidden">Not Found</h2>

        <div className="catalog__more">
          <div className="catalog__button">
            <b style={{fontSize: '64px'}}>404</b>
            <p style={{fontSize: '32px'}}>Not Found</p>
            <a href="/" style={{fontSize: '24px', color: '#d9ca74'}}>Start from home page</a>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;
