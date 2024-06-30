import React, { useState, useEffect } from "react";
import Button from "./Button";
import { CATEGORIES } from "../utils/constants";

import { useDispatch } from "react-redux";
import { updateCategory, cleanCategory } from "../utils/categorySlice";
import { ButtonsMockData } from "../utils/mockData/MockDataButtons";

const ButtonList = () => {
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState("");
  const [activeButton, setActiveButton] = useState("All");


  const dispatch = useDispatch();

  const getButtons = async () => {
    try {

      
      const data = await fetch(CATEGORIES);

      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      setButtons(json?.items?.slice(0, 4));
      if (!json) {
        setButtons(ButtonsMockData.slice(0, 4));
      }
    } catch (error) {
      console.warn(
        "An error occurred while fetching data. Using mock data as fallback.",
        error
      );
    }
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
      <Button
        name={"All"}
        handleClick={() => {
          dispatch(cleanCategory());
          setActiveButton("All");
        }}
        active={activeButton === "All"}
      />
      <Button
        name={"Live"}
        handleClick={() => {
          setCategory("Live");
          setActiveButton("Live");
        }}
        active={activeButton == "Live"}
      />
      {buttons?.map((b) => {
        return (
          <Button
            key={b.id}
            name={b?.snippet?.title.split(" ")[0]}
            handleClick={() => {
              setCategory(b?.snippet?.title);
              setActiveButton(b?.snippet?.title);
            }}
            active={activeButton == b?.snippet?.title}
          />
        );
      })}
    </div>
  );
};

export default ButtonList;
