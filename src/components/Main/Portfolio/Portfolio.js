import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h4 className='portfolio__title'>Портфолио</h4>
        <nav className='portfolio__navigation'>
          <ul className='portfolio__navigation-list'>
            <li className='portfolio__navigation-list-item'>
              <a
                className='portfolio__links-item link'
                href='https://arinout.github.io/how-to-learn/'
                target='_blank' rel='noreferrer'
              >
                <p className='portfolio__navigation-list-item-text'>
                  Статичный сайт
                </p>
                <div className='portfolio__arrow'></div>
              </a>
            </li>
            <li className='portfolio__navigation-list-item'>
              <a
                className='portfolio__links-item link'
                href='https://arinout.github.io/russian-travel/index.html'
                target='_blank' rel="noreferrer"
              >
                <p className='portfolio__navigation-list-item-text'>
                  Адаптивный сайт
                </p>
                <div className='portfolio__arrow'></div>
              </a>
            </li>
            <li className='portfolio__navigation-list-item'>
              <a
                className='portfolio__links-item link'
                href='https://arinout.github.io/react-mesto-auth/'
                target='_blank'
              >
                <p className='portfolio__navigation-list-item-text'>
                  Одностраничное приложение
                </p>
                <div className='portfolio__arrow'></div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}