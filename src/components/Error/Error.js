import React from 'react';

const Error = ({ code = "404", text = "Страница не найдена" }) => {

  return (
    <main className="error">
      <header className="error__header">
        <h1 className="error__title">{code}</h1>
        <p className="error__text">{text}</p>
      </header>
      <button type="button" className="error__button-back" onClick={() => window.history.back()}>Назад</button>
    </main>
  );
};

export default Error;
