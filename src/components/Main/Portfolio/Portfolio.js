import React from 'react';
import { Link } from "react-router-dom";
import HeadingLevel5 from "../../HeadingLevel/HeadingLevel5/HeadingLevel5";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <HeadingLevel5 name="Портфолио" className="portfolio__title"/>
      <ul className="portfolio__projects">
        <li className="portfolio__projects-item">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/TIPDMR/russian-travel">
            Статичный сайт <i className="portfolio__icon-arrow"></i>
          </Link></li>
        <li className="portfolio__projects-item">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/TIPDMR/mesto-react">
            Адаптивный сайт <i className="portfolio__icon-arrow"></i>
          </Link></li>
        <li className="portfolio__projects-item">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/yandex-praktikum/react-mesto-api-full-gha">
            Одностраничное приложение <i className="portfolio__icon-arrow"></i></Link>
        </li>
      </ul>
    </section>

  );
};

export default Portfolio;
