import React from "react";
import { useSelector } from "react-redux";


const VideoCard = ({ info }) => {

  const sideList = useSelector(store => store.app.smallCardVideos);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  return sideList ? (
    <div className="p-2 m-2 w-110 flex flex-row ">
      <img
        className=" w-1/3  rounded-lg mr-3"
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className=" text-sm">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} veiws</li>
      </ul>
    </div>
  ) : (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img
        className=" rounded-lg"
        alt="thumbnail"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className=" font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} veiws</li>
      </ul>
    </div>
  );
};

export default VideoCard;
