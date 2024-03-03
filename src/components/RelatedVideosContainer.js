import { useState } from "react";
import { useEffect } from "react";
import RelatedVideos from "./RelatedVideos";
import { RELATED_SEARCH, VIDEO_API } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { RELATED_VIDEOS_ONE } from "../utils/constants";
import { RELATED_VIDEOS_TWO } from "../utils/constants";
import RelatedVideoShimmer from "./RelatedVideoShimmer";

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
          </>
        ) : (
          <>
            {videos?.map((vide) => (
              <Link
                className="w-full md:w-[370px] lg:w-[370px] m-0 md:m-[8px] lg:m-[8px] mb:[20px] lg:mb-[3px] md:mb-[3px] "
                key={vide.id}
                to={"/watch?v=" + vide.id}
              >
                <RelatedVideos data={vide} />
              </Link>
            ))}
          </>
        )}
        {/* < /> */}
      </div>
    </>
  );
};

export default RelatedVideosContainer;
