import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API, buttonsId } from "./../utils/constants";
import { switchKeyValue } from "../utils/helper";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  VideoMockData,
  PetsMockData,
  MusicMockData,
  AutosMockData,
  FilmsMockData,
  MockDataForAll
} from "../utils/mockData/MockData";
import { addVideos, setError } from "../utils/appSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
 
  const category = useSelector((store) => store.category.categoryName);
  const dispatch= useDispatch()

  const GOOGLE_API_KEY = process.env.REACT_APP_API_KEY;
  const a = switchKeyValue(buttonsId);

  const CategoryId = a[category];

  const GET_BY_CATIGORY_ID =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=8&regionCode=AM&videoCategoryId=" +
    CategoryId +
    "&key=" +
    process.env.REACT_APP_API_KEY;

  const GET_DATA_URL = CategoryId
    ? GET_BY_CATIGORY_ID
    : (YOUTUBE_VIDEOS_API + GOOGLE_API_KEY);

  const getVideos = async () => {
    try {
      const data = await fetch(GET_DATA_URL);
      const json = await data.json();
      setVideos([...json?.items],);
      dispatch(addVideos(json?.items))
      if(!json){
       
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
     
      }
    } catch (error) {
     //dispatch(setError(error))
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
          ? (VideoMockData? VideoMockData.reverse().map((video) => (
              <Link to={"/watch?v=" + video.id} key={video.id}>
                <VideoCard info={video} live={category === "Live"} />
              </Link>
            )):null)
           :videos?.map((video) => (
              <Link to={"/watch?v=" + video.id} key={video.id}>
                <VideoCard info={video} />
              </Link>
            ))}
      </div>
    </>
  );
};

export default VideoContainer;
