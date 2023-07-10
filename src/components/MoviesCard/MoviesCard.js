import React, { useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import { formattedTime } from "../../utils/formattedTime";
import { formattedImage } from "../../utils/formattedImage";

const MoviesCard = ({ movie, onAddMovieFavorite, onDeleteMovieFavorite }) => {

  const location = useLocation();

  const handleAddMovieFavorite = useCallback(() => {
    onAddMovieFavorite(movie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  const handleDeleteMovieFavorite = useCallback(() => {
    onDeleteMovieFavorite(movie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  const iconFavorite = () => {
    if (movie.favorite)
      return (<button type="button" onClick={handleDeleteMovieFavorite} className="movies-card__favorite movies-card__favorite_active"></button>);
    else
      return (<button type="button" onClick={handleAddMovieFavorite} className="movies-card__favorite"></button>);
  };

  const iconFavoriteDelete = () => {
    return (<button type="button" onClick={handleDeleteMovieFavorite} className={`movies-card__favorite movies-card__favorite_delete`}></button>);
  };

  const getButtonCard = () => {
    if (location.pathname === '/movies') {
      return iconFavorite();
    } else {
      return iconFavoriteDelete();
    }
  };

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={(movie.image.url && formattedImage(movie.image.url)) || movie.image} alt={movie.nameRU || movie.nameEN}/>
      <div className="movies-card__content">
        <header className="movies-card__header">
          <h2 className="movies-card__title">{movie.nameRU || movie.nameEN}</h2>
          {getButtonCard()}
        </header>
        <p className="movies-card__time">{formattedTime(movie.duration)}</p>
      </div>
      <Link className="movies-card__link" to={movie.trailerLink || movie.trailer} target="_blank"/>
    </article>
  );
};

export default MoviesCard;
