import { useContext, useEffect } from 'react'
import { useFormWithValidation } from '../../hook/useFormValidation';
import { useLocation } from 'react-router-dom'
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { ERROR_MESSAGES } from '../../utils/constants';

function SearchForm ({ isShortMovies, onSearch, onFilterCheckbox, setIsErrorMessage}) {

  const currentUser = useContext(CurrentUserContext);
  const currentLocation = useLocation();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  useEffect(() => {
    if (
      currentLocation.pathname === '/movies' &&
      localStorage.getItem(`${currentUser.email} - movieSearch`)
    ) {
      values.search = localStorage.getItem(
        `${currentUser.email} - movieSearch`
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentLocation.pathname === '/movies' && !values.search)
      setIsErrorMessage({
        isShown: true,
        message: ERROR_MESSAGES.EMPTY_INPUT,
      });
  }, [values, currentUser.email, currentLocation.pathname]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values.search);
  };

  
  return (
    <section className='search'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name='search'
          onSubmit={handleSubmit}
        >
          <input
            className='search__input'
            name='search'
            type='text'
            placeholder='Фильм'
            autoComplete='off'
            value={values.search || ''}
            onChange={handleChange}
            required
          />
          <span className='search__error'>{errors.search ?? ''}</span>
          <button
            className='search__button'
            type='submit'
            disabled={!isValid}
          ></button>
        </form>
        <FilterCheckbox
          isShortMovies={isShortMovies}
          onFilterCheckbox={onFilterCheckbox}
        />
      </div>
    </section>
  );
};

export default SearchForm;