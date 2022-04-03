import { Navigate } from 'react-router-dom';

import Loading from '../loading/loading';

import { AppRoutes, AuthorizationStatus } from '../../constants';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  switch (authorizationStatus) {
    case AuthorizationStatus.Auth:
      return children;
    case AuthorizationStatus.Unknown:
      return (
        <div style={{ backgroundColor: '#180202', minHeight: '100vh'}}>
          <Loading />
        </div>
      );
    case AuthorizationStatus.NoAuth:
      return <Navigate to={ AppRoutes.SignIn } />;
  }
}

export default PrivateRoute;
