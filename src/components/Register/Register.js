import './Register.css';
import { useEffect } from 'react';
import { useFormWithValidation } from '../../hook/useFormValidation';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register({ onRegister, isSubmitting }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className='register'>
      <div className='register__content'>
        <div className='register__heading'>
          <Logo />
          <h2 className='register__heading-text'>Добро пожаловать!</h2>
        </div>

        <form 
        className='register__form'
        id='submit'
        name='register'
        onSubmit={handleSubmit}
        >
        <label className='register__lable'>
          Имя
          <input 
            name='name'
            className='register__input'
            onChange={handleChange}
            value={values.name ?? ''}
            type='text'
            required
            minLength='2'
            maxLength='30'
            />
          <span className='register__input-error'>{errors.name ?? ''}
          </span>
        </label>

          <label className='register__lable'>
            Email
            <input 
              name='email'
              className='register__input'
              onChange={handleChange}
              value={values.email ?? ''}
              type='email'
              required
              />
            <span className='register__input-error'>
            {errors.email ?? ''}
            </span>
          </label>

          <label className='register__lable'>
            Пароль
            <input 
              name='password'
              className='register__input'
              onChange={handleChange}
              value={values.password || ''}
              type='password'
              required
              minLength='6'
              maxLength='30'
            />
            <span className='register__input-error'>
            {errors.password ?? ''}
            </span>
          </label>
          <button 
          className='register__submit-btn button' 
          type='submit'
          form='submit'
          disabled={!isValid || isSubmitting}
          >Зарегистрироваться</button>
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