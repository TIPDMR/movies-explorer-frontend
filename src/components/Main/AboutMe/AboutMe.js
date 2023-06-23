import React from 'react';
import HeadingLevel2 from "../../HeadingLevel/HeadingLevel2/HeadingLevel2";
import HeadingLevel3 from "../../HeadingLevel/HeadingLevel3/HeadingLevel3";
import HeadingLevel4 from "../../HeadingLevel/HeadingLevel4/HeadingLevel4";
import photo from "../../../images/photo.svg";

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <HeadingLevel2 name="Студент"/>
      <article className="about-me__article">
        <div className="about-me__container">
          <HeadingLevel3 name="Виталий" className="about-me__heading-level-3"/>
          <HeadingLevel4 name="Фронтенд-разработчик, 35 лет" className="about-me__heading-level-4"/>
          <p className="about-me__text">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
            У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
            музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс
            по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <div className="about-me__links">
            <a className="about-me__link" href="https://github.com/TIPDMR">Github</a>
          </div>
        </div>
        <img className="about-me__photo" src={photo} alt="Моё фото"></img>
      </article>
    </section>
  );
};

export default AboutMe;
