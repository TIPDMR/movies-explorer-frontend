import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {

  const NavigationLogin = () => {
    return (
      <nav className="navigation">
        <ul className="navigation__unauthorized-list">
          <li>
            <NavLink className="navigation__link" to="/signup">
              Регистрация
            </NavLink>
          </li>
          <li>
            <NavLink className="navigation__link navigation__link_signin" to="/signin">
              Войти
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

  const NavigationMoviesAndAccount = () => {
    return (
      <nav className="navigation navigation_movies">
        <ul className="navigation__movies-list">
          <li>
            <NavLink className={({ isActive }) => `navigation__link navigation__link_movies ${isActive ? 'navigation__link_movies-active' : ''}`} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `navigation__link navigation__link_movies ${isActive ? 'navigation__link_movies-active' : ''}`}
              to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink className="navigation__link navigation__link-profile" to="/profile">
          Аккаунт <i className="navigation__icon-profile"></i>
        </NavLink>
      </nav>
    );
  };

  return (
    <>
      {isLoggedIn ? NavigationMoviesAndAccount() : NavigationLogin()}
    </>
  );
};


export default Navigation;
