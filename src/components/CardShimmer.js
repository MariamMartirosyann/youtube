import React from "react";

const CardShimmer = () => {
  return (
    <div className=" m-4 w-72 h-60 shadow-lg flex flex-col">
      <div className="w-72 h-40 bg-slate-400"></div>

      <div className="flex flex-row w-72 h-20 my-3">
        <div className="w-20 h-10 rounded  bg-slate-400 "></div>
        <div className=" ml-2 w-60 h-10 rounded  bg-slate-400">
          <div className=" w-60 my-2 h-7 rounded  bg-slate-400"></div>
          <div className=" w-60 my-2 h-7 rounded  bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};

export default CardShimmer;
