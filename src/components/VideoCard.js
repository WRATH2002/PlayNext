import { Link } from "react-router-dom";
import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const VideoCard = (props) => {
  const [channelLogo, setChannelLogo] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [date, setDate] = useState(props?.data?.snippet?.publishedAt);
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

  function changeDuration() {
    var i;
    var tempString;
    var temp = props.data.contentDetails.duration;
    console.log(temp);
    var tempTwo = temp.replace("PT", "");
    var tempThree = tempTwo.replace("H", ":");
    var tempfour = tempThree.replace("M", ":");
    var tempfive = tempfour.replace("S", "");
    // i = tempfive.length - 1;
    // if (tempfive[i] === ":") {
    //   tempString[i + 1] = "0";
    //   tempfive[i + 2] = "0";
    // }
    // if (tempfive[i - 1] === ":") {
    //   tempfive[i + 1] = tempfive[i];
    //   tempfive[i] = "0";
    //   console.log("true");
    // }

    // for (i = tempfive.length - 1; i >= 0; i--) {
    //   console.log(tempfive[i]);
    // }
    console.log(tempfive);
    setDuration(tempfive);
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
      <div className="w-full ">
        <img
          className="w-full md:w-[370px] lg:w-[370px] rounded-0 md:rounded-[10px] lg:rounded-[10px]"
          src={props?.data?.snippet?.thumbnails?.medium?.url}
        ></img>
        <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
          {/* {changeDuration()} */}
          {/* {setDuration(props.data.contentDetails.duration.replace("PT", ""))} */}
          <span className="text-[white] text-[13px] px-[4.7px] rounded-[3px] bg-[#000000dc]">
            {duration}
          </span>
          {/* <span>{props.data.contentDetails.duration}</span> */}
        </span>
        <div className="flex items-start  mt-[10px] h-[90px] w-full">
          <img
            className="rounded-full w-[40px] ml-[10px] lg:ml-0 md:ml-0"
            src={channelLogo}
          ></img>
          <div className="flex flex-col justify-start ml-[16px] w-[calc(100%-66px)]  md:w-[calc(100%-56px)] lg:w-[calc(100%-56px)]  ">
            <span className=" w-full text-[15px]  lg:w-[300px] md:w-[300px] min-h-[20px] max-h-[46px] lg:min-h-[24px]  lg:max-h-[46px] md:min-h-[24px] md:max-h-[46px]  overflow-hidden line-clamp-2 text-ellipsis text-[white] font-[roboto] font-[300] ">
              {/* <b>{props.data.snippet.title}</b> */}
              <b>
                {props.data.snippet.title}
                {/* {props.data.snippet.title}
                {props.data.snippet.title} {props.data.snippet.title} */}
              </b>
            </span>

            <div className="w-full lg:w-[300px] md:w-[300px] flex flex-row lg:flex-col md:flex-col text-[11.8px] md:text-[12.8px] lg:text-[12.8px] text-[#aaaaaa] font-[roboto] font-[300] tracking-wider justify-start items-center md:justify-center md::items-start lg:justify-center lg:items-start">
              <span className="  h-full overflow-hidden line-clamp-1 text-ellipsis max-w-[45%] w-auto ">
                {props.data.snippet.channelTitle}
              </span>
              <span className=" flex lg:hidden md:hidden justify-center items-center  mx-[5px] mt-[-2px]  h-[10px] ">
                •
              </span>
              <div className="flex-row flex justify-start items-center h-[15px]">
                <span className="  text-[#aaaaaa]  h-full overflow-hidden line-clamp-1 text-ellipsis  whitespace-nowrap">
                  {Math.floor(props.data.statistics.viewCount / 1000000) !=
                  0 ? (
                    <>
                      {(props.data.statistics.viewCount / 1000000).toFixed(2)}M
                    </>
                  ) : Math.floor(props.data.statistics.viewCount / 100000) !=
                    0 ? (
                    <>
                      {(props.data.statistics.viewCount / 100000).toFixed(2)}L
                    </>
                  ) : Math.floor(props.data.statistics.viewCount / 1000) !=
                    0 ? (
                    <>{(props.data.statistics.viewCount / 1000).toFixed(2)}K</>
                  ) : (
                    <>{props.data.statistics.viewCount.toFixed(2)}</>
                  )}{" "}
                  views
                  {/* {props.data.statistics.viewCount} */}
                </span>
                <span className=" flex justify-center items-center mx-[5px] mt-[-2px]   h-[10px]">
                  •
                </span>
                <span className=" text-[12px] h-full overflow-hidden line-clamp-1 text-ellipsis  whitespace-nowrap">
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
                      {day >= 7 ? (
                        <>{week + 1} weeks ago</>
                      ) : (
                        <>{week} weeks ago</>
                      )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
