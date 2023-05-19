import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard () {
  const currentLocation = useLocation();

  return (
    <li className='movies-card'>
      <article className='movies-card__item'>
        <div className='movies-card__description'>
          <div className='movies-card__header'>
            <h2 className='movies-card__title'>33 слова о дизайне</h2>
            <span className='movies-card__duration'>
              1ч 47м
            </span>
          </div>
          {currentLocation.pathname === '/movies' && (
            <button
              className='movies-card__button movies-card__button_type_save'
            ></button>
          )}
          {currentLocation.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_type_delete'
              type='button'
              title='Удалить из сохранённых'
            ></button>
          )}
        </div>
        <div className='movies-card__poster'></div>
      </article>
    </li>
  );
};

export default MoviesCard;