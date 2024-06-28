import React, { useState, useEffect } from "react";
import Button from "./Button";
import { CATEGORIES } from "../utils/constants";
import { setError } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { updateCategory, cleanCategory } from "../utils/categorySlice";
import { ButtonsMockData } from "../utils/mockData/MockDataButtons";


const ButtonList = () => {
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState("");
  const [activeButton, setActiveButton] = useState("All");
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();

 


  const getButtons = async () => {
    try {
      const data = await fetch(CATEGORIES);
      
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " +
            data.status +
            "getButtons" 
        );
      }
      const json = await data.json();
      setButtons(json?.items?.slice(0, 5));
    } catch (error) {
      console.log(error, "error");
      dispatch(setError(error.message));
      setErr(error);
    }
  };
  
  if(!getButtons){
    setButtons([ButtonsMockData.slice(0, 5)])
    console.log("Youtube Data API KEY is expired, it will be valid again after 24 hours, meanwhile will be rendered mock data")
  }

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
