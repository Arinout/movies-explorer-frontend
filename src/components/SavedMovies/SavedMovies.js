import { useState, useContext, useEffect } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchNotFound from '../SearchNotFound/SearchNotFound';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import { filterMoviesSearch, filterShortMovies } from '../../utils/utils';
import { ERROR_MESSAGES } from '../../utils/constants';

import './SavedMovies.css';

function SavedMovies ({ userMovieList, onDelete }) {
  const [isLoading, setIsLoading] = useState(false); 
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: '',
  });

  const [localMovieList, setLocalMovieList] = useState(userMovieList); 
  const [filtredMovieList, setFiltredMovieList] = useState(localMovieList); 

  const currentUser = useContext(CurrentUserContext);

  const handleSearchSubmit = (inputValue) => {
    setIsErrorMessage({ isShown: false, message: '' });
    setIsLoading(true);

    const moviesToRender = filterMoviesSearch(
      userMovieList,
      inputValue,
      isShortMovies
    );

    if (moviesToRender.length === 0) {
      setIsErrorMessage({ isShown: true, message: ERROR_MESSAGES.NOT_FOUND });
    } else {
      setIsErrorMessage({ isShown: false, ErrorMessage: '' });
      setFiltredMovieList(moviesToRender);
      setLocalMovieList(moviesToRender);
    }
    setIsLoading(false);
  };

  const handleShortMoviesCheckbox = () => {
    if (!isShortMovies) {
      setIsShortMovies(true);
      setLocalMovieList(filterShortMovies(filtredMovieList));
      filterShortMovies(filtredMovieList).length === 0
        ? setIsErrorMessage({
            isShown: true,
            message: ERROR_MESSAGES.NOT_FOUND,
          })
        : setIsErrorMessage({
            isShown: false,
            message: '',
          });
      localStorage.setItem(
        `${currentUser.email} - isShortBookmarkedMovies`,
        true
      );
    } else {
      setIsShortMovies(false);
      setLocalMovieList(filtredMovieList);
      filtredMovieList.length === 0
        ? setIsErrorMessage({
            isShown: true,
            message: ERROR_MESSAGES.NOT_FOUND,
          })
        : setIsErrorMessage({
            isShown: false,
            message: '',
          });
      localStorage.setItem(
        `${currentUser.email} - isShortBookmarkedMovies`,
        false
      );
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - isShortBookmarkedMovies`) ===
      'true'
    ) {
      setIsShortMovies(true);
      setLocalMovieList(filterShortMovies(userMovieList));
    } else {
      setIsShortMovies(false);
      setLocalMovieList(userMovieList);
    }
  }, [currentUser, userMovieList]);

  useEffect(() => {
    setFiltredMovieList(userMovieList);
    userMovieList.length === 0
      ? setIsErrorMessage({
          isShown: true,
          message: ERROR_MESSAGES.NOT_FOUND,
        })
      : setIsErrorMessage({
          isShown: false,
          message: '',
        });
  }, [userMovieList]);
  return (
    <main className='movies'>
      <SearchForm
      isShortMovies={isShortMovies}
      onSearch={handleSearchSubmit}
      onFilterCheckbox={handleShortMoviesCheckbox}
      />
    {isLoading ? (
      <Preloader />
    ) : !isErrorMessage.isShown ? (
      <MoviesCardList
        filtredMovieList={filtredMovieList}
        userMovieList={userMovieList}
        onDelete={onDelete}
      />
    ) : (
      <SearchNotFound message={isErrorMessage.message} />
    )}
    </main>
  );
};

export default SavedMovies;