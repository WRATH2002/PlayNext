import { Link } from "react-router-dom";
import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const VideoCard = (props) => {
  const [channelLogo, setChannelLogo] = useState("");
  const [duration, setDuration] = useState("");

  function changeDuration() {
    var temp = props.data.contentDetails.duration;
    var tempTwo = temp.replace("PT", "");
    var tempThree = tempTwo.replace("M", ":");
    var tempThree = tempThree.replace("S", "");
    console.log(tempThree);
    setDuration(tempThree);
  }

  useEffect(() => {
    getChannelLogo();
    changeDuration();
  }, []);

  const getChannelLogo = async () => {
    const data = await fetch(CHANNEL_LOGO_API + props.data.snippet.channelId);
    const json = await data.json();
    console.log(json);
    setChannelLogo(json?.items[0]?.snippet?.thumbnails?.default?.url);
  };

  return (
    <>
      <div className="">
        <img
          className="w-[370px] rounded-0 md:rounded-[15px] lg:rounded-[15px]"
          src={props?.data?.snippet?.thumbnails?.medium?.url}
        ></img>
        <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
          {/* {changeDuration()} */}
          {/* {setDuration(props.data.contentDetails.duration.replace("PT", ""))} */}
          <span className="text-[white] text-[13px] px-[8px] rounded-md bg-[#000000bf]">
            {duration}
          </span>
          {/* <span>{props.data.contentDetails.duration}</span> */}
        </span>
        <div className="flex items-start  mt-[10px] h-[90px]">
          <img
            className="rounded-full w-[40px] ml-[10px] lg:ml-0 md:ml-0"
            src={channelLogo}
          ></img>
          <div className="flex flex-col justify-start ml-[16px] ">
            <span className=" w-[270px] text-[15px]  lg:w-[300px] md:w-[300px] min-h-[20px] max-h-[46px] lg:min-h-[24px]  lg:max-h-[46px] md:min-h-[24px] md:max-h-[46px]  overflow-hidden text-ellipsis ">
              <b>{props.data.snippet.title}</b>
            </span>

            <div className="w-[270px] lg:w-[300px] md:w-[300px] flex flex-row lg:flex-col md:flex-col text-[#6a6a6a] ">
              <span className="text-[13px]">
                {props.data.snippet.channelTitle}
              </span>
              <span className=" flex lg:hidden md:hidden justify-center items-center mx-[5px] mt-[-2px]">
                •
              </span>
              <span className=" text-[13px]">
                {Math.floor(props.data.statistics.viewCount / 1000000) != 0 ? (
                  <>{(props.data.statistics.viewCount / 1000000).toFixed(2)}M</>
                ) : Math.floor(props.data.statistics.viewCount / 100000) !=
                  0 ? (
                  <>{(props.data.statistics.viewCount / 100000).toFixed(2)}L</>
                ) : Math.floor(props.data.statistics.viewCount / 1000) != 0 ? (
                  <>{(props.data.statistics.viewCount / 1000).toFixed(2)}K</>
                ) : (
                  <>{props.data.statistics.viewCount.toFixed(2)}</>
                )}{" "}
                views
                {/* {props.data.statistics.viewCount} */}
              </span>
              <span className=" text-[13px]">
                {/* {props.data.snippet.likeCount} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
