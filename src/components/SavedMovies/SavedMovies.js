import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ locationPathname }) => {


  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList locationPathname={locationPathname}/>
    </main>
  );
};

export default SavedMovies;
