import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { closeSidebar } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import LiveChat from "./LiveChat";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoDescription from "./VideoDescription";
import { COMMENT_API, nameList } from "../utils/constants";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import RelatedVideosContainer from "./RelatedVideosContainer";

const WatchVideoPage = () => {
  const [liveChatFlag, setLiveChatFlag] = useState(false);
  const [comments, setComments] = useState();
  const [c, setC] = useState("");
  const [u, setU] = useState("");
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();

  useEffect(() => {
    sidebarHandler();
    getComments();
  }, [searchParams.get("v")]);

  // const videoInfo = async () => {
  //   const data = await fetch(CHANNEL_LOGO_API + props.data.snippet.channelId);
  //   const json = await data.json();
  //   console.log(json);
  //   setChannelLogo(json?.items[0]?.snippet?.thumbnails?.default?.url);
  // };

  function sidebarHandler() {
    dispatch(closeSidebar());
  }

  function toggleLiveChat() {
    setLiveChatFlag(!liveChatFlag);
  }

  const getComments = async () => {
    const data = await fetch(
      COMMENT_API +
        "&textFormat=plainText&part=snippet&videoId=" +
        searchParams.get("v") +
        "&maxResults=50"
    );
    const json = await data.json();
    console.log("Comment");
    console.log(json);
    setComments(json?.items);
    setC(json?.items[0]?.snippet?.topLevelComment?.snippet?.textOriginal);
    setU(
      json?.items[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
    );
  };

  // ----------------

  // const getRealtedVideos = async () => {
  //   const data = await fetch(
  //     COMMENT_API +
  //       "&textFormat=plainText&part=snippet&videoId=" +
  //       searchParams.get("v") +
  //       "&maxResults=50"
  //   );
  //   const json = await data.json();
  //   console.log("Comment");
  //   console.log(json);
  //   setComments(json?.items);
  // };

  // console.log(comments);

  // function alertDownload() {
  //   var x = document.getElementById("download");

  //   // Add the "show" class to DIV
  //   x.className = "show";

  //   // After 3 seconds, remove the show class from DIV
  //   setTimeout(function () {
  //     x.className = x.className.replace("show", "");
  //   }, 1500);
  // }

  return (
    <>
      {/* <div
        className="flex  fixed w-full h-full bg-slate-400"
        style={{ zIndex: "-2" }}
      >
        <span className="hide" id="download" style={{ zIndex: "4" }}>
          This video can not be downloaded
        </span>
      </div> */}
      <div className="w-full flex flex-col lg:flex-row md:flex-row p-0 bg-[#F7F7F7]">
        <div className="w-full lg:w-[70%] md:w-[70%] p-0 lg:p-[20px] h-auto md:p-[20px] ">
          <iframe
            className="player  drop-shadow-sm rounded-0  lg:rounded-2xl md:rounded-2xl  fixed md:static lg:static border-b border-[#717171] md:border-b-[0] lg:border-b-[0] z-40 "
            controls
            autoPlay
            // width="560"
            // height="315"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?autoplay=1"
            }
            // src="https://www.youtube.com/embed/NMeUvG1kw08?si=FVYN1nPlJ-tSBYeK"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className=" w-full rounded-0  lg:rounded-xl md:rounded-xl h-[220px]  lg:h-[550px] md:h-[550px] flex md:hidden lg:hidden drop-shadow-sm "></div>
          <span>
            <span></span>
          </span>

          {/* <div className="h-[55px] fixed z-10 w-full p-[10px] py-[10px] flex md:hidden lg:hidden justify-start items-center overflow-x-scroll font-medium font-[robotoT] bg-white">
            <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#242424] whitespace-nowrap cursor-pointer text-white sticky top-0">
              All
            </div>
            <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer">
              From This Creator
            </div>
            <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer">
              Related
            </div>
            {nameList.map((data) => {
              return (
                <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] cursor-pointer">
                  {data}
                </div>
              );
            })}
          </div>
          <div className="h-[55px]   w-full p-[10px] py-[10px] flex md:hidden lg:hidden justify-start items-center overflow-x-scroll font-medium font-[robotoT]"></div> */}
          {/* <div id="description"></div>
          <div id="comment"></div> */}
          <div className="w-full z-30">
            <VideoDescription id={searchParams.get("v")} />
          </div>
          <Comments
            comments={comments}
            id={searchParams.get("v")}
            comm={c}
            ur={u}
          />
        </div>
        <div className="flex lg:flex md:flex w-full lg:w-[calc(30%)] md:w-[calc(30%)] h-auto mr-[20px]  flex-col items-start  mt-[20px] rounded-xl ">
          <RelatedVideosContainer />
        </div>

        {liveChatFlag === true ? (
          <div
            className="hidden lg:flex md:flex w-[calc(30%-25px)] h-[550px] border border-[#bdbdbd] mr-[25px]  flex-col items-center justify-between mt-[25px] rounded-xl "
            style={{ transition: ".3s" }}
          >
            <div
              className="w-full h-[60px] border-b border-[#bdbdbd] flex items-center justify-between"
              style={{ transition: ".3s" }}
            >
              <span className="text-[15px] ml-[25px]">Live Messages</span>
              <span className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-[#bdbdbd] rounded-full">
                <BsThreeDotsVertical />
              </span>
            </div>
            <div
              className="w-full px-[25px] my-[25px] h-[calc(550px-80px)] overflow-scroll flex flex-col-reverse justify-start "
              style={{ transition: ".3s" }}
            >
              <LiveChat />
            </div>
            <div className="w-full h-[60px] border-t border-[#bdbdbd] flex justify-center p-[3px] items-center">
              <span
                className="w-full h-full rounded-full hover:bg-[#bdbdbd] flex justify-center items-center cursor-pointer"
                onClick={() => toggleLiveChat()}
              >
                Hide Chat
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* <div
              className="w-[calc(30%-25px)] h-[50px] border border-[#bdbdbd] mr-[25px] flex flex-col items-center justify-between mt-[25px] rounded-xl "
              style={{ transition: ".3s" }}
            >
              <div
                className="w-full h-0  flex items-center justify-between"
                style={{ transition: ".3s" }}
              ></div>
              <div
                className="w-full h-0 p-0 overflow-scroll px-[25px] my-0 "
                style={{ transition: ".3s" }}
              >
                <LiveChat />
              </div>
              <div className="w-full h-[50px]  flex justify-center p-[3px] items-center">
                <span
                  className="w-full h-full rounded-full hover:bg-[#bdbdbd] flex justify-center items-center cursor-pointer"
                  onClick={() => toggleLiveChat()}
                >
                  Show Chat
                </span>
              </div>
            </div> */}
          </>
        )}
      </div>
      {/* <div className="w-full h-full bg-slate-400"></div> */}

      {/* <div className="h-[400px] flex justify-center items-center">
        <div className="w-full border-[3px] border-[black]"></div>
      </div> */}
    </>
  );
};

export default WatchVideoPage;
// #e5e5e5
