import React from 'react'
import { useLocation } from 'react-router-dom'
import './SearchNotFound.css'

export default function SearchNotFound() {
  const location = useLocation()
  return (
    <div className={location.pathname === '/saved-movies' ? 'notFoundSearch__notFound-saved' : 'notFoundSearch__notFound-movies'}>
        <p className='notFoundSearch__notFound-text'>Ничего не найдено</p>
    </div>
  )
}