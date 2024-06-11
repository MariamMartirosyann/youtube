import React from "react";

const ComentPage = ({ info }) => {
  if (!info) return;
  const { snippet } = info;

  return (
    <div className="hidden mt-5  xl:block">
      <div className="w-50 h-50 mr-4   my-auto">
        {snippet?.topLevelComment?.snippet?.authorProfileImageUrl ? (
          <img
            src={snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
            alt="image"
            className=" rounded-full"
          />
        ) : (
          <img
            src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg"
            alt="image"
            className=" rounded-full"
          />
        )}
      </div>
      <ul className=" w-[900px] ">
        <li className=" font-bold my-1">
          {snippet?.topLevelComment?.snippet?.authorDisplayName}
        </li>
        <li className=" text-lg ">
          {snippet?.topLevelComment?.snippet?.textDisplay}
        </li>
        <li className="my-1">
          {" "}
          <button className="  mr-7 ">
            👍🏻 {snippet?.topLevelComment?.snippet?.likeCount}
          </button>
          <button className="mr-10">👎🏻</button>
          <button> Answer</button>
        </li>
      </ul>
    </div>
  );
};

export default ComentPage;
