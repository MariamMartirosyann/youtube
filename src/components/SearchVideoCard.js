import React from "react";

const SearchVideoCard = ({ data }) => {
 
  return (
    <div className="p-2 m-2 w-full  flex md:flex-row flex-col">
      <img
        className=" rounded-lg md:w-1/2 w-[95%]"
        alt="thumbnail"
        src={data?.snippet?.thumbnails?.high?.url}
      />

      <ul className="ml-5 md:w-1/2 w-[100%] ">
        <li className=" md:font-bold font-normal  py-2">
          {data?.snippet?.title}
        </li>
        <li className=" md:font-bold font-normal ">
          {data?.snippet?.channelTitle}
        </li>
      </ul>
    </div>
  );
};

export default SearchVideoCard;
