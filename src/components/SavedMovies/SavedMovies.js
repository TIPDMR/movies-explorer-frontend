import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ isMovieList, onDeleteMovieFavorite, onSearchMovies, onResetFormFavoriteMovies,isInputValues, }) => {

  return (
    <main className="saved-movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onResetFormFavoriteMovies={onResetFormFavoriteMovies}
        isInputValues={isInputValues}
      />
      <MoviesCardList movieList={isMovieList} onDeleteMovieFavorite={onDeleteMovieFavorite}/>
    </main>
  );
};

export default SavedMovies;
