import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (
 { children, isGoogleSignIn, inverted, ...otherProps } //To conditioning render a class name based on props
) => (
 <button
  className={`${inverted ? "inverted" : ""} ${
   isGoogleSignIn ? "google-sign-in" : ""
  } custom-button`}
  {...otherProps}
 >
  {children}
 </button>
);

export default CustomButton;
