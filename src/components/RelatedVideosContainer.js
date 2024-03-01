import { useState } from "react";
import { useEffect } from "react";
import RelatedVideos from "./RelatedVideos";
import { RELATED_SEARCH } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { RELATED_VIDEOS_ONE } from "../utils/constants";
import { RELATED_VIDEOS_TWO } from "../utils/constants";

const RelatedVideosContainer = () => {
  const [relatedVideos, setRelatedVideos] = useState([]);

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
      <div className="w-full h-[105px] flex flex-col">
        <RelatedVideos />
      </div>
    </>
  );
};

export default RelatedVideosContainer;
