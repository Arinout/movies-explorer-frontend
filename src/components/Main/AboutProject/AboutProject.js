import './AboutProject.css';

function AboutProject({scroll}) {
  return (
    <section className='about-project' ref={scroll}>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__main'>
        <div className='about-project__main-wrap'>
          <h3 className='about-project__main-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__main-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__main-wrap'>
          <h3 className='about-project__main-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__main-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div> 
      <div className='about-project__timeline'>
        <div className='about-project__timeline-wrap'>
          <div className='about-project__backend-weeks about-project__timeline-item'>1 неделя</div>
          <div className='about-project__backend about-project__timeline-item'>Back-end</div>
        </div>
        <div className='about-project__timeline-wrap'>
          <div className='about-project__frontend-weeks about-project__timeline-item'>4 недели</div>
          <div className='about-project__frontend about-project__timeline-item'>Front-end</div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;