
import { useState, useEffect } from 'react'
import { Redirect, Route, Routes, useNavigate, Navigate, useLocation} from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Page from '../Page/Page';
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userMovieList, setUserMovieList] = useState([]); 
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate('/movies');
        })
        .catch((err) => console.error(`Токен не соответствует: (${err})`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn)
      mainApi
        .getUserData()
        .then((user) => setCurrentUser(user))
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser)
      mainApi
        .getUserMovies()
        .then((movies) => {
          setUserMovieList(
            movies.filter((movie) => movie.owner === currentUser._id)
          );
        })
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
  }, [isLoggedIn, currentUser, updatedUserMovieList]);



  const handleMarkMovie = (movie) => {
    const isSavedMovie = userMovieList.some(
      (userMovie) => userMovie.movieId === movie.movieId
    );

    isSavedMovie
      ? handleDeleteMovie(movie)
      : mainApi
          .addMovie(movie)
          .then((newMovie) => setUserMovieList([...userMovieList, newMovie]))
          .catch((err) => console.log(err));
  };
  const handleDeleteMovie = (movie) => {
    const savedUserMovie = userMovieList.find(
      (userMovie) =>
        userMovie.movieId === movie.id || userMovie.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedUserMovie._id)
      .then(() => {
        const newUserMovieList = userMovieList.filter(
          (userMovie) => userMovie.movieId !== movie.movieId
        );

        setUserMovieList(newUserMovieList);
        setUpdatedUserMovieList(userMovieList);
        localStorage.setItem(
          `${currentUser.email} - userMovies`,
          JSON.stringify(newUserMovieList)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleRegisterSubmit = async ({ name, email, password }) => {
    setIsSubmitting(true);
    await mainApi
      .register(name, email, password)
      .then((userData) => {
        if (userData.email) {
          handleLoginSubmit({ email, password });
        }
      })
      .catch((err) => {
        console.error(`Некорректно заполнено одно из полей: (${err})`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleLoginSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    await mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.error(`Пользователь с таким email не найден : (${err})`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSignOut = () =>
    mainApi
      .logout()
      .then(() => {
        localStorage.clear();
        setCurrentUser({});
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((err) => {
      });

  const handleProfileEdit = async ({ name, email }) => {
    setIsSubmitting(true);
    await mainApi
      .patchUser(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(`'Что-то пошло не так! Попробуйте ещё раз.' ${err}`);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    
      <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/'>
            <Route element={<Page isLoggedIn={isLoggedIn}/>}>
              <Route index element={<Main />} />
              <Route path='movies' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies 
                  userMovieList={userMovieList}
                  onMark={handleMarkMovie}
                  onDelete={handleDeleteMovie}
                  />
                </ProtectedRoute>
                } 
              />
              <Route path='saved-movies' 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies 
                  userMovieList={userMovieList}
                  onDelete={handleDeleteMovie}
                  />
                </ProtectedRoute>  
                } 
              />
              <Route path='profile' 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onSignOut={handleSignOut}
                    onSubmit={handleProfileEdit}
                    isSubmitting={isSubmitting}
                  />
                </ProtectedRoute>
                }
              />
            </Route>
            <Route path='signup' 
            element={<Register 
              onRegister={handleRegisterSubmit}
              isSubmitting={isSubmitting}
            />} />
            <Route path='signin' 
            element={<Login 
              onLogin={handleLoginSubmit}
              isSubmitting={isSubmitting}
            />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </CurrentUserContext.Provider>
      </div>
    
  );
}

export default App;
