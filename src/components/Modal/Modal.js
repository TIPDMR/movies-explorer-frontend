import React from 'react';

const Modal = ({ children, onCloseClickOverlay, isOpen }) => {
  return (
    <div
      className={`modal  ${isOpen ? 'modal_visible' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={onCloseClickOverlay}
    >
      {children}
    </div>
  );
};

export default Modal;
