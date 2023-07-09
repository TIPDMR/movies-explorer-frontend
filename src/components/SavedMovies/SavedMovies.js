import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ isMovieList, onDeleteMovieFavorite, onSearchMovies, onResetFormFavoriteMovies, isInputValues, isFavoriteSearchMovieList }) => {

  return (
    <main className="saved-movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onResetFormFavoriteMovies={onResetFormFavoriteMovies}
        isInputValues={isInputValues}
      />
      <MoviesCardList movieList={isMovieList} onDeleteMovieFavorite={onDeleteMovieFavorite} isFavoriteSearchMovieList={isFavoriteSearchMovieList}/>
    </main>
  );
};

export default SavedMovies;
