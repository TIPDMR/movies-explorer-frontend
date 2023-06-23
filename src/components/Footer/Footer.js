import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (<footer className="footer">
    <p className="footer__project-desc">Учебный проект Яндекс.Практикум х BeatFilm. </p>
    <div className="footer__container">
      <p className="footer__copyright">© 2023</p>
      <ul className="footer__links">
        <li className="footer__item">
          <Link className="footer__link" target="_blank" to="https://practicum.yandex.ru/">Яндекс.Практикум</Link>
        </li>
        <li className="footer__item">
          <Link className="footer__link" target="_blank" to="https://github.com/">Github</Link>
        </li>
      </ul>
    </div>
  </footer>);
};

export default Footer;
