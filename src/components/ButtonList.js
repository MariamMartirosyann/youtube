import React, { useState, useEffect } from "react";
import Button from "./Button";
import { CATEGORIES } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateCategory,cleanCategory } from "../utils/categorySlice";


const ButtonList = () => {
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  console.log(buttons, "buttons");
  const getButtons = async () => {
    const data = await fetch(CATEGORIES);
    const json = await data.json();
    setButtons(json?.items?.slice(0, 10));
  };

  const findCategoryId = () => {
    dispatch(updateCategory(category));
  };

  useEffect(() => {
    getButtons();
  }, []);

  useEffect(() => {
    findCategoryId();
  }, [category]);

  if (!buttons) return;
  return (
    <div className="flex">
      <Button name={"All"} handleClick={()=>{dispatch(cleanCategory())}}/>
      {buttons?.map((b) => {
        return (
          <Button
            key={b.id}
            name={b?.snippet?.title.split(" ")[0]}
          
            handleClick={() => {
              setCategory(b?.snippet?.title);
            }}
          />
        );
      })}
    </div>
  );
};

export default ButtonList;
