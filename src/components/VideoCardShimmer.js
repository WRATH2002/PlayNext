import { Link } from "react-router-dom";
import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const VideoCardShimmer = () => {
  return (
    <>
      <div className="mb:[20px] lg:mb-[40px] md:mb-[40px] ">
        <div className="w-[370px] h-[209px] rounded-0 md:rounded-[15px] lg:rounded-[15px] bg-[#adadad]"></div>
        <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
          {/* {changeDuration()} */}
          {/* {setDuration(props.data.contentDetails.duration.replace("PT", ""))} */}
          <span className="text-[white] bg-[#adadad] text-[13px] px-[8px] rounded-md bg-[#000000bf]"></span>
          {/* <span>{props.data.contentDetails.duration}</span> */}
        </span>
        <div className="flex items-start  mt-[10px] h-[90px]">
          <div className="rounded-full bg-[#adadad] w-[40px] h-[40px] ml-[10px] lg:ml-0 md:ml-0"></div>
          <div className="flex flex-col justify-start ml-[16px] ">
            <span className=" w-[270px] text-[15px]  lg:w-[300px] md:w-[300px] h-[18px] rounded-sm  overflow-hidden text-ellipsis bg-[#adadad] "></span>

            <div className="w-[270px] lg:w-[300px] md:w-[300px] flex flex-col text-[#6a6a6a] ">
              <span className="bg-[#adadad] mt-[10px] h-[18px] rounded-sm w-[270px]  lg:w-[300px] md:w-[300px]"></span>

              <span className=" w-[120px] rounded-sm mt-[10px]  bg-[#adadad] lg:w-[180px] md:w-[180px]bg-[#adadad] h-[18px]">
                {/* {props.data.statistics.viewCount} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCardShimmer;
