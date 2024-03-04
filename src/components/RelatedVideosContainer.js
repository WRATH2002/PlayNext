import { useState } from "react";
import { useEffect } from "react";
import RelatedVideos from "./RelatedVideos";
import { RELATED_SEARCH, VIDEO_API } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { RELATED_VIDEOS_ONE } from "../utils/constants";
import { RELATED_VIDEOS_TWO } from "../utils/constants";
import RelatedVideoShimmer from "./RelatedVideoShimmer";
import VideoCard from "./VideoCard";

const RelatedVideosContainer = () => {
  const [relatedVideos, setRelatedVideos] = useState([]);
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

  const [searchParams] = useSearchParams();
  console.log("latest");
  console.log(searchParams.get("v"));

  useEffect(() => {
    getRelatedVideos();
  }, []);

  const getRelatedVideos = async () => {
    const data = await fetch(RELATED_SEARCH + searchParams.get("v"));
    const json = await data.json();
    console.log("related videos");
    console.log(json);
    // setRelatedVideos(json?.items);
  };
  return (
    <>
      <div className="w-full h-auto flex flex-col">
        {videos === undefined ? (
          <>
            {Array(9)
              .fill(" ")
              ?.map((e, index) => {
                return (
                  <div
                    className="w-full md:w-[370px] lg:w-[370px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[3px] md:mb-[3px] "
                    // key={vide.id}
                    // to={"/watch?v=" + vide.id}
                  >
                    <RelatedVideoShimmer />
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
            {videos?.map((vide) => (
              <Link
                className="w-full md:w-[370px] lg:w-[370px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[3px] md:mb-[3px] hidden md:block lg:block"
                key={vide.id}
                to={"/watch?v=" + vide.id}
              >
                <RelatedVideos data={vide} />
              </Link>
            ))}

            <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0 bg-transparent bg-[#0f0f0f]">
              {videos?.map((video) => (
                <Link
                  className="w-full md:w-[370px] lg:w-[370px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[40px] md:mb-[40px] z-0 block md:hidden lg:hidden"
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
