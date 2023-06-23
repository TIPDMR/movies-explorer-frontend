import React, { useState } from 'react';

const FilterCheckbox = ({ className = '' }) => {
  const [checkbox, setCheckbox] = useState(true);

  const handlerChange = (state) => {
    setCheckbox(!state);
  };

  return (
    <div className={`filter-checkbox ${className}`}>
      <input name="search" id="filter-checkbox__checkbox" type="checkbox" defaultChecked={checkbox} className="filter-checkbox__checkbox" onChange={handlerChange}/>
      <span className="filter-checkbox__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
