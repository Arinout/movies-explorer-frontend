import './Login.css';
import { useEffect } from 'react';
import { useFormWithValidation } from '../../hook/useFormValidation';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login({ onLogin, isSubmitting }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return (
    <div className='login'>
      <div className='login__content'>
        <div className='login__heading'>
          <Logo />
          <h2 className='login__heading-text'>Рады видеть!</h2>
        </div>

        <form 
        id='login'
        className='login__form'
        name='login'
        onSubmit={handleSubmit}>

          <label className='login__lable'>
            Email
            <input 
              name='email'
              className='login__input'
              onChange={handleChange}
              value={values.email ?? ''}
              type='email'
              required
              />
            <span className='login__input-error'>
            {errors.email ?? ''}
            </span>
          </label>

          <label className='login__lable'>
            Пароль
            <input 
              name='password'
              className='login__input'
              onChange={handleChange}
              value={values.password ?? ''}
              type='password'
              required
              minLength='6'
              maxLength='30'
            />
            <span className='login__input-error'>
            {errors.password ?? ''}
            </span>
          </label>
          <button 
          className= {
            isValid ? 'login__submit-btn button' : 'login__submit-btn button-inactive'
          } 
          type='submit'
          form='login'
          disabled={!isValid || isSubmitting}>Войти</button>
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