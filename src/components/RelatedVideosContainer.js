import { useState } from "react";
import { useEffect } from "react";
import RelatedVideos from "./RelatedVideos";
import {
  API_KEY,
  RELATED_SEARCH,
  RELATED_VIDEOS_1,
  RELATED_VIDEOS_2,
  VIDEO_API,
  nameList,
} from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { RELATED_VIDEOS_ONE } from "../utils/constants";
import { RELATED_VIDEOS_TWO } from "../utils/constants";
import RelatedVideoShimmer from "./RelatedVideoShimmer";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";

const RelatedVideosContainer = (props) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [videos, setVideos] = useState([]);

  const [searchParams] = useSearchParams();
  console.log("latest");
  console.log(searchParams.get("v"));

  const fetchRelatedVideos = async () => {
    const data = await fetch(VIDEO_API);
    const json = await data.json();

    setRelatedVideos(json?.items);
  };

  // const getVideos = async () => {
  //   const data = await fetch(VIDEO_API);
  //   const json = await data.json();
  //   console.log("Home Screen Video API is called ... under 'VideoContainer'");
  //   setVideos(json.items);
  // };

  useEffect(() => {
    fetchRelatedVideos();
  }, []);

  // useEffect(() => {
  //   getRelatedVideos();
  // }, []);

  // const getRelatedVideos = async () => {
  //   const data = await fetch(RELATED_SEARCH + searchParams.get("v"));
  //   const json = await data.json();
  //   console.log("related videos");
  //   console.log(json);
  //   // setRelatedVideos(json?.items);
  // };
  return (
    <>
      <div className="w-full h-auto flex flex-col bg-[#ffffff] p-[0px] md:p-[20px] lg:p-[20px] pb-[0px] rounded-none md:rounded-2xl lg:rounded-2xl drop-shadow-none md:drop-shadow-sm lg:drop-shadow-sm mb-[20px]">
        {videos.length == undefined ? (
          <>
            <div className="h-[40px]  w-full  hidden md:flex lg:flex justify-start items-center overflow-x-scroll font-medium font-[robotoT] bg-white mb-[20px]">
              {Array(9)
                .fill(" ")
                ?.map((e, index) => {
                  return (
                    <div className="h-full w-[60px] px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#242424] whitespace-nowrap cursor-pointer text-white sticky top-0"></div>
                  );
                })}
            </div>
            {Array(9)
              .fill(" ")
              ?.map((e, index) => {
                return (
                  <div
                    className="w-full md:w-full lg:w-full  mb:[20px] lg:mb-[10px] md:mb-[10px] "
                    // key={vide.id}
                    // to={"/watch?v=" + vide.id}
                  >
                    <RelatedVideoShimmer />
                  </div>
                );
              })}

            {Array(9)
              .fill(" ")
              ?.map((e, index) => {
                return (
                  <div
                    className="w-full md:w-full lg:w-full m-0  mb:[20px] lg:mb-[10px] md:mb-[10px] "
                    // key={vide.id}
                    // to={"/watch?v=" + vide.id}
                  >
                    <VideoCardShimmer />
                  </div>
                );
              })}

            {/* <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0 bg-transparent bg-[#0f0f0f]">
              {Array(9)
                .fill(" ")
                ?.map((e, index) => {
                  return (
                    <div
                      className="w-full md:w-[370px] lg:w-[370px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[40px] md:mb-[40px] z-0 block md:hidden lg:hidden"
                      // key={vide.id}
                      // to={"/watch?v=" + vide.id}
                    >
                      <RelatedVideoShimmer />
                    </div>
                  );
                })}
              
            </div> */}
          </>
        ) : (
          <>
            <div className="w-full flex justify-start items-center mb-[10px] md:mt-0 lg:mt-0 mt-[-10px] font-semibold text-[18px] px-[10px] md:px-0 lg:px-0 font-[roboto]">
              Related Videos
            </div>
            <div className="h-[40px]  w-full  hidden md:flex lg:flex justify-start items-center overflow-x-scroll font-medium font-[robotoT] bg-white mb-[15px]">
              {/* <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#5c5c5c] whitespace-nowrap cursor-pointer text-white sticky top-0">
                All
              </div> */}
              <Link
                className="h-full w-auto  px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer"
                // key={index}
                to={"/search?v=" + props?.chaName}
              >
                From {props?.chaName}
              </Link>
              {/* <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer">
                Related
              </div> */}
              {props?.tags?.map((data, index) => {
                return (
                  <Link
                    className="h-full whitespace-nowrap w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] cursor-pointer"
                    key={index}
                    to={"/search?v=" + data}
                  >
                    {data}
                  </Link>
                );
              })}
            </div>
            {/* <div className="h-[55px]   w-full p-[10px] py-[10px] flex md:hidden lg:hidden justify-start items-center overflow-x-scroll font-medium font-[robotoT]"></div> */}
            {relatedVideos?.map((vide) => (
              <Link
                className="w-full md:w-full lg:w-full mb:[20px] lg:mb-[10px] md:mb-[10px] hidden md:block lg:block"
                key={vide.id}
                to={"/watch?v=" + vide.id}
              >
                <RelatedVideos data={vide} />
              </Link>
            ))}

            <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0 bg-transparent bg-[#ffffff]">
              {relatedVideos?.map((video) => (
                <Link
                  className="w-full md:w-full lg:w-full mb:[20px] lg:mb-[40px] md:mb-[40px] z-0 block md:hidden lg:hidden"
                  key={video.id}
                  to={"/watch?v=" + video.id}
                >
                  <VideoCard data={video} />
                </Link>
              ))}
            </div>
          </>
        )}
        {/* < /> */}
      </div>
    </>
  );
};

export default RelatedVideosContainer;
