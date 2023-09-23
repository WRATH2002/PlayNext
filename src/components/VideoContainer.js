import { useEffect, useState } from "react";
import { VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import VideoCardShimmer from "./VideoCardShimmer";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(VIDEO_API);
    const json = await data.json();
    console.log(json);
    setVideos(json.items);
  };

  return videos.length == 0 ? (
    <>
      <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0">
        {Array(9)
          .fill(" ")
          .map((e, index) => {
            return (
              <div key={index} className="m-0 md:m-[8px] lg:m-[8px]">
                <VideoCardShimmer />
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <>
      <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0">
        {videos.map((video) => (
          <Link
            className="m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[40px] md:mb-[40px] "
            key={video.id}
            to={"/watch?v=" + video.id}
          >
            <VideoCard data={video} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default VideoContainer;
