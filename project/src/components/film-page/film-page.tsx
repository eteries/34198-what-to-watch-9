import { useParams } from 'react-router-dom';

import NotFound from '../not-found/not-found';

import { useAppSelector } from '../../hooks';
import FilmContent from '../film-content/film-content';

function FilmPage(): JSX.Element {
  const {id: idParam} = useParams();
  const {films} = useAppSelector(({CONTENT}) => CONTENT);
  const film = films.find(({id}) => id.toString() === idParam);

  if (film === undefined) {
    return <NotFound />;
  }

  return <FilmContent film={film} />;
}

export default FilmPage;
