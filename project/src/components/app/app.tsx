import { Routes, Route } from 'react-router-dom';

import AddReview from '../add-review/add-review';
import FilmPage from '../film-page/film-page';
import Router from '../history-router/history-router';
import Login from '../login/login';
import Main from '../main/main';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import PlayerPage from '../player-page/player-page';
import PrivateRoute from '../private-route/private-route';

import { AppRoutes } from '../../constants';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../services/browser-history';

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    <Router history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.SignIn} element={<Login />} />
        <Route path={AppRoutes.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoutes.AddReview} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <AddReview />
          </PrivateRoute>
        } />
        <Route path={AppRoutes.Film} element={<FilmPage />} />
        <Route path={AppRoutes.Player} element={<PlayerPage />} />
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
