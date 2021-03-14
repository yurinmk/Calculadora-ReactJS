import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <button
      onClick={(e) => {
        props.click(e.target.innerHTML);
      }}
      className={`button 
                    ${props.operation ? "operation" : ""}
                    ${props.double ? "double" : ""}
                    ${props.triple ? "triple" : ""}
  `}
    >
      {props.label}
    </button>
  );
}

export default Button;
