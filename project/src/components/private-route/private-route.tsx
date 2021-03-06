import { Navigate } from 'react-router-dom';

import Loading from '../loading/loading';

import { AppRoute, AuthorizationStatus } from '../../constants';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  switch (authorizationStatus) {
    case AuthorizationStatus.Auth:
      return children;
    case AuthorizationStatus.Unknown:
      return <Loading position="screen" />;
    case AuthorizationStatus.NoAuth:
      return <Navigate to={ AppRoute.SignIn } />;
  }
}

export default PrivateRoute;
