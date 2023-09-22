import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SEARCH_BY_ID,
  SUBSCRIBERS_COUNT,
  CHANNEL_LOGO_API,
} from "../utils/constants";

import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { BiSolidDownload } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";

// import { formatNumber } from "../utils/helper";
// import {
//   HandThumbDownIcon,
//   HandThumbUpIcon,
//   ShareIcon,
//   ArrowDownTrayIcon,
// } from "@heroicons/react/24/outline";
// import {}
// import { CHANNEL_LOGO_API } from "./constants";
import { useSelector } from "react-redux";
import { BiLike, BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";

const VideoDescription = (props) => {
  // const [params] = useSearchParams();
  // const id = useSelector((store) => store.videoDetails.id);
  // const [videoId, setVideoId] = useState(id);
  const [videoInfo, setVideoInfo] = useState([]);
  const { snippet, statistics } = videoInfo;
  const [channelLogo, setChannelLogo] = useState("");
  const [subscribersCount, setSubscribersCount] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const result = async () => {
    // const data = await fetch(SEARCH_BY_ID + videoId);
    const data = await fetch(SEARCH_BY_ID + props.id);
    const json = await data.json();
    console.log("result");
    console.log(json);
    setVideoInfo(json?.items[0]);
  };

  const getChannelLogo = async () => {
    const data = await fetch(CHANNEL_LOGO_API + snippet.channelId);
    const jsonData = await data.json();
    console.log("logo");
    console.log(jsonData);
    setChannelLogo(jsonData?.items[0]?.snippet?.thumbnails?.default?.url);
  };

  const getSubscribersCount = async () => {
    const data = await fetch(SUBSCRIBERS_COUNT + snippet.channelId);
    const jsonData = await data.json();
    console.log("sub count");
    console.log(jsonData);
    setSubscribersCount(jsonData?.items[0].statistics.subscriberCount);
  };

  useEffect(() => {
    // setVideoId(params.get("v"));
    result();
  }, [props.id]);

  useEffect(() => {
    if (videoInfo.length !== 0) {
      getChannelLogo();
      getSubscribersCount();
    }
  }, [videoInfo]);

  const showMore = () => {
    setShowDescription(!showDescription);
  };

  function roundSubscriber(subscribersCount) {
    if (subscribersCount / 1000000 != 0) {
      setSubscribersCount(subscribersCount / 1000000);
    } else if (subscribersCount / 100000 != 0) {
      setSubscribersCount(subscribersCount / 100000);
    } else if (subscribersCount / 1000 != 0) {
      setSubscribersCount(subscribersCount / 1000);
    } else {
      setSubscribersCount(subscribersCount);
    }
  }

  if (videoInfo.length === 0) return;

  return (
    <>
      <div className="w-full  mt-[17px] flex flex-col">
        <span className="w-full font-bold text-[18px] h-[60px] md:h-[30px]  lg:h-[30px] px-[10px] lg:px-0 md:px-0 overflow-hidden ">
          {videoInfo?.snippet?.title}
        </span>
        <div className="h-[85px] lg:h-[40px] md:h-[40px] items-center w-full flex flex-col lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start  mt-[10px]">
          <div className="flex w-full lg:w-[50%] md:w-[50%] justify-between md:justify-start lg:justify-start items-center px-[10px] lg:px-0 md:px-0">
            <div className="flex justify-start items-center ">
              <img
                alt="channel_logo"
                src={channelLogo}
                className="flex justify-start items-center h-9 w-9 rounded-full"
              />
              <div className="flex flex-col justify-center items-start h-[35px] ml-[15px]">
                <span className="font-semibold flex justify-start text-ellipsis whitespace-nowrap items-center w-[90%] lg:w-[100%] md:w-[100%] h-[20px] overflow-hidden">
                  {videoInfo?.snippet?.channelTitle}
                </span>
                <span className="text-[12px] flex justify-center items-start">
                  {subscribersCount / 1000000 != 0 ? (
                    <>{subscribersCount / 1000000}M subscribers</>
                  ) : subscribersCount / 100000 != 0 ? (
                    <>{subscribersCount / 100000}L subscribers</>
                  ) : subscribersCount / 1000 != 0 ? (
                    <>{subscribersCount / 1000}K subscribers</>
                  ) : (
                    <>{subscribersCount} subscribers</>
                  )}
                  {/* {subscribersCount}K subscribers */}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className="flex justify-center items-center  border border-[#dcdcdc] bg-[white] rounded-full px-[14px] h-[35px]  ml-[20px] text-[13px] font-semibold hover:bg-[#dedede]">
                Join
              </button>
              <button className="flex justify-center items-center border-none  rounded-full px-[14px] h-[35px]  ml-[10px] text-[13px] font-semibold bg-[#f1f1f1] hover:bg-[#dedede]">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex w-full lg:w-[50%] md:w-[50%]  justify-between md:justify-end lg:justify-end items-center px-[10px] lg:px-0 md:px-0">
            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full px-[14px] h-[35px]  ml-[10px] text-[13px] font-semibold bg-[#f1f1f1] hover:bg-[#dedede]">
              <BiSolidLike className="text-[19px] mr-[6px]" />
              <span>
                {videoInfo?.statistics?.likeCount / 1000000 != 0 ? (
                  <>{videoInfo?.statistics?.likeCount / 1000000}M</>
                ) : videoInfo?.statistics?.likeCount / 100000 != 0 ? (
                  <>{videoInfo?.statistics?.likeCount / 100000}L</>
                ) : videoInfo?.statistics?.likeCount / 1000 != 0 ? (
                  <>{videoInfo?.statistics?.likeCount / 1000}K</>
                ) : (
                  <>{videoInfo?.statistics?.likeCount}</>
                )}
                {/* {videoInfo?.statistics?.likeCount} */}
              </span>
              <div className="h-[60%] mx-[6px] border border-[#dcdcdc]"></div>
              <BiSolidDislike className="text-[19px]" />
            </button>

            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full px-[14px] h-[35px]  ml-[10px] text-[13px] font-semibold bg-[#f1f1f1] hover:bg-[#dedede]">
              <IoMdShareAlt className="text-[19px] mr-[6px]" /> Share
            </button>
            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full px-[14px] h-[35px]  ml-[10px] text-[13px] font-semibold bg-[#f1f1f1] hover:bg-[#dedede]">
              <BiSolidDownload className="text-[19px] mr-[6px]" /> Download
            </button>
            <button className="hidden md:flex lg:flex justify-center items-center border-none whitespace-nowrap rounded-full  w-[35px] h-[35px]  ml-[10px] text-[13px] font-semibold bg-[#f1f1f1] hover:bg-[#dedede]">
              <BiDotsVerticalRounded className="text-[19px] " />
            </button>
          </div>
        </div>
        {showDescription === false ? (
          <>
            <div
              className="w-full p-[15px] h-[100px] lg:bg-[#f1f1f1] md:bg-[#f1f1f1] rounded-xl mt-[10px] text-ellipsis "
              onClick={() => showMore()}
              style={{ transition: ".3s" }}
            >
              <pre className="h-full p-[15px] lg:p-0 md:p-0 w-full rounded-xl bg-[#f1f1f1] lg:bg-transparent md:bg-transparent overflow-x-auto whitespace-pre-wrap break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] overflow-hidden">
                {snippet.description}
              </pre>
            </div>
          </>
        ) : (
          <div
            className="w-full p-[15px] h-auto lg:bg-[#f1f1f1] md:bg-[#f1f1f1] rounded-xl mt-[10px] text-ellipsis"
            onClick={() => showMore()}
            style={{ transition: ".3s" }}
          >
            <pre className="h-full  p-[15px] lg:p-0 md:p-0 w-full rounded-xl bg-[#f1f1f1] lg:bg-transparent md:bg-transparent overflow-x-auto whitespace-pre-wrap break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] ">
              {snippet.description}
            </pre>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col pl-3 ml-2 w-[1000px]">
        <span className="font-semibold text-xl">{snippet.title}</span>

        <div className="flex justify-between items-center my-4">
          <span>{videoInfo.snippet.title}</span>
          <div className="flex items-center">
            <div className="flex flex-col pl-2">
              <span className="font-semibold">{snippet.channelTitle}</span>
              <span className="text-xs">
                {formatNumber(subscribersCount)} subscribers
              </span>
            </div>

            <button className="bg-black text-white rounded-3xl text-sm py-2 px-5 mx-6 font-semibold h-9 flex items-center">
              Subscribe
            </button>
          </div>

          <div className="flex items-center">
            <span className="flex bg-gray-200 w-40 h-9 rounded-3xl p-2">
              <span className="flex justify-center items-center font-semibold text-sm w-2/3  h-full">
                <BiLike className="h-5 w-5" />
                <span className="px-2">{formatNumber(statistics.likeCount)}</span>
              </span>
              <span className="flex justify-center items-center border border-l-black w-1/3  h-full">
                <BiDislike className="h-5 w-5" />
              </span>
            </span>

            <span className="flex justify-center items-center h-9 w-28 bg-gray-200 rounded-3xl p-2 ml-2">
              <PiShareFatLight className="h-5 w-5 mx-1" />
              <span className="font-semibold mx-1">Share</span>
            </span>

            <span className="flex justify-center items-center h-9 w-36 bg-gray-200 rounded-3xl p-2 ml-2">
              <ArrowDownTrayIcon className="h-5 w-5 mx-1" />
              <span className="font-semibold mx-1">Download</span>
            </span>
          </div>
        </div>

        <div>
          <pre
            className={`bg-gray-200 rounded-xl p-3 my-2 w-full overflow-x-auto whitespace-pre-wrap break-words font-sans text-sm ${
              showDescription
                ? ""
                : `h-28 cursor-pointer overflow-hidden text-ellipsis line-clamp-5 hover:bg-gray-300`
            }`}
            onClick={showMore}
          >
            {snippet.description}
          </pre>
        </div>
      </div> */}
    </>
  );
};

export default VideoDescription;
