import React from 'react'
import Skeleton from "@mui/material/Skeleton";



const ComentsShimmer = () => {
  return (
    <div className="flex flex-row my-3">
    {" "}
    <Skeleton variant="circular" width={40} height={40}  />
    <div className="flex flex-col w-[100%] ml-2 ">
      {" "}
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
    
    </div>
  </div>)
}

export default ComentsShimmer