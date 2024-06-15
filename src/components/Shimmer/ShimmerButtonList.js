import React from 'react'
import Skeleton from "@mui/material/Skeleton";

const ShimmerButtonList = () => {
  return (
    <div className="flex flex-row ml-3">
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
    <div className="mx-2">
      {" "}
      <Skeleton variant="rounded" width={100} height={40} />
    </div>
  </div>
  )
}

export default ShimmerButtonList