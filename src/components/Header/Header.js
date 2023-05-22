import './Header.css';
import Logo from '../Logo/Logo';
import { Link, useLocation} from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import {useState} from 'react';

function Header({ isLoggedIn }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalBtnClick = () => setIsModalOpen(!isModalOpen);
  let { pathname } = useLocation();

  const logOutHeader = (
    <>
      <div className='header__auth'>
        <Link to='/signup' className='header__button header__button_signup'>Регистрация</Link>
        <Link to='/signin' className='header__button header__button_signin'>Войти</Link>
      </div>
    </>
  );
  
const logInHeader = (
    <>
      <div className='header__navigation'>
        <Navigation 
        isModalOpen={isModalOpen}
        onClickModal={handleModalBtnClick}
        />
      </div>
    </>
);

  return(
    <header className={ pathname ==='/' ? 'header' : 'header header-color' }>
      <div className='header__content'>
        <Logo />
        {
          isLoggedIn ? logInHeader: logOutHeader 
        }
      </div>
    </header>
  );
}

export default Header;