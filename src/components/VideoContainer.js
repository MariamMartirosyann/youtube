import React, { useEffect, useState } from "react";
import {
  YOUTUBE_VIDEOS_API,
  GOOGLE_API_KEY,
  buttonsId,
} from "./../utils/constants";
import { switchKeyValue } from "../utils/helper";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CardShimmer from "./CardShimmer";
import ShimmerList from "./ShimmerList";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((store) => store.category.categoryName);
  //console.log(category, "category click");

  const a = switchKeyValue(buttonsId);

  //console.log(a[category]);
  const CategoryId = a[category];

  const GET_BY_CATIGORY_ID =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=AM&videoCategoryId=" +
    CategoryId +
    "&key=" +
    GOOGLE_API_KEY;

  const GET_DATA_URL = CategoryId ? GET_BY_CATIGORY_ID : YOUTUBE_VIDEOS_API;

  const getVideos = async () => {
    const data = await fetch(GET_DATA_URL);
    const json = await data.json();
    setVideos(json?.items);
  };

  useEffect(() => {
    getVideos();
  }, [CategoryId]);

  if (!videos) return;
  return (
    <div className=" flex flex-wrap col-span-11 lg:col-span-9 md:col-span-8  sm:ml-25">
      {category === "Live"
        ? videos.reverse().map((video) => (
            <Link to={"/watch?v=" + video.id} key={video.id}>
              <VideoCard info={video} live={category === "Live"} />
            </Link>
          ))
        : videos.map((video) => (
            <Link to={"/watch?v=" + video.id} key={video.id}>
              <VideoCard info={video} />
            </Link>
          ))}
    </div>
  );
};

export default VideoContainer;
