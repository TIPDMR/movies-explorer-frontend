import React from 'react';

const HeadingLevel2 = ({ name, className = "" }) => {
  return (<h2 className={`heading-level-2 ${className}`}>{name}</h2>);
};

export default HeadingLevel2;
