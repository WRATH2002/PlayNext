import { Link } from "react-router-dom";
import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const VideoCardShimmer = () => {
  return (
    <>
      <div className="w-full ">
        <div className="w-full md:w-[370px] lg:w-[370px] rounded-0 md:rounded-[10px] lg:rounded-[10px] bg-[#3a3a3a] h-[209px]"></div>
        <div className="flex items-start  mt-[10px] h-[90px] w-full">
          <div className="rounded-full w-[40px] h-[40px] ml-[10px] lg:ml-0 md:ml-0 bg-[#3a3a3a]"></div>
          <div className="flex flex-col justify-start ml-[16px] w-[calc(100%-66px)]  md:w-[calc(100%-56px)] lg:w-[calc(100%-56px)]  ">
            <span className=" w-[calc(100%-10px)] text-[15px]  lg:w-[300px] md:w-[300px] h-[28px] bg-[#3a3a3a]  rounded-none md:rounded-sm lg:rounded-sm"></span>

            {/* <div className="w-full lg:w-[300px] md:w-[300px] flex flex-row lg:flex-col md:flex-col justify-start items-center md:justify-center md::items-start lg:justify-center lg:items-start mt-[10px]"> */}
            <span className=" w-[calc(100%-10px)] text-[15px]  lg:w-[300px] md:w-[300px] h-[28px] bg-[#3a3a3a] mt-[10px] rounded-none md:rounded-sm lg:rounded-sm"></span>
            {/* <span className="w-[calc(100%-26px)] bg-[#3a3a3a] h-[28px]"></span>
              <span className="w-[calc(100%-26px)] bg-[#3a3a3a] h-[28px]"></span> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCardShimmer;
