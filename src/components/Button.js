import React from "react";

const Button = ({name, handleClick}) => {
 
  return (
    <div>
      <button className="px-5 py-2 m-2 rounded-lg bg-gray-200" onClick={handleClick}>{name}</button>
    </div>
  );
};

export default Button;
