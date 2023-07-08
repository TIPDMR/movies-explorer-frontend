const FilterCheckbox = ({ onChange, isCheckboxValue }) => {

  const handlerChange = (evt) => {
    onChange(evt);
  };

  return (
    <div className="filter-checkbox">
      <input
        name="filter-checkbox__checkbox"
        id="filter-checkbox__checkbox"
        value={isCheckboxValue[ 'filter-checkbox__checkbox' ]}
        checked={isCheckboxValue[ 'filter-checkbox__checkbox' ] || ''}

        type="checkbox"
        className="filter-checkbox__checkbox"
        onChange={handlerChange}
        required={false}
      />
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
