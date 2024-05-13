import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
  };

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestions(), 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="grid grid-flow-col p-3  shadow-lg  ">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-5 my-auto cursor-pointer"
          src="https://cdn0.iconfinder.com/data/icons/essential-glyphs-rounded/32/menu-hamburger-navigation-512.png"
          alt="menu"
        />

        <img
          className="h-12 mx-4"
          src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500 "
          alt="logo"
        />
      </div>
      <div className="flex flex-col col-span-10 py-2 ml-72">
        <div>
          <input
            type="text"
            className="border border-gray-500 w-1/2 rounded-l-full p-2 pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />

          <button className="border border-gray-500 rounded-r-full p-2 bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className=" absolute mt-11 bg-white py-2 px-5 w-[28rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {searchSuggestions?.map((s) => (
                <li key={s} className=" p-2 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
        />
      </div>
    </div>
  );
};

export default Head;
