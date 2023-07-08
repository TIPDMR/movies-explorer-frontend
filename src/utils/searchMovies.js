/**
 * Поиск фильма по критериям
 * @param moviesList
 * @param searchText
 * @param duration
 * @returns {*}
 */
export const searchMovies = (moviesList, searchText, duration) => {
  return moviesList?.filter((movie) => {
    const hasSearchText = Object.keys(movie).some((key) => {

      return typeof movie[ key ] === 'string' &&
        key !== 'created_at' &&
        key !== 'id' &&
        key !== 'updated_at' &&
        movie[ key ].toLowerCase().includes(searchText.toLowerCase());
    });

    return duration ? hasSearchText && movie.duration <= 40 : hasSearchText;
  });
};
