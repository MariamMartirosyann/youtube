import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, sideListVidos } from "../utils/appSlice";
import { useSearchParams, Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { GOOGLE_API_KEY } from "../utils/constants";
import ComentPage from "./ComentPage";
import SearchVideo from "./SearchVideoList";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [bigVideo, setBigVideo] = useState();
  const [coments, setComents] = useState([]);
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();

  const isSearchListOpen = useSelector((store) => store.app.isSearchListOpen);
  const seachVideoList = useSelector((store) => store.app.chosenQuery);
  const islive = useSelector((store) => store.category.categoryName);
  const live = islive === "Live" ? true : false;
  

  const COMENTS_API =
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&videoId=" +
    videoId +
    "&key=" +
    GOOGLE_API_KEY;

  const CHANNELS_API =
    "https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet&channelId=UCRpjHHu8ivVWs73uxHlWwFA&key=" +
    GOOGLE_API_KEY;

  const getComents = async () => {
    const data = await fetch(COMENTS_API);
    const json = await data.json();
    setComents(json.items);
  };

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data?.json();
    const filteredVideos = json?.items?.filter((video) => video.id !== videoId);
    const mianVideo = json?.items?.find((video) => video.id === videoId);
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

  if (!videos) return;

  return (
    <>
      <div className="px-5 flex">
        <div className="">
          <iframe
            className="mb-5"
            width="900"
            height="500"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <ul className=" text-lg w-600">
            <li className=" font-bold text-lg my-4">
              {bigVideo?.snippet.title}
            </li>
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
            <li>{bigVideo?.statistics?.viewCount} veiws</li>
            {!live ?<li className="  font-bold text-lg">Coments:</li>:null}
          </ul>
          
          {!live?coments?.map((coment) => (
            <ComentPage key={coment.id} info={coment} />
          )):null}
        </div>
        {live ? (
          <div className="w-[450px]">
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
    </>
  );
};

export default WatchPage;
