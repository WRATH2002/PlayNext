import { CHANNEL_LOGO_API } from "../utils/constants";
import { useState, useEffect } from "react";

const RelatedVideos = (props) => {
  const [channelLogo, setChannelLogo] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [date, setDate] = useState(props?.data?.snippet?.publishedAt);
  useEffect(() => {
    console.log("propssssssssssssssssssssss");
    console.log(props);
    if (date?.length != 0) {
      calculateDurationFromDate(date);
    }
  }, [date]);

  function calculateDurationFromDate(dateString) {
    // Convert the provided date string to a Date object
    const providedDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();
    const timeDifference = currentDate - providedDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const years = Math.floor(secondsDifference / (3600 * 24 * 365));
    const remainingSeconds = secondsDifference - years * 3600 * 24 * 365;
    const months = Math.floor(remainingSeconds / (3600 * 24 * 30));
    const remainingSecondsAfterMonths =
      remainingSeconds - months * 3600 * 24 * 30;
    const weeks = Math.floor(remainingSecondsAfterMonths / (3600 * 24 * 7));
    const remainingSecondsAfterWeeks =
      remainingSecondsAfterMonths - weeks * 3600 * 24 * 7;
    const days = Math.floor(remainingSecondsAfterWeeks / (3600 * 24));
    setYear(years);
    setMonth(months);
    setWeek(weeks);
    setDay(days);
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
    console.log(tempfive);
    setDuration(tempfive);
  }

  useEffect(() => {
    // getChannelLogo();
    changeDuration();
  }, []);

  // const getChannelLogo = async () => {
  //   const data = await fetch(CHANNEL_LOGO_API + props.data.snippet.channelId);
  //   const json = await data.json();
  //   console.log(json);
  //   setChannelLogo(json?.items[0]?.snippet?.thumbnails?.default?.url);
  // };
  return (
    <>
      <div className="w-full h-auto flex flex-col lg:flex-row md:flex-row">
        <img
          src={props?.data?.snippet?.thumbnails?.medium?.url}
          className="w-full md:w-[175px] lg:w-[175px] rounded-lg"
        ></img>
        <div className=" w-full md:w-[calc(100%-175px)]  lg:w-[calc(100%-175px)] pl-[10px] flex flex-col text-[#aaaaaa] font-[roboto]">
          <span className=" w-full min-h-[20px] max-h-[42px] text-15px  text-[14px] flex items-start justify-start overflow-hidden text-white line-clamp-2 text-ellipsis ">
            {props.data.snippet.title}
          </span>
          <span className=" w-full h-[17px] text-[12px] mt-[3px]">
            {props.data.snippet.channelTitle}
          </span>
          <div className="mt-[-3px]">
            <span className=" w-full h-[20px] text-[12px]">
              {Math.floor(props.data.statistics.viewCount / 1000000) != 0 ? (
                <>{(props.data.statistics.viewCount / 1000000).toFixed(2)}M</>
              ) : Math.floor(props.data.statistics.viewCount / 100000) != 0 ? (
                <>{(props.data.statistics.viewCount / 100000).toFixed(2)}L</>
              ) : Math.floor(props.data.statistics.viewCount / 1000) != 0 ? (
                <>{(props.data.statistics.viewCount / 1000).toFixed(2)}K</>
              ) : (
                <>{props.data.statistics.viewCount.toFixed(2)}</>
              )}{" "}
              views
            </span>
            <span className=" w-full h-[20px] text-[12px] mx-[2px]">•</span>
            <span className=" w-full h-[20px] text-[12px]">
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
              ) : (
                <>{day} days ago</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedVideos;
