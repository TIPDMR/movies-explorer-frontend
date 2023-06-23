import React from 'react';
import { NavLink } from "react-router-dom";


const ModalMenuMobile = ({ onCloseClickOverlay, isOpen, onClose }) => {

  return (
    <div
      className={`modal-menu-mobile  ${isOpen ? 'modal-menu-mobile_visible' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={onCloseClickOverlay}
    >
      <button
        type="button"
        className="modal-menu-mobile__button modal-menu-mobile__button_action_close"
        onClick={onClose}
      />
      <div className="modal-menu-mobile__container">
        <nav className="modal-menu-mobile__nav">
          <ul className="modal-menu-mobile__list">
            <li>
              <NavLink className={({ isActive }) => `modal-menu-mobile__link ${isActive ? 'modal-menu-mobile__link_active' : ''}`} to="/">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `modal-menu-mobile__link ${isActive ? 'modal-menu-mobile__link_active' : ''}`} to="/movies">
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `modal-menu-mobile__link ${isActive ? 'modal-menu-mobile__link_active' : ''}`} to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink className="modal-menu-mobile__link modal-menu-mobile__link-profile" to="/profile">
            Аккаунт <i className="modal-menu-mobile__icon-profile"></i>
          </NavLink>
        </nav>

      </div>
    </div>

  );
};

export default ModalMenuMobile;
