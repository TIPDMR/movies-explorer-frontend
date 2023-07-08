import React from 'react';

const HeadingLevel4 = ({ name, className = "" }) => {
  return (<h4 className={`heading-level-4 ${className}`}> {name}</h4>);
};

export default HeadingLevel4;
