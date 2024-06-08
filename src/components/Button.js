import React from "react";

const Button = ({ name, handleClick, active }) => {
  return (
    <div>
      <button
        className={
          active
            ? "px-10 py-2 m-3 rounded-lg bg-black text-white"
            : "px-10 py-2 m-3 rounded-lg bg-gray-200"
        }
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
