import React from 'react';

const HeadingLevel5 = ({ name, className = "" }) => {
  return (<h5 className={`heading-level-5 ${className}`}> {name}</h5>);
};

export default HeadingLevel5;
