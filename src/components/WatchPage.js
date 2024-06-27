import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, sideListVidos } from "../utils/appSlice";
import { useSearchParams, Link } from "react-router-dom";

import VideoCard from "./VideoCard";
import ComentPage from "./ComentPage";
import LiveChat from "./LiveChat";
import { setError } from "../utils/appSlice";
import useVideoAPI from "../utils/useVideoAPI ";
import { VideoMockData } from "../utils/mockData/MockData";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState();
  const [bigVideo, setBigVideo] = useState();
  const [coments, setComents] = useState([]);
  const [err, setErr] = useState(null);
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const GOOGLE_VIDEO_API_KEY=useVideoAPI()

  const islive = useSelector((store) => store.category.categoryName);
  const live = islive === "Live" ? true : false;

  const COMENTS_API =
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&videoId=" +
    videoId +
    "&key=" +
    process.env.REACT_APP_KEY_COMENTS;

 

  const getComents = async () => {
    try {
      const data = await fetch(COMENTS_API);
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " +
            data.status +
            "getComents"
        );
      }
      const json = await data.json();
      setComents(json.items);
    } catch (error) {
      console.log(error, "error");
      dispatch(setError(error.message));
      setErr(error);
    }
  };

  const getVideo = async () => {
    const data1 = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id="+videoId +"&key=" +
      GOOGLE_VIDEO_API_KEY
    );
    const json1 = await data1?.json();
    setVideo(json1?.items[0]);
  };


  const getVideos = async () => {
    try {
      const data = await fetch( process.env.REACT_APP_YOUTUBE_VIDEOS_LINK+GOOGLE_VIDEO_API_KEY);
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " +
            data.status +
            "getVideos"
        );
      }
      const json = await data?.json();
      const filteredVideos = json?.items?.filter(
        (video) => video.id !== videoId
      );
      const mianVideo = json?.items?.find((video) => video.id === videoId);
      setVideos(filteredVideos);
      setBigVideo(mianVideo);
    } catch (error) {
      console.log(error, "error");
      dispatch(setError(error.message));
      setErr(error);

      const filteredVideos = VideoMockData.filter(
        (video) => video.id !== videoId
      );
      const mianVideo = VideoMockData.find((video) => video.id === videoId);
      setVideos(filteredVideos);
      setBigVideo(mianVideo);
    }
  };

 

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(sideListVidos());
    getComents();
  
  }, []);

  useEffect(() => {
    getVideos();
  }, [videoId]);

  useEffect(() => {
    getVideo();
    getComents();
  }, [videoId]);

  if (!videos) return;

  return (
    <>
      <div className="px-5 flex xl:flex-row flex-col">
        <div className="xl:w-[80%] w-[100%]">
          <iframe
            className="mb-5 w-[100%] lg:h-[500px] h-[300px]"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <ul className=" text-lg w-600">
            <li className=" font-bold sm:text-lg my-4  text-xs">
              {bigVideo ? bigVideo?.snippet.title:video?.snippet?.title}
            </li>
            <li className="sm:text-base text-xs">
              {bigVideo ? bigVideo?.snippet.channelTitle:video?.snippet?.channelTitle}{" "}
              <button className=" bg-black  text-white py-2 sm:px-4 px-1 lg:ml-12 ml-2 rounded-full  sm:text-base text-xs">
                Subscribe
              </button>
              <button className=" bg-gray-200  border-gray-700 py-2 md:px-8 px-3 lg:ml-12 ml-2 rounded-l-full sm:text-base text-xs">
                👍🏻 {bigVideo? bigVideo?.statistics.likeCount :video?.statistics?.likeCount}
              </button>
              <button className=" bg-gray-200    border-gray-700 py-2 md:px-4  px-1 rounded-r-full sm:text-base text-xs">
                👎🏻
              </button>
              <button className=" bg-gray-200  border-gray-700 py-2 sm:px-8 px-1 lg:ml-12 ml-2 rounded-full sm:text-base text-xs">
                Share
              </button>
            </li>
            <li className="sm:text-base text-xs">
              {bigVideo ?bigVideo?.statistics?.viewCount : video?.statistics?.viewCount + " veiws"}
            </li>
            {!live ? (
              <li className="  font-bold text-lg hidden xl:block">Coments:</li>
            ) : null}
          </ul>

          {!live
            ? coments?.map((coment) => (
                <ComentPage key={coment.id} info={coment} />
              ))
            : null}
        </div>
        <div className="">
          {live ? (
            <div className="xl:w-[600px] w-[100%]">
              <LiveChat />
            </div>
          ) : (
            <div className=" flex flex-col ">
              {videos.map((video) => (
                <Link to={"/watch?v=" + video.id} key={video.id}>
                  <VideoCard info={video} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchPage;
