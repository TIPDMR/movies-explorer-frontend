/**
 * Поиск фильма по критериям
 * @param movieList
 * @param searchText
 * @param duration
 * @returns {*}
 */
export const searchMovies = (movieList, searchText, duration) => {
  const normalizedSearchText = searchText.toLowerCase();

  return movieList?.filter((movie) => {
    const movieName = movie.nameRU.toLowerCase().trim();
    const hasSearchText = movieName.includes(normalizedSearchText);
    return duration ? hasSearchText && movie.duration <= 40 : hasSearchText;
  });
};
