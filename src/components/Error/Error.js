import React from 'react';
import { useNavigate } from "react-router-dom";

const Error = ({ code = "404", text = "Страница не найдена", isLoggedIn }) => {

  const navigate = useNavigate();

  const goBack = () => {
    isLoggedIn ? navigate(-3) : navigate(-1);
  };

  return (
    <main className="error">
      <header className="error__header">
        <h1 className="error__title">{code}</h1>
        <p className="error__text">{text}</p>
      </header>
      <button type="button" className="error__button-back" onClick={goBack}>Назад</button>
    </main>
  );
};

export default Error;
