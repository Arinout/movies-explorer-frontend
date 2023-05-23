import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DEVICE_SCREEN_SETTINGS } from '../../../utils/constants';
import { useWindowWidth } from '../../../hook/useWindowWidth';

function MoviesCardList ({ filtredMovieList, userMovieList, onMark, onDelete }) {

const { desktop, tablet, phone } = DEVICE_SCREEN_SETTINGS;
  const [cardDisplayOptions, setCardDisplayOptions] = useState(desktop.cards); // OPTIONS: Cards total displayed and number of load more
  const [moviesToDisplay, setMoviesToDisplay] = useState([]); // List of movies displayed based on viewport

  const currentLocation = useLocation();
  const widthSize = useWindowWidth();

  const handleLoadMoreClick = () => {
    const start = moviesToDisplay.length;
    const end = start + cardDisplayOptions.add;
    const add = filtredMovieList.length - start;
    const newMovies = filtredMovieList?.slice(start, end);

    if (add > 0) {
      setMoviesToDisplay([...moviesToDisplay, ...newMovies]);
      setCardDisplayOptions({ ...cardDisplayOptions, total: end });
    }
  };

  useEffect(() => {
    setMoviesToDisplay(
      filtredMovieList?.filter((_, index) => index < cardDisplayOptions.total)
    );
  }, [filtredMovieList, cardDisplayOptions.total]);

  useEffect(() => {
    if (currentLocation.pathname === '/movies') {
      if (widthSize >= desktop.minWidth) setCardDisplayOptions(desktop.cards);
      if (widthSize < desktop.minWidth && widthSize >= tablet.minWidth)
        setCardDisplayOptions(tablet.cards);
      if (widthSize < tablet.minWidth) setCardDisplayOptions(phone.cards);
    }
  }, [widthSize, desktop, tablet, phone, currentLocation.pathname]);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {moviesToDisplay?.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            isMarked={userMovieList}
            onMark={onMark}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {currentLocation.pathname === '/movies' &&
        moviesToDisplay.length < filtredMovieList.length &&
        moviesToDisplay.length >= phone.cards.total && (
          <button
            className='movies-card-list__load-more button'
            onClick={handleLoadMoreClick}
          >
            Ещё
          </button>
      )}
    </section>
  );
};

export default MoviesCardList;