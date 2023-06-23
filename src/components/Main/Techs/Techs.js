import React from 'react';
import HeadingLevel2 from "../../HeadingLevel/HeadingLevel2/HeadingLevel2";
import HeadingLevel3 from "../../HeadingLevel/HeadingLevel3/HeadingLevel3";


const Techs = () => {
  return (<section id="techs" className="techs">
    <HeadingLevel2 name="Технологии"/>
    <HeadingLevel3 name="7 технологий" className="techs__heading-level-3"/>
    <p className="techs__desc">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
      проекте.</p>
    <ul className="techs__icons">
      <li className="techs__icon">HTML</li>
      <li className="techs__icon">CSS</li>
      <li className="techs__icon">JS</li>
      <li className="techs__icon">React</li>
      <li className="techs__icon">Git</li>
      <li className="techs__icon">Express.js</li>
      <li className="techs__icon">mongoDB</li>
    </ul>
  </section>);
};

export default Techs;
