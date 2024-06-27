import React, { useEffect, useState } from "react";
import {
  YOUTUBE_VIDEOS_API,
  buttonsId,
} from "./../utils/constants";
import { switchKeyValue } from "../utils/helper";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setError } from "../utils/appSlice";
import useAPI from "../utils/useAPI";
import { VideoMockData } from "../utils/mockData/MockData";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((store) => store.category.categoryName);
  const[err, setErr]=useState(null)
 
  const dispatch = useDispatch();
  //console.log(category, "category click");
  const GOOGLE_API_KEY = useAPI();
  const a = switchKeyValue(buttonsId);

  //console.log(a[category]);
  const CategoryId = a[category];

  const GET_BY_CATIGORY_ID =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=AM&videoCategoryId=" +
    CategoryId +
    "&key=" +
   process.env.REACT_APP_API_KEY_CATEGORIES_ID;

  const GET_DATA_URL = CategoryId ? GET_BY_CATIGORY_ID : YOUTUBE_VIDEOS_API+ GOOGLE_API_KEY;

  const getVideos = async () => {
    try {
      const data = await fetch(GET_DATA_URL);
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " + data.status +"getVodeos"
        );
      }

      const json = await data.json();
      setVideos(json?.items);
     
    } catch (error) {
      console.log(error, "error");
      dispatch(setError(error.message));
      setErr(error);
      setVideos(VideoMockData);
    }
  };

if(!getVideos){
  setVideos(VideoMockData)
}
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
