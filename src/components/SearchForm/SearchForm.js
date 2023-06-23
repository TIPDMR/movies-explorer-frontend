import React, { useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  const [value, setValue] = useState('Фильм');

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    setValue(evt.target.value);
    evt.preventDefault();
  }


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          name="search-form__movie"
          id="search-form__movie"
          className="search-form__movie-input"
          placeholder="Фильм"
          type="text"
          value={value}
          onChange={handleChange}
          required
        />
        <button className="search-form__button"></button>
      </div>
      <FilterCheckbox className="search-form__filter-checkbox"/>
    </form>
  );
};

export default SearchForm;
