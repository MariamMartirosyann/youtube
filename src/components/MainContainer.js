import React, { useEffect } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, closeSideListVidos } from "../utils/appSlice";
import SearchVideoList from "./SearchVideoList";

const MainContainer = () => {
  const dispatch = useDispatch();
  const isSearchListOpen = useSelector((store) => store.app.isSearchListOpen);
  const error = useSelector((store) => store.app.isError);

  useEffect(() => {
    dispatch(closeSideListVidos());
  }, []);

  return (
    <div className="flex flex-col ml-5">
      <ButtonList />
      {error ? <h1 className=" mx-auto mt-5 font-bold  text-red-700">{error}</h1> : null}
      {!isSearchListOpen ? <SearchVideoList /> : <VideoContainer />}
    </div>
  );
};

export default MainContainer;
