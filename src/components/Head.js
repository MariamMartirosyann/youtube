import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, openSearchList, closeSearchList } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { chosenQueryResults,resetChosenQueryResults } from "../utils/chosenQuerySlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { GOOGLE_API_KEY } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [chosenQuery, setChosenQuery] = useState("");

 // console.log("chosenQuery", chosenQuery);

  const dispatch = useDispatch();

  const YOUTUBE_SEARCH_BY_QUERY_API =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
    chosenQuery +
    "%20&videoType=any&key=" +
    GOOGLE_API_KEY;

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const navigate = useNavigate();

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const searchCache = useSelector((store) => store.search);

  const getChosenQuery = async () => {
    dispatch(resetChosenQueryResults())
    const data = await fetch(YOUTUBE_SEARCH_BY_QUERY_API);
    const json = await data.json();
    //console.log("search query list", json.items);
    dispatch(chosenQueryResults(json.items));
    dispatch(openSearchList());
    setSearchSuggestions([])
   
  };

  useEffect(() => {
    dispatch(closeSearchList());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSearchSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    getChosenQuery();
  }, [chosenQuery]);

  return (
    <div className="grid grid-flow-col p-3  shadow-lg  ">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-5 my-auto cursor-pointer"
          src="https://cdn0.iconfinder.com/data/icons/essential-glyphs-rounded/32/menu-hamburger-navigation-512.png"
          alt="menu"
        />
        <Link to={"/"}>
          <img
            className="h-12 mx-4"
            src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500 "
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex flex-col col-span-10 py-2 ml-72">
        <div>
          <input
            type="text"
            className="border border-gray-500 w-1/2 rounded-l-full p-2 pl-4"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          <button className="border border-gray-500 rounded-r-full p-2 bg-gray-100">
            🔍
          </button>
        </div>
        {!!searchSuggestions ? (
          <div className=" absolute mt-11 bg-white py-2 px-5 w-[28rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {searchSuggestions?.map((s) => (
                <Link to={`results/?search_query=${s}`}>
                  <li
                    className=" p-2 shadow-sm hover:bg-gray-100"
                    onClick={() => {
                      setChosenQuery(s);
                      setSearchQuery(s);
                    }}
                   
                  >
                    🔍{s}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="flex col-span-1">
        <Link to="/results">
          <img
            className="h-8"
            alt="user"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
          />
        </Link>
      </div>
    </div>
  );
};

export default Head;
