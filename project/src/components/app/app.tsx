import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddReview from '../add-review/add-review';
import FilmPage from '../film-page/film-page';
import Login from '../login/login';
import Main from '../main/main';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';

import { AppRoutes, AuthorizationStatus } from '../../constants';
import { Film } from '../../types/film';

type AppProps = {
  films: Film[]
}

function App({films}: AppProps): JSX.Element {
  const favorites = films.filter(({isFavorite}) => isFavorite);

  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.SignIn} element={<Login />} />
        <Route path={AppRoutes.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <MyList favorites={favorites}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoutes.AddReview} element={<AddReview />} />
        <Route path={AppRoutes.Film} element={<FilmPage />} />
        <Route path={AppRoutes.Player} element={<Player />} />
        <Route path={AppRoutes.Main} element={<Main films={films} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
