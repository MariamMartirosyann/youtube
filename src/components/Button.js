import React, { useState } from "react";

const Button = ({ name, handleClick }) => {
  const [active, setActive] = useState(false);

  const Click = () => {
    handleClick();
    setActive(true);
  };
  return (
    <div>
      <button
        className={
          active
            ? "px-5 py-2 m-2 rounded-lg bg-black text-white"
            : "px-5 py-2 m-2 rounded-lg bg-gray-200"
        }
        onClick={Click}
    
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
