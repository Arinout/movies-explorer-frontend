import './Promo.css';

function Promo({scrollHandlerProject, scrollHandlerTechs, scrollHandlerStudent}) {
  return (
    <section className='promo'>
      <div className='promo__decoration' />
      <div className='promo__content'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='promo__links'>
          <button className='promo__link link' onClick={scrollHandlerProject} >О проекте</button>
          <button className='promo__link link' onClick={scrollHandlerTechs} >Технологии</button>
          <button className='promo__link link' onClick={scrollHandlerStudent}>Студент</button>
        </div>
      </div>
    </section>
  );
}

export default Promo;