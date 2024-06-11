import React from "react";

const Button = ({ name, handleClick, active }) => {
  return (
    <div>
      <button
        className={
          active
            ? " xl:px-10 lg:px-7  sm:px-5 px-2 py-2 m-1 rounded-lg bg-black text-white sm:text-base text-xs"
            : "xl:px-10 lg:px-7  sm:px-5  px-2 py-2 m-1 rounded-lg bg-gray-200 sm:text-base text-xs"
        }
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
