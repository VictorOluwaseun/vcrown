import React from "react";

import "./custom-button.styles.scss";

const CustomButton = (
 { children, isGoogleSignIn, ...otherProps } //To conditioning render a class name based on props
) => (
 <button
  className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
  {...otherProps}
 >
  {children}
 </button>
);

export default CustomButton;
