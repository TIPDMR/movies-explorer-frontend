/**
 * Помечаем в общем списке фильмов
 * Те которые сохранил пользователь
 * @param movieList
 * @param favoriteMovieList
 * @returns {*}
 */
export const markedFavoriteMovieList = (movieList, favoriteMovieList) => {
  return movieList.map((movie) => {
    const favoriteMovie = favoriteMovieList.find((fm) => fm.movieId === movie.id);

    const localSaveMovieList = !!favoriteMovie;
    const updatedMovie = { ...movie, favorite: localSaveMovieList };

    if (favoriteMovie) {
      updatedMovie._id = favoriteMovie._id;
    }

    return updatedMovie;
  });
};
