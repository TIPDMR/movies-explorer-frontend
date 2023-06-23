import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import { movieList } from "../../utils/const";
import LoadMoreMoviesButton from "../Movies/LoadMoreMoviesButton/LoadMoreMoviesButton";

const MoviesCardList = ({ locationPathname }) => {
  const iconFavorite = (card) => {
    return (<i className={`movies-card__favorite ${card.favorite ? 'movies-card__favorite_active' : ''}`}></i>);
  };
  const iconFavoriteDelete = (card) => {
    return (<i className={`movies-card__favorite-delete`}></i>);
  };
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movieList?.map((card, index) => (
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
