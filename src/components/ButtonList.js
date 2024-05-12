import React from "react";
import Button from "./Button";

const buttons = [
  { name: "All" },
  { name: "Music" },
  { name: "Songs" },
  { name: "Live" },
  { name: "Cooking" },
  { name: "TV" },
  { name: "Animation" },
  { name: "Sport" },
  { name: "Motivation" },
  { name: "Programming" },
  { name: "Political" },
  { name: "For Kids" },
];

const ButtonList = () => {
  return (
    <div className=" flex">
      {buttons.map((b) => {
        return <Button key={b.name} name={b.name}/>;
      })}
    </div>
  );
};

export default ButtonList;
