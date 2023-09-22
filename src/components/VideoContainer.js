import { useEffect, useState } from "react";
import { VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="w-full p-0 md:p-[25px] lg:p-[25px] flex flex-wrap justify-center z-0">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard data={video} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default VideoContainer;
