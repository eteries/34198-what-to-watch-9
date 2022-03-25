import { useAppSelector } from '../../hooks';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import { Link } from 'react-router-dom';

function UserMenu(): JSX.Element {
  const {authorizationStatus, user} = useAppSelector((state) => state);

  const loggedInTemplate = (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link">Sign out</a>
      </li>
    </ul>
  );

  const loggedOutTemplate = (
    <div className="user-block">
      <Link to={AppRoutes.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );

  return authorizationStatus === AuthorizationStatus.Auth
    ? loggedInTemplate
    : loggedOutTemplate;
}

export default UserMenu;
