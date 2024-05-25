import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchVideoCard from "./SearchVideoCard";

const SearchVideoList = () => {

  const seachVideoList = useSelector((store) => store.chosenQuery);
 // console.log(seachVideoList[seachVideoList.length - 1],"info")

  if (!seachVideoList[seachVideoList.length - 1]) return;
  return (
    <div>
      {seachVideoList[seachVideoList.length - 1]?.map((v) => (
       <Link to={"/watch?v=" + v?.id?.videoId} key={v?.idv?.videoId}>
          <SearchVideoCard data={v} />
        </Link>
      ))}
    </div>
  );
};

export default SearchVideoList;
