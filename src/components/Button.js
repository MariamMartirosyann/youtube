import React, { useState } from "react";

const Button = ({ name, handleClick,active }) => {
 


  return (
    <div>
      <button
        className={
          active
            ? "px-5 py-2 m-2 rounded-lg bg-black text-white"
            : "px-5 py-2 m-2 rounded-lg bg-gray-200"
        }
        onClick={handleClick}
    
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
