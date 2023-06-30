import React from 'react';

const MoviesCard = ({ card, buttonControl }) => {

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={card.image} alt={card.name}/>
      <div className="movies-card__content">
        <header className="movies-card__header">
          <h2 className="movies-card__title">{card.name}</h2>
          {buttonControl(card)}
        </header>
        <p className="movies-card__time">{card.time}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
