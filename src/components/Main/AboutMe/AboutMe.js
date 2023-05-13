import './AboutMe.css'
import Photo from '../../../images/Photo.png'
export default function AboutMe({scroll}) {
  return (
    <section className='student' ref={scroll}>
      <h2 className='student__title section-title'>Студент</h2>
      <div className='student__info'>
        <div className='student__info-text'>
          <h3 className='student__info-name'>Антипин Артем</h3>
          <h4 className='student__info-bio'>Фронтенд-разработчик, 24 года</h4>
          <p className='student__info-description'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='student__info-github link'
            href='https://github.com/Arinout'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img
          className='student__info-photo'
          src={Photo}
          alt='Фото студента'
        />
      </div>
    </section>
  );
}