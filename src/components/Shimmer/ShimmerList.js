import React from "react";
import CardShimmer from "./CardShimmer";
import Skeleton from "@mui/material/Skeleton";
import ShimmerButtonList from "./ShimmerButtonList";

const ShimmerList = () => {
  return (
    <div>
     <ShimmerButtonList/>

      <div className="flex flex-wrap">
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
        <CardShimmer />
      </div>
    </div>
  );
};

export default ShimmerList;
