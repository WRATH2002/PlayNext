import React from "react";

const SearchVideoCardShimmer = () => {
  return (
    <>
      <div className="w-full h-auto  text-white  hidden md:flex lg:flex mb-[17px] font-[roboto] ">
        <div className="min-w-[350px] rounded-[10px] flex justify-center items-center ">
          <div className="min-w-[350px] h-[190px] rounded-[10px] bg-[#3a3a3a]"></div>
        </div>
        <div className="w-[calc(100%-370px)] flex flex-col justify-start items-start ml-[20px]">
          <div className="min-w-[500px] rounded-md min-h-[27px] bg-[#3a3a3a]"></div>
          <div className="min-w-[300px] rounded-md min-h-[25px] bg-[#3a3a3a] mt-[10px] "></div>
          {/* <span>ssGFRbS</span> */}
          <div className="w-full h-[50px] flex justify-start items-center ">
            <div className="w-[33px] h-[33px] bg-[#222222] rounded-full mr-[10px]">
              <div
                className="w-[33px] h-[33px] rounded-full bg-[#3a3a3a]"

                // onError={(this.style.display = "none")}
              ></div>
            </div>
            <span className=" text-[12.8px] text-[#aaaaaa] bg-[#3a3a3a] h-[25px] rounded-md min-w-[200px]"></span>
          </div>
          <span className="text-[12.8px] text-[#aaaaaa]  h-[35px] w-full overflow-hidden line-clamp-2 text-ellipsis">
            description
          </span>
        </div>
      </div>

      <div className="w-full p-0 flex flex-col md:hidden lg:hidden">
        <div className="w-full rounded-0 bg-[#3a3a3a] h-[230px]"></div>

        <div className="flex items-start  mt-[10px] h-[90px] w-full">
          <div className="rounded-full w-[40px] ml-[10px] lg:ml-0 md:ml-0"></div>
          <div className="flex flex-col justify-start ml-[16px] w-[calc(100%-66px)]  md:w-[calc(100%-56px)] lg:w-[calc(100%-56px)]  ">
            <span className=" w-full text-[15px]  lg:w-[300px] md:w-[300px] min-h-[20px] max-h-[46px] lg:min-h-[24px]  lg:max-h-[46px] md:min-h-[24px] md:max-h-[46px]  overflow-hidden line-clamp-2 text-ellipsis text-[white] font-[roboto] font-[300] ">
              Titel
            </span>

            <div className="w-full lg:w-[300px] md:w-[300px] flex flex-row lg:flex-col md:flex-col text-[11.8px] md:text-[12.8px] lg:text-[12.8px] text-[#aaaaaa] font-[roboto] font-[300] tracking-wider justify-start items-center md:justify-center md::items-start lg:justify-center lg:items-start">
              <span className="max-w-[45%] h-[15px] text-ellipsis overflow-hidden w-auto flex justify-start items-center  ">
                ChannelTitle
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchVideoCardShimmer;
