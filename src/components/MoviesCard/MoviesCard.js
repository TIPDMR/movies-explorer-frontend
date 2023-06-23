import React from 'react';

const MoviesCard = ({ card, buttonControl }) => {

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={card.image} alt={card.name}/>
      <h2 className="movies-card__title">{card.name}</h2>
      <p className="movies-card__time">{card.time}</p>
      {buttonControl(card)}
    </article>
  );
};

export default MoviesCard;
