import React from 'react';

const MenuButton = ({clickOpenMenuMobile}) => {
  return (
    <button type="button" className="menu-button" onClick={clickOpenMenuMobile} />
  );
};

export default MenuButton;
