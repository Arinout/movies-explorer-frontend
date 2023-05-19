import './Profile.css';
import {useState} from 'react';

function Profile () {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
    }
  return (
    <main className='profile'>
      <h1 className='profile__title'>{'Привет, Виталий!'}</h1>
      <form
        id='submit'
        className='profile__form'
        name='profile'
      >
        <div className='profile__labels-container'>
          <label className='profile__label'>
            <span className='profile__label-text'>Имя</span>
            <input
              className='profile__input'
              name='name'
              type='text'
              value={name || ''}
              required
              minLength='2'
              maxLength='30'
              onChange={handleChangeName}
            />
          </label>
          <span className='profile__input-error profile__input-error_name'>
          </span>
          <label className='profile__label'>
            <span className='profile__label-text'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='email'
              value= {email || ''}
              onChange={handleChangeEmail}
              required
            />
          </label>
          <span className='profile__input-error profile__input-error_email'>
          </span>
        </div>
      </form>
      <div className='profile__buttons-container'>
        <button
          form='submit'
          type='submit'
          className='profile__button-edit button'
        >
          Редактировать
        </button>
        <button
          type='button'
          className='profile__button-exit button'
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
};

export default Profile;