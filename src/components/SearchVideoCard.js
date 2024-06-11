import React from "react";

const SearchVideoCard = ({ data }) => {
  return (
    <div className="p-2 m-2 w-full  flex flex-row">
      <img
        className=" rounded-lg w-1/2"
        alt="thumbnail"
        src={data?.snippet?.thumbnails?.high?.url}
      />

      <ul className="ml-5 w-1/2">
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
