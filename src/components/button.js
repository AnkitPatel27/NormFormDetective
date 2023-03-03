
import  "../css_modules/button.css";
import React from 'react';

function Button(props) {
  const { className, children ,style } = props;
  return (
    <button style={style} className={className}>
      {children}
    </button>
  );
}

export default Button;
