import React from "react";
import { useSelector } from "react-redux";


const VideoCard = ({ info, live=false }) => {
  //console.log(info?.snippet?.categoryId,"info")

  const sideList = useSelector(store => store.app.smallCardVideos);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  return sideList ? (
    <div className="p-2 m-2 w-110 flex flex-row ">
      <img
        className=" w-1/2  rounded-lg mr-3"
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className=" text-sm">{title.slice(0,50)}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount} veiws</li>
      </ul>
    </div>
  ) : (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img
        className=" rounded-lg"
        alt="thumbnail"
        src={thumbnails?.medium.url}
      />
      <ul>
        <li className=" font-bold py-2">{title.slice(0,50)}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount} veiws</li>
        {live&&<button className=" bg-red-600 text-white px-6 rounded-lg mt-1"> Live</button>}
      </ul>
    </div>
  );
};

// for caces of AD
export const AdVideoCard = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-red-900">
      <VideoCard info={info} />
      <button className=" bg-red-600 text-white px-3  ml-3 py-1 rounded-lg"> AD</button>
    </div>
  );
};
export default VideoCard;
