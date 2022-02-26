import Main from '../main/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../not-found/not-found';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import Login from '../login/login';
import MyList from '../my-list/my-list';
import FilmPage from '../film-page/film-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import { Film } from '../../types/film';
import { Review } from '../../types/review';

type AppProps = {
  films: Film[],
  reviews: Review[]
}

function App({films, reviews}: AppProps): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.SignIn} element={<Login />} />
        <Route path={AppRoutes.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoutes.AddReview} element={<AddReview />} />
        <Route path={AppRoutes.Film} element={<FilmPage />} />
        <Route path={AppRoutes.Player} element={<Player />} />
        <Route path={AppRoutes.Main} element={<Main name={films[0].name} genre={films[0].genre} released={films[0].released} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
