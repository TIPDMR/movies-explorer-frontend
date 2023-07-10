import React from 'react';
import HeadingLevel2 from "../../HeadingLevel/HeadingLevel2/HeadingLevel2";
import HeadingLevel3 from "../../HeadingLevel/HeadingLevel3/HeadingLevel3";
import HeadingLevel4 from "../../HeadingLevel/HeadingLevel4/HeadingLevel4";
import photo from "../../../images/photo.jpg";

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <HeadingLevel2 name="Студент"/>
      <article className="about-me__article">
        <div className="about-me__container">
          <HeadingLevel3 name="Дмитрий" className="about-me__heading-level-3"/>
          <HeadingLevel4 name="Фронтенд-разработчик, 35 лет" className="about-me__heading-level-4"/>
          <p className="about-me__text">Разработкой веб-приложений занимаюсь с 2012 года, когда вместе с друзьями открыли первый приватный игровой сервер и нам потребовался сайт. С
            тех пор я развивался в различных областях программирования. Писал скрипты на Python для обработки данных, настраивал серверы для защиты от DDoS атак и искал решения для
            разных задач, которые возникали в процессе работы. Однако, больше всего меня привлекало создание сайтов и панелей управления. Работал в серой нише, создавая панели на
            Yii2. Недавно принял решение выбрать профессию веб-разработчика в качестве основного направления для своего личного развития. Успешно завершил онлайн-курс
            "Web-разработчик" в Яндекс.Практикуме, где получил множество новых знаний и познакомился с JavaScript библиотекой React. Планирую продолжать свое развитие в этом
            направлении.
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
