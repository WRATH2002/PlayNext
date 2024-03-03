import React from "react";
const RelatedVideoShimmer = () => {
  return (
    <div className="w-full h-auto flex flex-col lg:flex-row md:flex-row">
      <div
        //   src={props?.data?.snippet?.thumbnails?.medium?.url}
        className="w-full md:w-[175px] lg:w-[175px] h-[98px] bg-[#3a3a3a] rounded-lg"
      ></div>
      <div className=" w-full md:w-[calc(100%-175px)]  lg:w-[calc(100%-175px)] pl-[10px] flex flex-col text-[#aaaaaa] font-[roboto]">
        <span className=" w-full min-h-[25px] rounded-sm max-h-[42px] text-15px  text-[14px] flex items-start justify-start overflow-hidden bg-[#3a3a3a] text-white line-clamp-2 text-ellipsis ">
          {/* {props.data.snippet.title} */}
        </span>
        <span className=" w-[70%] h-[20px] text-[12px] mt-[6px] rounded-sm bg-[#3a3a3a]">
          {/* Sony Live */}
        </span>
        {/* <div className="mt-[-3px]"> */}
        <span className=" w-[50%] h-[20px] text-[12px] bg-[#3a3a3a] mt-[6px] rounded-sm">
          {/* {Math.floor(props.data.statistics.viewCount / 1000000) != 0 ? (
                <>{(props.data.statistics.viewCount / 1000000).toFixed(2)}M</>
              ) : Math.floor(props.data.statistics.viewCount / 100000) != 0 ? (
                <>{(props.data.statistics.viewCount / 100000).toFixed(2)}L</>
              ) : Math.floor(props.data.statistics.viewCount / 1000) != 0 ? (
                <>{(props.data.statistics.viewCount / 1000).toFixed(2)}K</>
              ) : (
                <>{props.data.statistics.viewCount.toFixed(2)}</>
              )}{" "}
              views */}
        </span>
        {/* <span className=" w-full h-[20px] text-[12px]">•</span>
          <span className=" w-full h-[20px] text-[12px]"></span>
        </div> */}
      </div>
    </div>
  );
};

export default RelatedVideoShimmer;
