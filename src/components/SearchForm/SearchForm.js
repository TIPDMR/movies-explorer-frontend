import React, { useEffect, useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useValidation from "../../hooks/useValidation";
import { useLocation } from "react-router-dom";

const SearchForm = ({ onSearchMovies, onResetFormFavoriteMovies }) => {
  const [errorValidationMessage, setErrorValidationMessage] = useState("");
  const {
    inputValues,
    handleChange,
    resetForm
  } = useValidation();

  const location = useLocation();

  useEffect(() => {
    const localStorageKey = location.pathname === "/movies" ? "inputValuesMovies" : "inputValuesFavoriteMovies";
    const parseValue = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    resetForm(parseValue);
  }, [location.pathname]);


  function handleSubmit(evt) {
    evt.preventDefault();
    const searchTextValue = inputValues[ 'search-form__movie' ] || "";
    const checkBoxValue = inputValues[ 'filter-checkbox__checkbox' ] || false;
    if (searchTextValue.length === 0) {
      setErrorValidationMessage("Нужно ввести ключевое слово");
      return;
    } else {
      setErrorValidationMessage("");
    }
    const localNewValuesInput = {
      "search-form__movie": searchTextValue,
      "filter-checkbox__checkbox": checkBoxValue
    };
    const localStorageKey = location.pathname === "/movies" ? "inputValuesMovies" : "inputValuesFavoriteMovies";
    const localInputValues = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    localStorage.setItem(localStorageKey, JSON.stringify({ ...localInputValues, ...localNewValuesInput }));
    onSearchMovies(searchTextValue, checkBoxValue);
  }


  function handleSelect(evt) {
    evt.target.select();
  }

  const handleLocalChange = (evt) => {
    handleChange(evt);
    const searchTextValue = evt.target.value;
    if (searchTextValue.length > 0) {
      setErrorValidationMessage("");
    }
  };

  const handleResetForm = () => {
    resetForm();
    onResetFormFavoriteMovies();
  };

  const handleChangeCheckBox = (evt) => {
    handleChange(evt);
    const checkBoxValue = evt.target.checked || false;
    const localStorageKey = location.pathname === "/movies" ? "inputValuesMovies" : "inputValuesFavoriteMovies";
    const parseValue = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    const updatedParseValue = { ...parseValue, "filter-checkbox__checkbox": checkBoxValue };
    localStorage.setItem(localStorageKey, JSON.stringify(updatedParseValue));
    onSearchMovies(inputValues[ "search-form__movie" ] || "", checkBoxValue);

  };


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          name="search-form__movie"
          id="search-form__movie"
          className="search-form__movie-input"
          placeholder="Фильм"
          type="text"
          value={inputValues[ 'search-form__movie' ] || ''}
          onChange={handleLocalChange}
          onClick={handleSelect}
        />
        {
          (location.pathname === "/saved-movies" && inputValues[ 'search-form__movie' ]?.length > 0) ?
            (<button onClick={handleResetForm} type="button" className="search-form__button search-form__button_clear"></button>) :
            ''
        }
        <button type="submit" className="search-form__button"></button>
      </div>
      <span className="search-form__input-text-error">{errorValidationMessage}</span>
      <FilterCheckbox isCheckboxValue={inputValues} onChange={handleChangeCheckBox}/>
    </form>
  );
};

export default SearchForm;
