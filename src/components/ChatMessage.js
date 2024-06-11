import React from "react";

const ChatMessage = ({ name, message }) => {
 


  return (

    <div className="flex items-center shadow-md p-2">
      <img
        className="h-8 px-1"
        alt="user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
      />
      <span className=" font-bold px-2">{name}</span>
      <span className="sm:text-base text-xs">{message}</span>
    </div>
  );
};

export default ChatMessage;
