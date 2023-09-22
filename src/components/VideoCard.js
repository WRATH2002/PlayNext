import { Link } from "react-router-dom";
import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const VideoCard = (props) => {
  const [channelLogo, setChannelLogo] = useState("");

  useEffect(() => {
    getChannelLogo();
  }, []);

  const getChannelLogo = async () => {
    const data = await fetch(CHANNEL_LOGO_API + props.data.snippet.channelId);
    const json = await data.json();
    console.log(json);
    setChannelLogo(json?.items[0]?.snippet?.thumbnails?.default?.url);
  };

  return (
    <>
      <div className="m-0 md:m-[8px] lg:m-[8px] ">
        <img
          className="w-[370px] rounded-0 md:rounded-[15px] lg:rounded-[15px]"
          src={props.data.snippet.thumbnails.medium.url}
        ></img>
        <div className="flex items-start  mt-[10px] h-[140px]">
          <img
            className="rounded-full w-[40px] ml-[10px] lg:ml-0 md:ml-0"
            src={channelLogo}
          ></img>
          <div className="flex flex-col justify-start ml-[16px] ">
            <span className="w-[270px] lg:w-[300px] md:w-[300px] min-h-[24px] max-h-[51px] bg-white overflow-hidden text-ellipsis ">
              <b>{props.data.snippet.title}</b>
            </span>
            <span className="w-[270px] lg:w-[300px] md:w-[300px] ">
              {props.data.snippet.channelTitle}
            </span>
            <div className="w-[270px] lg:w-[300px] md:w-[300px] ">
              <span>{props.data.statistics.viewCount}</span>
              <span>{props.data.snippet.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
