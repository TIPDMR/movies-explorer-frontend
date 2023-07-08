import React, { useEffect } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useValidation from "../../hooks/useValidation";
import { useLocation } from "react-router-dom";

const SearchForm = ({ onSearchMovies, onResetFormFavoriteMovies, isInputValues }) => {
  const {
    inputValues,
    inputErrors,
    handleChange,
    setState,
    resetForm
  } = useValidation();

  const location = useLocation();

  useEffect(() => {
    setState({
      inputValues: isInputValues,
      inputErrors: {},
      inputValid: false
    });
  }, [location.pathname, isInputValues]);


  function handleSubmit(evt) {
    evt.preventDefault();
    const searchTextValue = inputValues[ 'search-form__movie' ] || "";
    const checkBoxValue = inputValues[ 'filter-checkbox__checkbox' ] || false;
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

  const handlerError = () => {
    if (location.pathname === "/movies")
      return !inputValues[ 'search-form__movie' ] ? "Нужно ввести ключевое слово" : inputErrors[ 'search-form__movie' ];
    else
      return inputErrors[ 'search-form__movie' ];
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
          onChange={handleChange}
          onClick={handleSelect}
          required
        />
        {
          (location.pathname === "/saved-movies" && inputValues[ 'search-form__movie' ]?.length > 0) ?
            (<button onClick={handleResetForm} type="button" className="search-form__button search-form__button_clear"></button>) :
            ''
        }
        <button type="submit" className="search-form__button"></button>
      </div>
      <span className="search-form__input-text-error">{handlerError()}</span>
      <FilterCheckbox isCheckboxValue={inputValues} onChange={handleChangeCheckBox}/>
    </form>
  );
};

export default SearchForm;
