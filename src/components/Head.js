import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMenu,
  openSearchList,
  closeSearchList,
} from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import {
  chosenQueryResults,
  resetChosenQueryResults,
} from "../utils/chosenQuerySlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";


const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [chosenQuery, setChosenQuery] = useState("");
  const [err, setErr] = useState(null);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const YOUTUBE_SEARCH_BY_QUERY_API =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
    chosenQuery +
    "%20&videoType=any&key=" +
    process.env.REACT_APP_API_KEY2

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await data.json();
      setSearchSuggestions(json[1]);
      if(!json){setSearchSuggestions(null)}
      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.warn(
        "An error occurred while fetching data. Using mock data as fallback.",
        error
      );

    }
  };

  const searchCache = useSelector((store) => store.search);

  const handleSubmit = (event) => {
    event.preventDefault();
    setChosenQuery(event.target[0].value);
    navigate(`results/?search_query=${event.target[0].value}`);
    dispatch(resetChosenQueryResults());
    setSearchQuery("");
    setSearchSuggestions([]);
   ;
    dispatch(resetChosenQueryResults());
  
  };


 const handleFetchError = (error, response) => {
  if (response && response.status === 403) {
    console.warn(
      "403 Forbidden: API key is expired or access is denied. Searching videos without suggestions.",
      error
    );
  } else {
    console.warn(
      "An error occurred while fetching data. Searching videos without suggestions.",
      error
    );
  }

 
  dispatch(chosenQueryResults([]));
  dispatch(openSearchList());
  setSearchSuggestions([]);
  dispatch(resetChosenQueryResults());
};

const getChosenQuery = async () => {
  try {
    const response = await fetch(YOUTUBE_SEARCH_BY_QUERY_API);

    if (!response.ok) {
      throw { message: "Failed to fetch data", response };
    }

    const json = await response.json();

    if (json) {
      //console.log("search query list", json.items);
      dispatch(chosenQueryResults(json.items));
      dispatch(openSearchList());
      setSearchSuggestions([]);
      dispatch(resetChosenQueryResults());
    }
    return;
  } catch (error) {
    handleFetchError(error, error.response);
  }
};


  useEffect(() => {
    dispatch(closeSearchList());
  }, []);

  useEffect(() => {
    if (!err) {
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
    } else {
      getSearchSuggestions();
    }
  }, [searchQuery, err]);

  useEffect(() => {
    getChosenQuery();
  }, [chosenQuery]);

  return (
    <div className=" flex flex-row w-full shadow-lg  mb-5">
      <div className="flex flex-row  w-[30%]">
        {" "}
        <img
          onClick={() => toggleMenuHandler()}
          className="h-5 mx-3 my-auto cursor-pointer"
          src="https://cdn0.iconfinder.com/data/icons/essential-glyphs-rounded/32/menu-hamburger-navigation-512.png"
          alt="menu"
        />
        <Link to={"/"}>
          <img
            className="h-12 mt-2"
            src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500 "
            alt="logo"
          />
        </Link>
      </div>

      <div className="flex flex-col  w-[60%] py-2 sm:ml-4  ml-6 ">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="border  border-gray-500 w-[60%] rounded-l-full p-2 pl-4"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onSubmit={handleSubmit}
            />

            <button
              type="submit"
              className="border border-gray-500 rounded-r-full p-2 bg-gray-100"
            >
              🔍
            </button>
          </form>
        </div>
        {!!searchSuggestions ? (
          <div className=" absolute mt-11 py-2 px-5 w-1/3">
            <ul>
              {searchSuggestions?.map((s, index) => (
                <Link key={index} to={`results/?search_query=${s}`}>
                  <li
                    className=" sm:p-2 sm:text-base py-1 bg-white text-xs shadow-sm hover:bg-gray-100 "
                    onClick={() => {
                      setChosenQuery(s);
                      setSearchQuery(s);
                      setSearchSuggestions([]);
                    
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
      <div className="w-[10%]">
        <img
          className="h-8 mt-3"
          alt="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
        />
      </div>
    </div>
  );
};

export default Head;
