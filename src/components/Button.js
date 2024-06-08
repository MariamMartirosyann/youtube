import React from "react";

const Button = ({ name, handleClick, active }) => {
  return (
    <div>
      <button
        className={
          active
            ? " xl:px-10 lg:px-7  sm:px-5 px-3 py-2 m-2 rounded-lg bg-black text-white"
            : "xl:px-10 lg:px-7  sm:px-5  px-3 py-2 m-2 rounded-lg bg-gray-200"
        }
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
