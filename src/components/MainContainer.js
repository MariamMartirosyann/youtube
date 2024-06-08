import React, { useEffect } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, closeSideListVidos } from "../utils/appSlice";
import SearchVideoList from "./SearchVideoList";

const MainContainer = () => {
  const dispatch = useDispatch();
  const isSearchListOpen = useSelector((store) => store.app.isSearchListOpen);

  useEffect(() => {
    dispatch(closeSideListVidos());
  }, []);

  return (
    <div className="flex flex-col">
      <ButtonList />

      {!isSearchListOpen ? <SearchVideoList /> : <VideoContainer />}
    </div>
  );
};

export default MainContainer;
