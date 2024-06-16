import React, { useEffect } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeSideListVidos } from "../utils/appSlice";
import SearchVideoList from "./SearchVideoList";

const MainContainer = () => {
  const dispatch = useDispatch();
  const isSearchListOpen = useSelector((store) => store.app.isSearchListOpen);

  useEffect(() => {
    dispatch(closeSideListVidos());
  }, []);

  return (
    <div className="flex flex-col ml-5">
      <ButtonList />

      {!isSearchListOpen ? <SearchVideoList /> : <VideoContainer />}
    </div>
  );
};

export default MainContainer;
