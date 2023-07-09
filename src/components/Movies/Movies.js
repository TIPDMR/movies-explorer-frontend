import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const Movies = ({ isLoading, onSearchMovies, isMovieList, onAddMovieFavorite, onDeleteMovieFavorite, isNewSearch, onIsNewSearch }) => {

  return (
    <main className="movies">
      <SearchForm onSearchMovies={onSearchMovies}/>
      {isLoading ?
        (<Preloader/>) :
        (<MoviesCardList
          onAddMovieFavorite={onAddMovieFavorite}
          onDeleteMovieFavorite={onDeleteMovieFavorite}
          movieList={isMovieList}
          isNewSearch={isNewSearch}
          onIsNewSearch={onIsNewSearch}
        />)}
    </main>
  );
};

export default Movies;
