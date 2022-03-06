import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '../../constants';

type FilmActionsType = {
  id: number
}

function FilmActions({id}: FilmActionsType): JSX.Element {
  const navigate = useNavigate();
  const onClickPlay = () => navigate(`/player/${id}`);
  const onClickAdd = () => navigate(AppRoutes.MyList);
  return (
    <>
      <button className="btn btn--play film-card__button" type="button" onClick={ onClickPlay }>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={ onClickAdd }>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
    </>
  );
}

export default FilmActions;
