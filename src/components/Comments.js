import { useEffect, useState } from "react";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { SEARCH_BY_ID } from "../utils/constants";
import { RxCross2 } from "react-icons/rx";

const Comment = ({ comment }) => {
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [date, setDate] = useState(
    comment?.snippet?.topLevelComment?.snippet?.publishedAt
  );

  useEffect(() => {
    // console.log("propssssssssssssssssssssss");
    // console.log(props);
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
  return (
    <>
      <div className=" flex justify-start items-start my-[10px]  px-[10px] lg:px-0 md:px-0 ">
        <img
          className="h-9 w-9 rounded-full"
          src={
            comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
          }
        ></img>
        <div className="flex flex-col w-full  ml-[25px] text-[13px] lg:text-[15px] md:text-[15px] text-[white] font-[roboto]">
          <span className="flex items-center justify-start font-[400] text-[13px] h-[20px] text-[#aaaaaa] ">
            {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
            <span className="mx-[4px]">•</span>
            <span className="text-[12px]">
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
          </span>
          <span className=" leading-[18px] font-sans flex flex-wrap text-[14px]">
            {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
          </span>
          <div className="flex justify-start items-center my-[7px]">
            <BiSolidLike className="text-[16px] text-[#727272] lg:text-[19px] md:text-[19px]" />
            <span className="flex justify-start items-center ml-[2px] mr-[10px] text-[#727272]">
              {comment?.snippet?.topLevelComment?.snippet?.likeCount}
            </span>
            <BiSolidDislike className="text-[16px] text-[#727272] lg:text-[19px] md:text-[19px]" />
            <button className="ml-[9px] px-[13px] text-[12px] lg:text-[13px] md:text-[13px] flex justify-center items-center rounded-full h-[32px] font-[roboto]">
              Reply
            </button>
          </div>

          {/* <span></span> */}
          <span className="text-[#3ea6ff] text-[13px] font-[roboto] font-semibold">
            {comment?.snippet?.totalReplyCount === 0 ? (
              <></>
            ) : (
              <>{comment?.snippet?.totalReplyCount} reply</>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

const Comments = (props) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState(0);
  const [url, setUrl] = useState("");
  const [com, setCom] = useState("");

  const result = async () => {
    // const data = await fetch(SEARCH_BY_ID + videoId);
    const data = await fetch(SEARCH_BY_ID + props.id);
    const json = await data.json();
    console.log("result");
    console.log(json);
    // setVideoInfo(json?.items[0]);
    // let cView = addCommas(json?.items[0]?.statistics?.viewCount);
    // setCommaV(cView);
    setComment(json?.items[0]?.statistics?.commentCount);
    // setDate(json?.items[0]?.snippet?.publishedAt);
    // let cLike = addCommas(json?.items[0]?.statistics?.likeCount);
    // setCommaL(cLike);
    // setLike(json?.items[0]?.statistics?.likeCount);
  };

  useEffect(() => {
    // setVideoId(params.get("v"));
    console.log("comeentthlijafUWBUIsbvoubsIDVsdvSVB");
    console.log(props.comments);
    result();
    setUrl(props?.ur);
    setCom(props?.comm);
  }, [props.id]);

  return (
    <>
      {showComment === true ? (
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
                <b>Comments</b>
              </span>
              <span>
                <RxCross2
                  className="text-[25px] text-white"
                  onClick={() => {
                    setShowComment(false);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="bg-[black] w-full h-[60px] border-b-[2px] border-[#222222]"></div>

          {/* <div className="w-full h-full p-[10px] text-white rounded-xl  md:bg-transparent lg:translate-x-0">
            <pre className="h-full  w-full font-[roboto] overflow-x-auto whitespace-pre-wrap bg-[#222222] p-[10px] rounded-xl break-words text-[12px] lg:text-[14px] md:text-[14px] leading-[18px] overflow-hidden"> */}
          <div className="flex justify-start items-center px-[10px] mt-[10px] text-[15px] font-[roboto] ">
            <div className="h-[40px] rounded-xl flex justify-center items-center px-[15px] w-auto bg-[white]">
              Top
            </div>
            <div className="h-[40px] rounded-xl flex justify-center items-center px-[15px] w-auto bg-[#222222] text-white ml-[10px]">
              Newest
            </div>
          </div>
          {props.comments?.map((comment) => {
            return <Comment comment={comment} />;
          })}
          {/* </pre>
          </div> */}
        </div>
      ) : (
        <div
          className="h-0 w-full fixed bottom-0 z-50 bg-[black] "
          style={{ transition: ".2s" }}
        ></div>
      )}
      <div className="w-full p-[10px] before:h-auto block md:hidden lg:hidden ">
        <div
          className="w-full h-auto  bg-[#222222] py-[5px] rounded-xl font-[roboto] flex flex-col"
          onClick={() => {
            setShowComment(true);
          }}
        >
          <div className="px-[10px] w-full text-white text-[13px]">
            <b>Comments</b>{" "}
            <span className="ml-[7px] text-[#aaaaaa] text-[12px]">
              {comment === 0 ? (
                <>0</>
              ) : (
                <>
                  {Math?.floor(comment / 1000000) != 0 ? (
                    <>{(comment / 1000000).toFixed(2)}M</>
                  ) : Math?.floor(comment / 100000) != 0 ? (
                    <>{(comment / 100000).toFixed(2)}L</>
                  ) : Math?.floor(comment / 1000) != 0 ? (
                    <>{(comment / 1000).toFixed(2)}K</>
                  ) : (
                    <>{comment}</>
                  )}
                </>
              )}
            </span>{" "}
          </div>
          <div className="w-full h-9 flex px-[10px] justify-start items-center my-[4px]">
            <img className="h-9 w-9 rounded-full" src={props?.ur}></img>
            <span className="text-white text-[13px] font-[roboto] ml-[10px] w-[calc(100%-46px)] overflow-hidden text-ellipsis line-clamp-1 h-[20px]">
              {props?.comm}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:flex flex-col justify-center items-start h-auto mt-[15px]">
        <span className="text-white text-[17px] font-[roboto]">
          {comment === 0 ? (
            <>0</>
          ) : (
            <>
              {Math?.floor(comment / 1000000) != 0 ? (
                <>
                  <b>{(comment / 1000000).toFixed(2)}M</b>
                </>
              ) : Math?.floor(comment / 100000) != 0 ? (
                <>
                  <b>{(comment / 100000).toFixed(2)}L</b>
                </>
              ) : Math?.floor(comment / 1000) != 0 ? (
                <>
                  <b>{(comment / 1000).toFixed(2)}K</b>
                </>
              ) : (
                <>
                  <b>{comment}</b>
                </>
              )}
            </>
          )}{" "}
          <b>Comments</b>
        </span>
        {props.comments?.map((comment) => {
          return <Comment comment={comment} />;
        })}
      </div>
    </>
  );
};

export default Comments;
