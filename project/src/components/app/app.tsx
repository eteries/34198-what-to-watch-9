import { Routes, Route } from 'react-router-dom';

import AddReview from '../add-review/add-review';
import FilmPage from '../film-page/film-page';
import Router from '../history-router/history-router'
import Loading from '../loading/loading';
import Login from '../login/login';
import Main from '../main/main';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import PlayerPage from '../player-page/player-page';
import PrivateRoute from '../private-route/private-route';

import { AppRoutes, AuthorizationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../services/browser-history';

function App(): JSX.Element {
  const {films, authorizationStatus} = useAppSelector((state) => state);
  const favorites = films.filter(({isFavorite}) => isFavorite);

  const {isDataLoaded} = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <div style={{ backgroundColor: '#180202', minHeight: '100vh'}}>
        <Loading />
      </div>
    );
  }

  return (
    <Router history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.SignIn} element={<Login />} />
        <Route path={AppRoutes.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList favorites={favorites}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoutes.AddReview} element={<AddReview />} />
        <Route path={AppRoutes.Film} element={<FilmPage />} />
        <Route path={AppRoutes.Player} element={<PlayerPage />} />
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
