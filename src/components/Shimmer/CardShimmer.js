import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CardShimmer = () => {
  return (
  
    <div className="flex flex-col ml-5 mt-3">
      <Skeleton variant="rounded" width={210} height={100} />
      <div className="flex flex-row my-2">
        {" "}
        <Skeleton variant="circular" width={40} height={40}  />
        <div className="flex flex-col w-[80%] ml-2 ">
          {" "}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>
    </div>
  );
};

export default CardShimmer;
