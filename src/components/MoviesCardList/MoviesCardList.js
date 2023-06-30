import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import { MOVIES_LIST } from "../../utils/constants";
import LoadMoreMoviesButton from "../Movies/LoadMoreMoviesButton/LoadMoreMoviesButton";

const MoviesCardList = ({ locationPathname }) => {
  const iconFavorite = (card) => {
    return (<button className={`movies-card__favorite ${card.favorite ? 'movies-card__favorite_active' : ''}`}></button>);
  };
  const iconFavoriteDelete = (card) => {
    return (<button className={`movies-card__favorite-delete`}></button>);
  };
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {MOVIES_LIST?.map((card, index) => (
          <li className="movies-card-list__item" key={index}>
            <MoviesCard card={card} buttonControl={locationPathname === '/movies' ? (iconFavorite) : (iconFavoriteDelete)}/>
          </li>
        ))}
      </ul>
      {locationPathname === '/movies' ? (
        <LoadMoreMoviesButton/>
      ) : null}
    </section>
  );
};

export default MoviesCardList;
