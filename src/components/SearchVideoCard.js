import React from 'react'

const SearchVideoCard = ({data}) => {
  return (
    <div className="p-2 m-2 w-full  flex flex-row">
      <img
        className=" rounded-lg"
        alt="thumbnail"
        src={data?.snippet?.thumbnails?.high?.url}
      />
      
      <ul className="ml-5">
        <li className=" font-bold py-2">{data?.snippet?.title}</li>
        <li>{data?.snippet?.channelTitle}</li>
      </ul>
      </div>
  )
}

export default SearchVideoCard