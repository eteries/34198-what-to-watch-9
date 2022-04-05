import { useNavigate } from 'react-router-dom';

import { ApiCommand, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/async-actions';
import { State } from '../../types/state';

type FilmActionsType = {
  id: number;
  isFavorite: boolean;
}

function FilmActions({id, isFavorite}: FilmActionsType): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector(({USER}: State) => USER);
  const {isLoading} = useAppSelector(({APP}: State) => APP);

  const onClickPlay = () => navigate(`/player/${id}`);
  const onClickToggle = () => dispatch(changeFavoriteStatusAction({
    filmId: id,
    status: isFavorite ? ApiCommand.Remove : ApiCommand.Add,
  }));

  return (
    <>
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={ onClickPlay }
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      {authorizationStatus === AuthorizationStatus.Auth && (
        <button
          className="btn btn--list film-card__button"
          type="button"
          disabled={isLoading}
          onClick={ onClickToggle }
        >
          {!isFavorite && (
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"/>
            </svg>
          )}
          {
            isFavorite && (
              <svg viewBox="0 0 18 14" width="18" height="14">
                <use xlinkHref="#in-list" />
              </svg>
            )
          }
          <span>My list</span>
        </button>
      )}
    </>
  );
}

export default FilmActions;
