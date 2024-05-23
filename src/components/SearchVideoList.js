import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchVideoCard from "./SearchVideoCard";

const SearchVideoList = () => {
  const seachVideoList = useSelector((store) => store.chosenQuery);

  if (!seachVideoList[seachVideoList.length - 1]) return;
  return (
    <div>
      {seachVideoList[seachVideoList.length - 1]?.map((v) => (
        <SearchVideoCard data={v} key={v.id} />
      ))}
    </div>
  );
};

export default SearchVideoList;
