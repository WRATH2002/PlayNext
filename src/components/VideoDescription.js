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
import { RxCross2 } from "react-icons/rx";
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
  const [view, setView] = useState(0);
  const [like, setLike] = useState(0);
  const [commaL, setCommaL] = useState("");
  const [commaV, setCommaV] = useState("");

  const [duration, setDuration] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    console.log("propssssssssssssssssssssss");
    console.log(props);
    if (date.length != 0) {
      calculateDurationFromDate(date);
    }
  }, [date]);

  function calculateDurationFromDate(dateString) {
    // Parse the string into a Date object
    let startDate = new Date(dateString);
    let endDate = new Date();

    // Calculate the difference in milliseconds
    let difference = endDate - startDate;

    // Convert milliseconds to appropriate units
    let millisecondsPerSecond = 1000;
    let millisecondsPerMinute = millisecondsPerSecond * 60;
    let millisecondsPerHour = millisecondsPerMinute * 60;
    let millisecondsPerDay = millisecondsPerHour * 24;
    let millisecondsPerWeek = millisecondsPerDay * 7;
    let millisecondsPerMonth = millisecondsPerDay * 30; // Approximation
    let millisecondsPerYear = millisecondsPerDay * 365; // Approximation

    let years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    if (difference >= millisecondsPerYear) {
      years = Math.floor(difference / millisecondsPerYear);
      setYear(years);
      difference %= millisecondsPerYear;
    }
    if (difference >= millisecondsPerMonth) {
      months = Math.floor(difference / millisecondsPerMonth);
      setMonth(months);
      difference %= millisecondsPerMonth;
    }
    if (difference >= millisecondsPerWeek) {
      weeks = Math.floor(difference / millisecondsPerWeek);
      setWeek(weeks);
      difference %= millisecondsPerWeek;
    }
    if (difference >= millisecondsPerDay) {
      days = Math.floor(difference / millisecondsPerDay);
      setDay(days);
      difference %= millisecondsPerDay;
    }
    if (difference >= millisecondsPerHour) {
      hours = Math.floor(difference / millisecondsPerHour);
      setHour(hours);
      difference %= millisecondsPerHour;
    }
    if (difference >= millisecondsPerMinute) {
      minutes = Math.floor(difference / millisecondsPerMinute);
      setMinute(minutes);
      difference %= millisecondsPerMinute;
    }
    if (difference >= millisecondsPerSecond) {
      seconds = Math.floor(difference / millisecondsPerSecond);
      setSecond(seconds);
    }
  }

  const result = async () => {
    // const data = await fetch(SEARCH_BY_ID + videoId);
    const data = await fetch(SEARCH_BY_ID + props.id);
    const json = await data.json();
    console.log("result");
    console.log(json);
    setVideoInfo(json?.items[0]);
    let cView = addCommas(json?.items[0]?.statistics?.viewCount);
    setCommaV(cView);
    setView(json?.items[0]?.statistics?.viewCount);
    setDate(json?.items[0]?.snippet?.publishedAt);
    let cLike = addCommas(json?.items[0]?.statistics?.likeCount);
    setCommaL(cLike);
    setLike(json?.items[0]?.statistics?.likeCount);
  };
  function addCommas(number) {
    // Convert number to string
    let numStr = number.toString();

    // Split the string into integer and decimal parts (if any)
    let parts = numStr.split(".");

    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join the integer and decimal parts (if any) with a dot
    return parts.join(".");
  }

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
      {showDescription === true ? (
        <div
          className="h-[calc(100dvh-280px)] w-full fixed bottom-0 z-50 bg-[black] overflow-y-scroll"
          style={{ transition: ".2s" }}
        >
          <div className="fixed bg-[black] w-full h-[60px] border-b-[2px] border-[#222222]">
            <div className="h-[20px] flex justify-center items-center w-full flex-col ">
              <div className="w-[60px] h-[4px] rounded-full bg-[#434343] "></div>
            </div>
            <div className="w-full h-[full] flex justify-between items-center px-[10px] text-[white] font-[roboto] ">
              <span className="text-[17px] ">
                <b>Description</b>
              </span>
              <span>
                <RxCross2
                  className="text-[25px] text-white"
                  onClick={() => {
                    setShowDescription(false);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="bg-[black] w-full h-[60px] border-b-[2px] border-[#222222]"></div>

          <span className="w-full font-[400] mt-[20px] line-clamp-2 text-ellipsis text-white font-[roboto]  text-[16px] max-h-[50px] md:max-h-[50px]  lg:max-h-[50px] px-[10px] lg:px-0 md:px-0 overflow-hidden whitespace-normal ">
            <b>{videoInfo?.snippet?.title}</b>
          </span>

          <div className="w-full h-[80px] px-[10px] flex justify-center items-center">
            <div className="h-full w-[33.33%] flex flex-col justify-center items-center">
              <span className="text-white text-[16px] text-[roboto]">
                <b>{like === 0 ? <>0</> : <>{commaL}</>}</b>
              </span>
              <span className="text-[#aaaaaa] text-[12px]">Likes</span>
            </div>
            <div className="h-full w-[33.33%] flex flex-col justify-center items-center">
              <span className="text-white text-[16px] text-[roboto]">
                <b>{view === 0 ? <>0 views</> : <>{commaV}</>}</b>
              </span>
              <span className="text-[#aaaaaa] text-[12px]">Views</span>
            </div>
            <div className="h-full w-[33.33%] flex flex-col justify-center items-center">
              <span className="text-white text-[16px] text-[roboto]">
                <b>
                  {year != 0 ? (
                    <>
                      {month >= 12 ? <>{year + 1} years</> : <>{year} years</>}
                    </>
                  ) : month != 0 ? (
                    <>
                      {week >= 4 ? (
                        <>{month + 1} months</>
                      ) : (
                        <>{month} months</>
                      )}
                    </>
                  ) : week != 0 ? (
                    <>{day >= 7 ? <>{week + 1} weeks</> : <>{week} weeks</>}</>
                  ) : (
                    <>{day} days</>
                  )}
                </b>
              </span>
              <span className="text-[#aaaaaa] text-[12px]">Ago</span>
            </div>
          </div>

          <div className="w-full h-full p-[10px] text-white rounded-xl  md:bg-transparent lg:translate-x-0">
            <pre className="h-full  w-full font-[roboto] overflow-x-auto whitespace-pre-wrap bg-[#222222] p-[10px] rounded-xl break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] overflow-hidden">
              {snippet.description}
            </pre>
          </div>
        </div>
      ) : (
        <div
          className="h-0 w-full fixed bottom-0 z-50 bg-[black] "
          style={{ transition: ".2s" }}
        ></div>
      )}
      <div className="w-full  mt-[17px] flex flex-col">
        <span className="w-full font-[400] line-clamp-2 text-ellipsis text-white font-[roboto]  text-[17px] max-h-[50px] md:max-h-[50px]  lg:max-h-[50px] px-[10px] lg:px-0 md:px-0 overflow-hidden whitespace-normal ">
          <b>{videoInfo?.snippet?.title}</b>
        </span>
        <span
          className="text-[#aaaaaa] text-[12px] px-[10px] lg:px-0 md:px-0 flex md:hidden lg:hidden justify-start items-center mt-[3px]"
          onClick={() => {
            setShowDescription(true);
          }}
        >
          <span>
            {view === 0 ? (
              <>0 views</>
            ) : (
              <>
                {Math.floor(view / 1000000) != 0 ? (
                  <>{(view / 1000000).toFixed(2)}M</>
                ) : Math.floor(view / 100000) != 0 ? (
                  <>{(view / 100000).toFixed(2)}L</>
                ) : Math.floor(view / 1000) != 0 ? (
                  <>{(view / 1000).toFixed(2)}K</>
                ) : (
                  <>{view.toFixed(2)}</>
                )}{" "}
                views
              </>
            )}
          </span>
          <span className="ml-[7px]">
            {year != 0 ? (
              <>
                {month >= 12 ? (
                  <>{year + 1} years ago</>
                ) : (
                  <>{year} years ago</>
                )}
              </>
            ) : month != 0 ? (
              <>
                {week >= 4 ? (
                  <>{month + 1} months ago</>
                ) : (
                  <>{month} months ago</>
                )}
              </>
            ) : week != 0 ? (
              <>
                {day >= 7 ? <>{week + 1} weeks ago</> : <>{week} weeks ago</>}
              </>
            ) : day != 0 ? (
              <>{day} days ago</>
            ) : hour != 0 ? (
              <>{hour} hours ago</>
            ) : minute != 0 ? (
              <>{minute} minutes ago</>
            ) : (
              <>{second} seconds ago</>
            )}
          </span>
          <span className="ml-[7px] text-white">
            <b>...more</b>
          </span>
        </span>
        <div className="h-[85px] lg:h-[40px] md:h-[40px] items-center w-full flex flex-col lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start  mt-[15px] lg:mt-[10px] md:mt-[10px]">
          <div className="flex w-full lg:w-[50%] md:w-[50%] justify-between md:justify-start lg:justify-start items-center px-[10px] lg:px-0 md:px-0">
            <div className="flex justify-start items-center  w-[70%]">
              <img
                alt="channel_logo"
                src={channelLogo}
                className="flex justify-start items-center h-9 w-9 rounded-full"
              />
              <div className="flex flex-col justify-center items-start h-[35px] ml-[15px] w-full">
                <span className="font-semibold flex justify-start text-ellipsis whitespace-nowrap items-center w-full lg:w-[100%] md:w-[100%] h-[20px] overflow-hidden text-white text-[14px] md:text-[16px] lg:text-[16px]">
                  {videoInfo?.snippet?.channelTitle}{" "}
                  <span className="ml-[7px] text-[12px] text-[#8b8a8a] flex md:hidden lg:hidden justify-start items-center font-normal">
                    {subscribersCount / 1000000 != 0 ? (
                      <>{subscribersCount / 1000000}M</>
                    ) : subscribersCount / 100000 != 0 ? (
                      <>{subscribersCount / 100000}L</>
                    ) : subscribersCount / 1000 != 0 ? (
                      <>{subscribersCount / 1000}K</>
                    ) : (
                      <>{subscribersCount}</>
                    )}
                  </span>
                </span>
                <span className="text-[12px] md:flex lg:flex justify-center items-start text-[#8b8a8a] hidden">
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
            <div className="flex justify-center items-center  ">
              <button className="flex justify-center items-center rounded-full   bg-[#272727] text-white text-whiterounded-full px-[14px] h-[35px]  ml-[20px] text-[12px] lg:text-[13px] md:text-[13px]  hover:bg-[#454545] font-[roboto] font-normal">
                Join
              </button>
              <button className="flex justify-center items-center border-none  rounded-full px-[14px] h-[35px]  ml-[10px] text-[12px] lg:text-[13px] md:text-[13px]   hover:bg-[#dadada] bg-[white] text-black font-[roboto] font-normal">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex w-full lg:w-[50%] md:w-[50%]  justify-between md:justify-end lg:justify-end items-center px-[0px] lg:px-0 md:px-0">
            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full  h-[35px] ml-[7px] lg:ml-[10px] md:ml-[10px] text-[12px] lg:text-[13px] md:text-[13px] font-semibold bg-[#272727] text-white ">
              <div className=" h-full flex justify-center items-center px-[14px] rounded-l-full hover:bg-[#454545] ">
                <BiSolidLike className="text-[16px] lg:text-[19px] md:text-[19px] " />
                <span className="font-[roboto] font-normal ml-[5px]">
                  {Math.floor(videoInfo?.statistics?.likeCount / 1000000) !=
                  0 ? (
                    <>
                      {(videoInfo?.statistics?.likeCount / 1000000).toFixed(2)}{" "}
                      M
                    </>
                  ) : Math.floor(videoInfo?.statistics?.likeCount / 100000) !=
                    0 ? (
                    <>
                      {(videoInfo?.statistics?.likeCount / 100000).toFixed(2)} L
                    </>
                  ) : Math.floor(videoInfo?.statistics?.likeCount / 1000) !=
                    0 ? (
                    <>
                      {(videoInfo?.statistics?.likeCount / 1000).toFixed(2)} K
                    </>
                  ) : (
                    <>{videoInfo?.statistics?.likeCount}</>
                  )}
                  {/* {videoInfo?.statistics?.likeCount} */}
                </span>
              </div>
              <div className="h-[60%]  border-[.7px] border-[#dcdcdc] "></div>
              <div className="px-[14px] rounded-r-full hover:bg-[#454545] h-full flex justify-center items-center ">
                <BiSolidDislike className="text-[16px] lg:text-[19px] md:text-[19px]" />
              </div>
            </button>

            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full px-[14px] h-[35px] ml-[7px] lg:ml-[10px] md:ml-[10px] text-[12px] lg:text-[13px] md:text-[13px] bg-[#272727] text-white hover:bg-[#454545] font-[roboto] font-normal">
              <IoMdShareAlt className="text-[18px] lg:text-[19px] md:text-[19px] mr-[6px]" />{" "}
              Share
            </button>
            <button className="flex justify-center items-center border-none whitespace-nowrap rounded-full px-[14px] h-[35px] ml-[7px] lg:ml-[10px] md:ml-[10px] text-[12px] lg:text-[13px] md:text-[13px] font-[roboto] font-normal bg-[#272727] text-white hover:bg-[#454545]">
              <BiSolidDownload className="text-[18px] lg:text-[19px] md:text-[19px] mr-[6px]" />{" "}
              Download
            </button>
            <button className="flex md:flex lg:flex justify-center items-center border-none whitespace-nowrap rounded-full  w-[35px] h-[35px] ml-[7px] lg:ml-[10px] md:ml-[10px] text-[13px] font-[roboto] font-normal bg-[#272727] text-white hover:bg-[#454545]">
              <BiDotsVerticalRounded className="text-[18px] lg:text-[19px] md:text-[19px] " />
            </button>
          </div>
        </div>
        {showDescription === false ? (
          <>
            <div
              className="w-full hidden md:flex lg:flex  p-[10px] lg:p-[15px] md:p-[15px]  h-[95px] bg-transparent md:bg-[#222222] lg:bg-[#222222] rounded-xl mt-[10px] text-ellipsis "
              onClick={() => showMore()}
              style={{ transition: ".3s" }}
            >
              <div className="w-full h-full p-[10px] lg:p-0 md:p-0  text-white rounded-xl bg-[#222222] md:bg-transparent lg:translate-x-0">
                <pre className="h-full  w-full font-[roboto] overflow-x-auto whitespace-pre-wrap break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] overflow-hidden">
                  {snippet?.description}
                </pre>
              </div>
            </div>
          </>
        ) : (
          <div
            className="w-full hidden md:flex lg:flex p-[10px] lg:p-[15px] md:p-[15px] h-auto bg-transparent md:bg-[#222222] lg:bg-[#222222] rounded-xl mt-[10px] text-ellipsis"
            onClick={() => showMore()}
            style={{ transition: ".3s" }}
          >
            <div className="w-full h-full p-[10px] lg:p-0 md:p-0  text-white rounded-xl bg-[#222222] md:bg-transparent lg:translate-x-0">
              <pre className="h-full w-full font-[roboto]  overflow-x-auto whitespace-pre-wrap break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] ">
                {snippet?.description}
              </pre>
            </div>
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
