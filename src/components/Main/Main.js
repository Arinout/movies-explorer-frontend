import React, {useRef} from 'react'
import './Main.css';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject'
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {
  const refScrollProject = useRef();
  const scrollHandlerProject = () => {
    refScrollProject.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const refScrollTechs = useRef();
  const scrollHandlerTechs = () => {
    refScrollTechs.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const refScrollStudent = useRef();
  const scrollHandlerStudent = () => {
    refScrollStudent.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <main className='main'>
      <Promo scrollHandlerProject={scrollHandlerProject} scrollHandlerTechs={scrollHandlerTechs} scrollHandlerStudent={scrollHandlerStudent}/>
      <AboutProject scroll={refScrollProject} />
      <Techs scroll={refScrollTechs}/>
      <AboutMe scroll={refScrollStudent}/>
      <Portfolio />
    </main>
  );
}

export default Main;