import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { closeSidebar } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import LiveChat from "./LiveChat";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoDescription from "./VideoDescription";

const WatchVideoPage = () => {
  const [liveChatFlag, setLiveChatFlag] = useState(true);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();

  useEffect(() => {
    sidebarHandler();
  }, []);

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

  return (
    <>
      <div className="w-full flex">
        <div className="w-full lg:w-[70%] md:w-[70%] p-0 lg:p-[25px] md:p-[25px]">
          <iframe
            className=" w-full rounded-0  lg:rounded-xl md:rounded-xl h-[220px]  lg:h-[550px] md:h-[550px]"
            controls
            autoPlay
            width="560"
            height="315"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?autoplay=1"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* <div id="description"></div>
          <div id="comment"></div> */}
          <VideoDescription id={searchParams.get("v")} />
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
              {/* <LiveChat /> */}
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
          <div
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
              {/* <LiveChat /> */}
            </div>
            <div className="w-full h-[50px]  flex justify-center p-[3px] items-center">
              <span
                className="w-full h-full rounded-full hover:bg-[#bdbdbd] flex justify-center items-center cursor-pointer"
                onClick={() => toggleLiveChat()}
              >
                Show Chat
              </span>
            </div>
          </div>
        )}
      </div>

      {/* <div className="h-[400px] flex justify-center items-center">
        <div className="w-full border-[3px] border-[black]"></div>
      </div> */}
    </>
  );
};

export default WatchVideoPage;
// #e5e5e5
