import React from 'react';

const LoadMoreMoviesButton = ({onLoadMovies}) => {
  return (
    <div className="load-more-movies-button">
      <button onClick={onLoadMovies} type="button" className="load-more-movies-button__button">Ещё</button>
    </div>

  );
};

export default LoadMoreMoviesButton;
