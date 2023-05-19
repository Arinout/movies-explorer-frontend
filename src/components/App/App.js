import './App.css';
import { Redirect, Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Page from '../Page/Page';
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    
      <div className='App'>
        <Routes>
          <Route path='/'>
            <Route element={<Page />}>
              <Route index element={<Main />} />
              <Route path='movies' element={<Movies />} />
              <Route path='saved-movies' element={<SavedMovies />} />
              <Route path='profile' element={<Profile />}/>
            </Route>
            <Route path='signup' element={<Register />} />
            <Route path='signin' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    
  );
}

export default App;
