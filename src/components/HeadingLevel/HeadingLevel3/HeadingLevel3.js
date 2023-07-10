import React from 'react';

const HeadingLevel3 = ({ name, className = "" }) => {
  return (<h3 className={`heading-level-3 ${className}`}> {name}</h3>);
};

export default HeadingLevel3;
