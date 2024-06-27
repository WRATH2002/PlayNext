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
      <div className="w-[calc(100%-40px)] rounded-2xl ml-[20px] p-0 md:p-[20px] lg:p-[20px] my-[20px]  flex flex-wrap justify-center z-0 drop-shadow-sm bg-[#ffffff] border border-[#eeeeee] ">
        {Array(9)
          .fill(" ")
          ?.map((e, index) => {
            return (
              <div
                key={index}
                className="w-full md:w-[320px] lg:w-[320px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[40px] md:mb-[40px] "
              >
                <VideoCardShimmer />
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <>
      <div className="w-[calc(100%-40px)] rounded-2xl ml-[20px] p-0 md:p-[20px] lg:p-[20px] my-[20px]  flex flex-wrap justify-center z-0 drop-shadow-sm bg-[#ffffff] border border-[#eeeeee] ">
        {videos?.map((video) => (
          <Link
            className="w-full md:w-[320px] lg:w-[320px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[20px] md:mb-[20px] "
            key={video.id}
            to={"/watch?v=" + video.id}
          >
            <VideoCard data={video} />
          </Link>
        ))}

        {/* {Array(9)
          .fill(" ")
          ?.map((e, index) => {
            return (
              <Link
                className="w-full md:w-[370px] lg:w-[370px] m-0 md:mx-[8px] lg:mx-[8px] mb:[20px] lg:mb-[20px] md:mb-[20px] "
                // key={video.id}
                // to={"/watch?v=" + video.id}
              >
                <VideoCard data={"daaf"} />
              </Link>
            );
          })} */}
      </div>
    </>
  );
};

export default VideoContainer;
