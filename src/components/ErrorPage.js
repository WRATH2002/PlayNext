import React from "react";
import { LuTimer } from "react-icons/lu";

const ErrorPage = () => {
  return (
    <div className="w-full h-[100svh] flex justify-center items-center bg-[#f3f3f3]">
      <div className="w-[calc(100%-40px)] md:w-[400px] lg:w-[400px] bg-[white] rounded-3xl flex flex-col p-[20px] py-[40px] drop-shadow-sm  justify-center items-center font-[roboto] font-normal">
        <span className="text-[60px] font-semibold  text-center ">
          <LuTimer className="text-[60px] text-[#0390fa]" />
        </span>
        <span className="text-[20px] font-semibold  text-center mt-[15px]">
          Oops! It seems like we have reached the YouTube API Limit
        </span>
        {/* <span className="text-[20px] font-semibold"></span> */}
        <span className="text-[15px] mt-[20px] text-[#676767] flex text-center w-[70%]">
          Sorry for the inconvenience, please visit after some time{" "}
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
