import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import SearchVideoCard from "./SearchVideoCard";
import { useEffect, useState } from "react";

function SearchVideoList() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  

  const chosenQuery = searchParams.get("search_query");

  const YOUTUBE_SEARCH_BY_QUERY_API =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
    chosenQuery +
    "%20&videoType=any&key=" +
    process.env.REACT_APP_API_KEY;

  const getChosenQuery = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_BY_QUERY_API);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();

      setData(json.items);
      if(!json){
        setData([])
      }
    } catch (error) {
      console.warn(
        "An error occurred while fetching data.Searching videos without suggestions.",
        error
      );
      
    }
  };

  useEffect(() => {
    getChosenQuery();
  }, [chosenQuery]);

  if (!chosenQuery ||!data) return;
  return (
    <div>
      {data?.map((v) => (
        <Link to={"/watch?v=" + v?.id?.videoId} key={v?.id?.videoId}>
          <SearchVideoCard data={v} />
        </Link>
      ))}
    </div>
  );
}

export default SearchVideoList;
