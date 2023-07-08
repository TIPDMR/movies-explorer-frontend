import React from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import AboutProjectArticle from "../AboutProjectArticle/AboutProjectArticle";
import HeadingLevel2 from "../../HeadingLevel/HeadingLevel2/HeadingLevel2";

const aboutProjectPost = [
  {
    name: "Дипломный проект включал 5 этапов",
    desc: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
  },
  {
    name: "На выполнение диплома ушло 5 недель",
    desc: "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
  },
];
const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <HeadingLevel2 name="О проекте"/>
      <AboutProjectArticle aboutProjectPost={aboutProjectPost}/>
      <ProgressBar/>
    </section>
  );
};

export default AboutProject;
