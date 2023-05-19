

import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies () {

  return (
    <main className='movies'>
      <SearchForm/>
      <MoviesCardList/>
    </main>
  );
};

export default SavedMovies;