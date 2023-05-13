import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login() {
  return (
    <div className='login'>
      <div className='login__content'>
        <div className='login__heading'>
          <Logo />
          <h2 className='login__heading-text'>Рады видеть!</h2>
        </div>

        <form className='login__form'>

          <label className='login__lable'>
            Email
            <input 
              className='login__input' 
              type='email'
              name='email'
              minLength="6"
              maxLength="30"
              required
              />
            <span className='login__input-error'>

            </span>
          </label>

          <label className='login__lable'>
            Пароль
            <input 
              className='login__input' 
              type='password'
              name='password'
              minLength="8"
              required
            />
            <span className='login__input-error'>
            </span>
          </label>
          <button className='login__submit-btn button' type='submit'>Войти</button>
        </form>
        <p className='login__signin'>
          Еще не зарегистрированы?
          <Link to='/signup' className='login__signin-link link'>
            &nbsp;Регистрация
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;