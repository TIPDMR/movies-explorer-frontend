import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = ({ locationPathname, isLoading }) => {
  return (
    <main className="movies">
      <SearchForm/>
      {isLoading && (<Preloader/>)}
      <MoviesCardList locationPathname={locationPathname}/>
    </main>
  );
};

export default Movies;
