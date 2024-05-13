import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu, sideListVidos } from "../utils/appSlice";
import { useSearchParams, Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { GOOGLE_COMENY_API_KEY } from "../utils/constants";
import ComentPage from "./ComentPage";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [bigVideo, setBigVideo] = useState();
  const [coments, setComents] = useState([]);
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();

  const COMENTS_API =
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=" +
    videoId +
    "&key=" +
    GOOGLE_COMENY_API_KEY;

  const CHANNELS_API =
    "https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet&channelId=UCRpjHHu8ivVWs73uxHlWwFA&key=" +
    GOOGLE_COMENY_API_KEY;

  const getComents = async () => {
    const data = await fetch(COMENTS_API);
    const json = await data.json();
    setComents(json.items);
  };

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    const filteredVideos = json.items.filter((video) => video.id !== videoId);
    const mianVideo = json.items.find((video) => video.id === videoId);
    setVideos(filteredVideos);
    setBigVideo(mianVideo);
  };

  const getChannels = async () => {
    const data = await fetch(CHANNELS_API);
    const json = await data.json();
  };

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(sideListVidos());
    getComents();
    getChannels();
  }, []);

  useEffect(() => {
    getVideos();
  }, [videoId]);

  useEffect(() => {
    getComents();
  }, [videoId]);

  return (
    <div className="px-5 flex">
      <div className=" col-span-9">
        <iframe
          className="mb-5"
          width="1000"
          height="500"
          src={"https://www.youtube.com/embed/" + videoId}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <ul className=" text-lg w-1000">
          <li className=" font-bold text-lg my-4">{bigVideo?.snippet.title}</li>
          <li>
            {bigVideo?.snippet.channelTitle}{" "}
            <button className=" bg-black  text-white py-2 px-4 ml-12 rounded-full">
              Subscribe
            </button>
            <button className=" bg-gray-200  border-gray-700 py-2 px-8 ml-12 rounded-l-full">
              👍🏻 {bigVideo?.statistics.likeCount}
            </button>
            <button className=" bg-gray-200    border-gray-700 py-2 px-4 rounded-r-full">
              👎🏻
            </button>
            <button className=" bg-gray-200  border-gray-700 py-2 px-8 ml-12 rounded-full">
              Share
            </button>
          </li>
          <li>{bigVideo?.statistics.viewCount} veiws</li>
        </ul>
        {coments.map((coment) => (
          <ComentPage key={coment.id} info={coment} />
        ))}
        {/* <ComentPage info={coments[0]}/> */}
      </div>
      <div className=" flex flex-col col-span-3">
        {videos.map((video) => (
          <Link to={"/watch?v=" + video.id} key={video.id}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
