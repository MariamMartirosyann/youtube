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
import { setError } from "../utils/appSlice";
import CardShimmer from "./CardShimmer";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [bigVideo, setBigVideo] = useState();
  const [coments, setComents] = useState([]);
  const[err, setErr]=useState(null)
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
    try {
      const data = await fetch(COMENTS_API);
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " + data.status +"getComents"
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

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      if (!data.ok) {
        throw new Error(
          "Network response was not ok. Error status: " + data.status+"getVideos"
        );
      }
    const json = await data?.json();
    const filteredVideos = json?.items?.filter((video) => video.id !== videoId);
    const mianVideo = json?.items?.find((video) => video.id === videoId);
    setVideos(filteredVideos);
    setBigVideo(mianVideo);
  } catch (error) {
    console.log(error, "error");
    dispatch(setError(error.message));
    setErr(error);
  }
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
              {bigVideo?.snippet.title}
            </li>
            <li className="sm:text-base text-xs">
              {bigVideo?.snippet.channelTitle}{" "}
              <button className=" bg-black  text-white py-2 sm:px-4 px-1 lg:ml-12 ml-2 rounded-full  sm:text-base text-xs">
                Subscribe
              </button>
              <button className=" bg-gray-200  border-gray-700 py-2 md:px-8 px-3 lg:ml-12 ml-2 rounded-l-full sm:text-base text-xs">
                👍🏻 {bigVideo?.statistics.likeCount}
              </button>
              <button className=" bg-gray-200    border-gray-700 py-2 md:px-4  px-1 rounded-r-full sm:text-base text-xs">
                👎🏻
              </button>
              <button className=" bg-gray-200  border-gray-700 py-2 sm:px-8 px-1 lg:ml-12 ml-2 rounded-full sm:text-base text-xs">
                 Share
              </button>
            </li>
            <li className="sm:text-base text-xs">
              {bigVideo?.statistics?.viewCount} veiws
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
