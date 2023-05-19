import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {
  return (
    <div className='register'>
      <div className='register__content'>
        <div className='register__heading'>
          <Logo />
          <h2 className='register__heading-text'>Добро пожаловать!</h2>
        </div>

        <form className='register__form'>
        <label className='register__lable'>
          Имя
          <input 
            className='register__input'
            type='password'
            name='password'
            minLength="2"
            maxLength="30"
            required 
            />
          <span className='register__input-error'>
          </span>
        </label>

          <label className='register__lable'>
            Email
            <input 
              className='register__input' 
              type='email'
              name='email'
              minLength="6"
              maxLength="30"
              required
              />
            <span className='register__input-error'>

            </span>
          </label>

          <label className='register__lable'>
            Пароль
            <input 
              className='register__input' 
              type='password'
              name='password'
              minLength="8"
              required
            />
            <span className='register__input-error'>
              Что-то пошло не так...
            </span>
          </label>
          <button className='register__submit-btn button' type='submit'>Зарегистрироваться</button>
        </form>
        <p className='register__signin'>
          Уже зарегистрированы?
          <Link to='/signin' className='register__signin-link link'>
            &nbsp;Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register;