import Main from '../main/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../not-found/not-found';
import { AppRoutes } from '../../constants';
import Login from '../login/login';
import MyList from '../my-list/my-list';
import FilmPage from '../film-page/film-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';

type AppProps = {
  film: {
    name: string,
    genre: string,
    released: number
  }
}

function App({film}: AppProps): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.SignIn} element={<Login />} />
        <Route path={AppRoutes.MyList} element={<MyList />} />
        <Route path={AppRoutes.AddReview} element={<AddReview />} />
        <Route path={AppRoutes.Film} element={<FilmPage />} />
        <Route path={AppRoutes.Player} element={<Player />} />
        <Route path={AppRoutes.Main} element={<Main name={film.name} genre={film.genre} released={film.released} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
