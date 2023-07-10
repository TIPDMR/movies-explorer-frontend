import React, { useEffect, useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import LoadMoreMoviesButton from "../Movies/LoadMoreMoviesButton/LoadMoreMoviesButton";
import { useLocation } from "react-router-dom";
import {
  MOVIES_TO_ADD_COUNT_XL,
  MOVIES_TO_ADD_COUNT_LG,
  MOVIES_TO_ADD_COUNT_SM,
  MOVIES_TO_RENDER_COUNT_XL,
  MOVIES_TO_RENDER_COUNT_LG,
  MOVIES_TO_RENDER_COUNT_MD,
  MOVIES_TO_RENDER_COUNT_SM,
  SCREEN_XL,
  SCREEN_MD,
  SCREEN_LG,
} from "../../constants/constMovies";
import { useResize } from "../../hooks/useResize";

const MoviesCardList = ({ movieList, onAddMovieFavorite, onDeleteMovieFavorite, isNewSearch, onIsNewSearch, isFavoriteSearchMovieList }) => {
  const location = useLocation();
  //Количество карточек подгружаемых при первом рендере
  const [loadLimitMoviesRender, setLoadLimitMoviesRender] = useState(0);//16
  //Количество карточек подгружаемых кнопкой
  const [loadedMoviesCount, setLoadedMoviesCount] = useState(0);//4
  //Карточки, которые подгружаем
  const [renderMovies, setRenderMovies] = useState([]);

  const [rememberSearch, setRememberSearch] = useState(false);

  const { width } = useResize();

  useEffect(() => {
    const localStorageKey = location.pathname === "/movies" ? "inputValuesMovies" : "inputValuesFavoriteMovies";
    const parseValue = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    if (parseValue?.hasOwnProperty("search-form__movie") && renderMovies && renderMovies.length === 0) {
      setRememberSearch(true);
    } else {
      setRememberSearch(false);
    }
  }, [renderMovies, isFavoriteSearchMovieList]);

  useEffect(() => {
    if (width >= SCREEN_XL) {
      setLoadLimitMoviesRender(MOVIES_TO_RENDER_COUNT_XL);//12
      setLoadedMoviesCount(MOVIES_TO_ADD_COUNT_XL);//4
    } else if (width < SCREEN_XL && width > SCREEN_LG) {
      setLoadLimitMoviesRender(MOVIES_TO_RENDER_COUNT_LG);//9
      setLoadedMoviesCount(MOVIES_TO_ADD_COUNT_LG);//3
    } else if (width < SCREEN_LG && width >= SCREEN_MD) {
      setLoadLimitMoviesRender(MOVIES_TO_RENDER_COUNT_MD);//8
      setLoadedMoviesCount(MOVIES_TO_ADD_COUNT_SM);//2
    } else {
      setLoadLimitMoviesRender(MOVIES_TO_RENDER_COUNT_SM);//5
      setLoadedMoviesCount(MOVIES_TO_ADD_COUNT_SM);//2
    }

  }, [width]);

  useEffect(() => {
    if (location.pathname === "/movies" && (renderMovies.length === 0 || isNewSearch)) {
      setRenderMovies(movieList.slice(0, loadLimitMoviesRender));
      onIsNewSearch(false);
    } else if (location.pathname === "/saved-movies") {
      setRenderMovies(movieList);
    } else {
      setRenderMovies(movieList.slice(0, renderMovies.length));
    }
  }, [movieList, loadLimitMoviesRender]);

  const handleLoadMovies = () => {
    localStorage.setItem('countRenderMovie', JSON.stringify(renderMovies.length + loadedMoviesCount));
    setRenderMovies(movieList.slice(0, renderMovies.length + loadedMoviesCount));
  };
  return (
    <section className="movies-card-list">
      {(() => {
        if (renderMovies && renderMovies.length !== 0) {
          return (<ul className="movies-card-list__items">
            {renderMovies.map((movie) => (
              <li className="movies-card-list__item" key={movie.id || movie.movieId}>
                <MoviesCard onDeleteMovieFavorite={onDeleteMovieFavorite} onAddMovieFavorite={onAddMovieFavorite} movie={movie}/>
              </li>
            ))}
          </ul>);
        } else if (renderMovies && renderMovies.length === 0 && rememberSearch) {
          return (<p className="movies-card-list__error">Ничего не найдено</p>);
        } else {
          return "";
        }
      })()}
      {location.pathname === '/movies' && renderMovies.length > 3 && renderMovies.length < movieList.length ? (
        <LoadMoreMoviesButton onLoadMovies={handleLoadMovies}/>
      ) : null}
    </section>
  );
};

export default MoviesCardList;
