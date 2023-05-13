import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';


function HeaderLogIn ({ isModalOpen, onClickModal }) {
  return (
    <>
        <nav
          className={`navigation navigation_state_${
            isModalOpen ? 'open' : 'close'
          }`}
        >
          <ul
            className={`navigation__list navigation__list_logged navigation__list_state_${
              isModalOpen ? 'open' : 'close'
            }`}
          >
            {isModalOpen && (
              <li className='navigation__item'>
                <NavLink
                  className={({ isActive }) =>
                    !isActive 
                      ? 'navigation__link navigation__link_active link'
                      : 'navigation__link link'
                  }
                  to='/'
                >
                  Главная
                </NavLink>
              </li>
            )}
            <li className='navigation__item'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link_active link'
                    : 'navigation__link link'
                }
                to='/movies'
              >
                Фильмы
              </NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link_active link'
                    : 'navigation__link link'
                }
                to='/saved-movies'
              >
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link link navigation__link_type_account navigation__link_active'
                    : 'navigation__link link navigation__link_type_account'
                }
                to='/profile'
              >
              </NavLink>
            </li>
          </ul>
          <button
            type='button'
            className={`${
              isModalOpen
                ? 'navigation__accordion-button navigation__accordion-button_close button'
                : 'navigation__accordion-button button'
            }`}
            onClick={onClickModal}
          ></button>
        </nav>
    </>
  )
}
export default HeaderLogIn;