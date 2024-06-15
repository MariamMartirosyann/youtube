import React from "react";
import Skeleton from "@mui/material/Skeleton";
import ShimmerList from "./ShimmerList";
import ComentsShimmer from "./ComentsShimmer";

const WatchPageShimmer = () => {
  return (
    <div className="flex flex-row">
      <div className="mx-2 w-[70%] flex flex-col ">
        <Skeleton variant="rounded" width={1000} height={450} />
        <div className="flex flex-row my-2">

        {" "}
        <Skeleton variant="circular" width={40} height={40}  />
        <div className="flex flex-col w-[100%] ml-2 ">
          {" "}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
        
      </div>
      <ComentsShimmer/>
      <ComentsShimmer/>
      <ComentsShimmer/>
      <ComentsShimmer/>
      <ComentsShimmer/>
      <ComentsShimmer/>
      </div>
      <div className="w-[20%]">
        {" "}
        <ShimmerList />
      </div>
     
    </div>
  );
};

export default WatchPageShimmer;
