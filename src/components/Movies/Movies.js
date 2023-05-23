import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList'
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useState, useContext, useEffect } from 'react'
import { moviesApi } from '../../utils/MoviesApi';
import {filterShortMovies, filterMoviesSearch, transformMoviesData} from '../../utils/utils';
import SearchNotFound from '../SearchNotFound/SearchNotFound';
import Preloader from '../Preloader/Preloader';
import { ERROR_MESSAGES } from '../../utils/constants';

function Movies({ userMovieList, onMark, onDelete }) {
  const [isLoading, setIsLoading] = useState(false); 
  const [isShortMovies, setIsShortMovies] = useState(false); 
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: '',
  });

  const [movieList, setMovieList] = useState([]); 
  const [filtredMovieList, setFiltredMovieList] = useState([]); 
  const [localMovieList, setLocalMovieList] = useState([]); 

  const currentUser = useContext(CurrentUserContext);

  const handleFilterMoviesSearch = (
    moviesArr,
    searchQuery,
    isShortMoviesCheckbox
  ) => {
    const moviesToRender = filterMoviesSearch(
      moviesArr,
      searchQuery,
      isShortMoviesCheckbox
    );

    if (moviesToRender.length === 0)
      setIsErrorMessage({ isShown: true, message: ERROR_MESSAGES.NOT_FOUND });
    setLocalMovieList(moviesToRender);
    setFiltredMovieList(
      isShortMoviesCheckbox ? filterShortMovies(moviesToRender) : moviesToRender
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesToRender)
    );
  };

  const handleSearchSubmit = (inputValue) => {
    setIsErrorMessage({ isShown: false, ErrorMessage: '' });
    localStorage.setItem(`${currentUser.email} - isShortMovies`, isShortMovies);
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);

    if (movieList.length === 0 && !isShortMovies) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovieList(movies);
          localStorage.setItem(
            `${currentUser.email} - initialMovies`,
            JSON.stringify(movies)
          );
          handleFilterMoviesSearch(
            transformMoviesData(movies),
            inputValue,
            isShortMovies
          );
        })
        .catch(() =>
          setIsErrorMessage({
            isShown: true,
            message: ERROR_MESSAGES.NOT_AVAILABLE,
          })
        )
        .finally(() => setIsLoading(false));
    } else {
      handleFilterMoviesSearch(movieList, inputValue, isShortMovies);
    }
  };

  const handleShortMoviesCheckbox = () => {
    setIsShortMovies(!isShortMovies);
    !isShortMovies
      ? setFiltredMovieList(filterShortMovies(localMovieList))
      : setFiltredMovieList(localMovieList);
    localStorage.setItem(
      `${currentUser.email} - isShortMovies`,
      !isShortMovies
    );
  };

  useEffect(() => {
    const initialMovies = JSON.parse(
      localStorage.getItem(`${currentUser.email} - initialMovies`)
    );
    if (initialMovies) setMovieList(initialMovies);
  }, []);

  useEffect(() => {
    localStorage.getItem(`${currentUser.email} - isShortMovies`) === 'true'
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setLocalMovieList(movies);
      localStorage.getItem(`${currentUser.email} - isShortMovies`) === 'true'
        ? setFiltredMovieList(filterShortMovies(movies))
        : setFiltredMovieList(movies);
    }
  }, [currentUser, userMovieList]);

  return (
    <main className='movies'>
      <SearchForm 
      isShortMovies={isShortMovies}
      onSearch={handleSearchSubmit}
      onFilterCheckbox={handleShortMoviesCheckbox}
      setIsErrorMessage={setIsErrorMessage}
      />
      {isLoading ? (
        <Preloader />
      ) : !isErrorMessage.isShown ? (
        <MoviesCardList
          filtredMovieList={filtredMovieList}
          userMovieList={userMovieList}
          onMark={onMark}
          onDelete={onDelete}
        />
      ) : (
        <SearchNotFound message={isErrorMessage.message}/>
      )}
    </main>
  );
}

export default Movies;