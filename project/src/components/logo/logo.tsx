import { Link } from 'react-router-dom';

import { AppRoutes } from '../../constants';

type LogoProps = {
  theme?: 'light';
}

function Logo({theme}: LogoProps): JSX.Element {
  const linkClass = theme === 'light'
    ? 'logo__link logo__link--light'
    : 'logo__link';

  return (
    <div className="logo">
      <Link className={linkClass} to={AppRoutes.Main}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
