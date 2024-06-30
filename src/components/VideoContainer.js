import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API, buttonsId } from "./../utils/constants";
import { switchKeyValue } from "../utils/helper";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAPI from "../utils/useAPI";
import {
  VideoMockData,
  PetsMockData,
  MusicMockData,
  AutosMockData,
  FilmsMockData,
} from "../utils/mockData/MockData";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((store) => store.category.categoryName);

  const GOOGLE_API_KEY = useAPI();
  const a = switchKeyValue(buttonsId);

  const CategoryId = a[category];

  const GET_BY_CATIGORY_ID =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=AM&videoCategoryId=" +
    CategoryId +
    "&key=" +
    process.env.REACT_APP_API_KEY_CATEGORIES_ID;

  const GET_DATA_URL = CategoryId
    ? GET_BY_CATIGORY_ID
    : YOUTUBE_VIDEOS_API + GOOGLE_API_KEY;

  const getVideos = async () => {
    try {
      const data = await fetch(GET_DATA_URL);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      setVideos(json?.items);
      if (!category) {
        setVideos(VideoMockData);
      } else {
        if (category.includes("Pets")) {
          setVideos(PetsMockData);
        } else if (category.includes("Music")) {
          setVideos(MusicMockData);
        } else if (category.includes("Autos")) {
          setVideos(AutosMockData);
        } else if (category.includes("Film")) {
          setVideos(FilmsMockData);
        }
      }
    } catch (error) {
      console.warn(
        "An error occurred while fetching data. Using mock data as fallback.",
        error
      );
    }
  };

  useEffect(() => {
    getVideos();
  }, [CategoryId]);

  return (
    <>
      <div className=" flex flex-wrap col-span-11 lg:col-span-9 md:col-span-8  sm:ml-25  px-auto">
        {category === "Live"
          ? videos?.reverse().map((video) => (
              <Link to={"/watch?v=" + video.id} key={video.id}>
                <VideoCard info={video} live={category === "Live"} />
              </Link>
            ))
          : videos?.map((video) => (
              <Link to={"/watch?v=" + video.id} key={video.id}>
                <VideoCard info={video} />
              </Link>
            ))}
      </div>
    </>
  );
};

export default VideoContainer;
