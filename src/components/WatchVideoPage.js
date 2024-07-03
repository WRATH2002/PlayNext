import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/appSlice";
import { useEffect, useRef, useState } from "react";
import { closeSidebar } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import LiveChat from "./LiveChat";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoDescription from "./VideoDescription";
import { TbAntennaBars3 } from "react-icons/tb";
import {
  API_KEY,
  COMMENT_API,
  TAGS,
  TAGS2,
  nameList,
} from "../utils/constants";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import RelatedVideosContainer from "./RelatedVideosContainer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CgLoadbarSound } from "react-icons/cg";

const WatchVideoPage = () => {
  const [liveChatFlag, setLiveChatFlag] = useState(false);
  const [playlistFlag, setPlaylistFlag] = useState(true);
  const [videoFlag, setVideoFlag] = useState(true);
  const [comments, setComments] = useState();
  const [c, setC] = useState("");
  const [u, setU] = useState("");
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));
  console.log("searchParams.get");
  console.log(searchParams.get("plid"));
  const dispatch = useDispatch();
  const [chaName, setChanName] = useState("");
  const [tags, setTags] = useState();

  const [playlists, setPlaylists] = useState([]);
  const [firstDivHeight, setFirstDivHeight] = useState(0);

  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const [pos, setPos] = useState(0);
  const [playName, setPlayName] = useState("");

  useEffect(() => {
    if (playlistFlag) {
      setTimeout(() => {
        setVideoFlag(true);
      }, 1000);
    } else {
      setVideoFlag(false);
    }
  }, [playlistFlag]);

  useEffect(() => {
    const updateHeight = () => {
      if (firstDivRef.current) {
        const height = firstDivRef.current.clientHeight;
        setFirstDivHeight(height);
        console.log("heightttttttttt----------------------------");
        console.log(height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [playlistFlag]);

  useEffect(() => {
    playlists.map((data, index) => {
      if (
        data?.snippet?.resourceId?.videoId ==
        searchParams.get("v").split("?plid=")[0]
      ) {
        setPos(data?.snippet?.position);
      }
    });
  }, [playlists]);

  useEffect(() => {
    if (playName.length == 0) {
      fetchName();
    }
  }, []);

  useEffect(() => {
    if (playlistFlag) {
      if (secondDivRef.current) {
        secondDivRef.current.style.height = `${firstDivHeight}px`;
      }
    } else {
      if (secondDivRef.current) {
        secondDivRef.current.style.height = `auto`;
      }
    }

    if (thirdDivRef.current) {
      if (playlistFlag) {
        thirdDivRef.current.style.height = `calc(100dvh - (${firstDivHeight}px + 60px))`;
      } else {
        thirdDivRef.current.style.height = "90px";
      }
    }
  }, [firstDivHeight, playlistFlag]);

  useEffect(() => {
    if (searchParams.get("v").split("?plid=").length === 2) {
      if (playlists.length == 0) {
        fetchPlaylists();
      }
    }
  }, [searchParams.get("v").split("?plid=")[1]]);

  const fetchPlaylists = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=" +
        searchParams.get("v").split("?plid=")[1] +
        "&key=" +
        API_KEY +
        "&maxResults=50"
    );
    const json = await data.json();
    console.log("PlayList Videos API is called -- under 'WatchVideoPage'");
    setPlaylists(json?.items);
  };

  const fetchName = async () => {
    const dataName = await fetch(
      "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=" +
        searchParams.get("v").split("?plid=")[1] +
        "&key=" +
        API_KEY
    );

    const jsonName = await dataName.json();
    console.log("PlayList Name API is called --- under 'WatchVideoPage'");
    setPlayName(jsonName?.items[0]?.snippet?.title);
  };

  useEffect(() => {
    sidebarHandler();
    // if (comments == undefined) {
    getComments();
    // }
    // if (tags == undefined) {
    getTags();
    // }
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
        searchParams.get("v").split("?plid=")[0] +
        "&maxResults=50"
    );
    const json = await data.json();
    console.log("Video comments API is called --- under 'WatchVideoPage'");
    setComments(json?.items);
    setC(json?.items[0]?.snippet?.topLevelComment?.snippet?.textOriginal);
    setU(
      json?.items[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
    );
  };

  const getTags = async () => {
    const data = await fetch(
      TAGS + searchParams.get("v").split("?plid=")[0] + TAGS2
    );
    const json = await data.json();
    console.log("Video related Tags API is called --- under 'WatchVideoPage'");
    setTags(json?.items[0]?.snippet?.tags);
  };

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
      <div className="w-full flex flex-col lg:flex-row md:flex-row p-0 bg-[#ffffff] md:bg-[#F7F7F7] lg:bg-[#F7F7F7] ">
        <div className="w-full lg:w-[70%] md:w-[70%] p-0 lg:p-[20px] h-auto md:p-[20px]  ">
          <iframe
            ref={firstDivRef}
            className="player  drop-shadow-sm rounded-0  lg:rounded-2xl md:rounded-2xl top-[60px] fixed md:static lg:static border-b border-[#717171] md:border-b-[0] lg:border-b-[0] z-30  "
            controls
            autoPlay
            // width="560"
            // height="315"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v").split("?plid=")[0] +
              "?autoplay=1"
            }
            // src="https://www.youtube.com/embed/NMeUvG1kw08?si=FVYN1nPlJ-tSBYeK"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="  rounded-0  lg:rounded-xl md:rounded-xl player flex md:hidden lg:hidden drop-shadow-sm mt-[-60px] "></div>
          <span>
            <span></span>
          </span>

          <div
            className={`h-[60px] fixed z-10 w-full p-[10px] drop-shadow-sm border-b border-[#f2f2f2] py-[10px] flex md:hidden lg:hidden justify-start items-center overflow-x-scroll font-medium font-[robotoT] bg-white `}
            style={{
              top: `calc(${firstDivHeight}px + 60px)`,
            }}
          >
            {/* <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#242424] whitespace-nowrap cursor-pointer text-white sticky top-0">
              All
            </div> */}
            <Link
              className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer"
              to={"/search?v=" + chaName}
            >
              From {chaName}
            </Link>
            {/* <div className="h-full w-auto px-[10px] mr-[10px] rounded-xl flex justify-center items-center text-[14px] bg-[#f3f3f3] whitespace-nowrap cursor-pointer">
              Related
            </div> */}
            {tags?.map((data, index) => {
              // console.log(data);
              return (
                <Link
                  className="h-full w-auto px-[10px] mr-[10px] rounded-xl whitespace-nowrap flex justify-center items-center text-[14px] bg-[#f3f3f3] cursor-pointer"
                  key={index}
                  to={"/search?v=" + data}
                  // onClick={() => {
                  //   setSearchQuery("");
                  // }}
                >
                  {/* <div className="h-full w-auto px-[10px]  rounded-xl flex justify-center items-center "> */}
                  {data}
                  {/* </div> */}
                </Link>
              );
            })}
          </div>
          <div className="h-[60px] mt-[60px]  w-full p-[10px] py-[10px] flex md:hidden lg:hidden justify-start items-center overflow-x-scroll font-medium font-[robotoT]"></div>
          {/* <div id="description"></div>
          <div id="comment"></div> */}
          <div className="w-full z-30">
            <VideoDescription
              id={searchParams.get("v").split("?plid=")[0]}
              setChanName={setChanName}
              firstDivHeight={firstDivHeight}
            />
          </div>
          <Comments
            firstDivHeight={firstDivHeight}
            comments={comments}
            id={searchParams.get("v").split("?plid=")[0]}
            comm={c}
            ur={u}
          />
        </div>
        <div className="flex  lg:flex md:flex w-full lg:w-[calc(30%)]   md:w-[calc(30%)] h-auto mr-[20px]  flex-col items-start  mt-[20px] rounded-xl ">
          {searchParams.get("v").split("?plid=").length == 2 ? (
            <>
              <div
                ref={secondDivRef}
                className="w-full rounded-2xl bg-[#ffffff] hidden md:flex lg:flex flex-col justify-start items-start p-[10px] py-[20px] drop-shadow-sm mb-[10px]"
                style={{ transition: ".4s" }}
              >
                <div className="w-full h-[40px] flex flex-row justify-between items-center px-[10px]">
                  <div className=" h-full flex flex-col justify-start items-start">
                    <span className="text-[20px] font-[robotoT] h-[30px] overflow-hidden text-ellipsis line-clamp-1 font-bold">
                      {playName}
                    </span>
                    <span className="text-[13px] font-[roboto] h-0 font-normal text-[#6f6f6f]">
                      {playlists[0]?.snippet?.channelTitle} {pos + 1}/
                      {playlists?.length}
                    </span>
                  </div>
                  <div
                    className="w-[35px] h-[35px] rounded-full hover:bg-[#f3f3f3] cursor-pointer flex justify-center items-center"
                    onClick={() => setPlaylistFlag(!playlistFlag)}
                  >
                    {playlistFlag ? (
                      <>
                        <IoIosArrowUp className="text-[22px]" />
                      </>
                    ) : (
                      <>
                        <IoIosArrowDown className="text-[22px]" />
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={
                    "w-full mt-[10px]  flex flex-col justify-start items-start overflow-y-scroll" +
                    (playlistFlag
                      ? " h-[calc(100%-40px)] mt-[15px]"
                      : " h-0 mt-0")
                  }
                >
                  {playlists?.map((data, index) => {
                    return (
                      <>
                        <Link
                          className={
                            "w-full md:w-full lg:w-full p-[10px] rounded-xl hover:bg-[#f3f3f3] " +
                            (searchParams.get("v").split("?plid=")[0] ==
                            data?.snippet?.resourceId?.videoId
                              ? " bg-[#f3f3f3]"
                              : " bg-transparent")
                          }
                          key={data?.snippet?.resourceId?.videoId}
                          to={
                            "/watch?v=" +
                            data?.snippet?.resourceId?.videoId +
                            "?plid=" +
                            data?.snippet?.playlistId
                          }
                        >
                          <div className="w-full h-auto flex  lg:flex-row md:flex-row">
                            <img
                              src={data?.snippet?.thumbnails?.medium?.url}
                              className="w-[120px] md:w-[145px] lg:w-[145px] rounded-xl"
                            ></img>
                            <div className=" w-full md:w-[calc(100%-145px)]  lg:w-[calc(100%-145px)] pl-[10px] flex flex-col text-[#6F6F6F] font-[roboto]">
                              <span className=" w-full min-h-[20px] max-h-[42px] text-15px  text-[14px] flex items-start justify-start overflow-hidden text-black line-clamp-2 text-ellipsis font-semibold ">
                                {data?.snippet?.title}
                              </span>
                              <span className=" w-full h-[17px] text-[12px] mt-[3px] text-black flex justify-start items-center">
                                {data?.snippet?.channelTitle}{" "}
                                {searchParams.get("v").split("?plid=")[0] ==
                                data?.snippet?.resourceId?.videoId ? (
                                  <>
                                    <span className="text-white pl-[3px] pr-[7px] py-[1px] rounded-xl bg-[#1f1f1f] ml-[10px] font-medium font-[robotoT] flex justify-start items-center text-[12px]">
                                      {searchParams
                                        .get("v")
                                        .split("?plid=")[0] ==
                                      data?.snippet?.resourceId?.videoId ? (
                                        <>
                                          <CgLoadbarSound className="text-[20px] " />{" "}
                                          <TbAntennaBars3 className="text-[20px] ml-[-8px] mb-[1.3px] mr-[5px]" />
                                          Playing
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </span>{" "}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>
              <div
                ref={thirdDivRef}
                className={
                  " fixed md:relative lg:relative   flex flex-col justify-start items-start p-[10px] py-[20px] drop-shadow-sm  md:hidden lg:hidden z-50" +
                  (playlistFlag
                    ? " w-[100%]  bottom-[0px] left-[0px] rounded-none bg-[#ffffff] border-none drop-shadow-none"
                    : " w-[calc(100%-20px)]  bottom-[10px] left-[10px] rounded-2xl bg-[#ffffffc9] backdrop-blur-3xl border border-[#f3f3f3] drop-shadow-sm")
                }
                style={{ transition: ".4s" }}
              >
                {/* <div className="w-full flex justify-center items-center">
                  <div className="w-[50px] border-[2px] border-[#f3f3f3]"></div>
                </div> */}
                <div className="w-full h-[40px] flex flex-row justify-between items-center px-[10px]">
                  <div className=" h-full flex flex-col justify-start items-start">
                    {/* <span className="font-normal text-[13px] text-[#6f6f6f] mr-[5px]">
                  Playlist
                </span> */}
                    <span className="text-[20px] h-[30px]  overflow-hidden text-ellipsis line-clamp-1 font-[robotoT] font-bold">
                      {playName}
                    </span>
                    <span className="text-[13px] font-[roboto] font-normal h-0 text-[#6f6f6f]">
                      {playlists[0]?.snippet?.channelTitle} {pos + 1}/
                      {playlists?.length}
                    </span>
                  </div>
                  <div
                    className="w-[35px] h-[35px] rounded-full hover:bg-[#f3f3f3] bg-white cursor-pointer flex justify-center items-center"
                    onClick={() => setPlaylistFlag(!playlistFlag)}
                  >
                    {!playlistFlag ? (
                      <>
                        <IoIosArrowUp className="text-[22px]" />
                      </>
                    ) : (
                      <>
                        <IoIosArrowDown className="text-[22px]" />
                      </>
                    )}
                  </div>
                </div>
                {videoFlag ? (
                  <>
                    <div
                      className={
                        "w-full mt-[10px]  flex flex-col justify-start items-start overflow-y-scroll" +
                        (playlistFlag
                          ? " h-[calc(100%-40px)] mt-[15px]"
                          : " h-0 mt-0")
                      }
                    >
                      {playlists?.map((data, index) => {
                        return (
                          <>
                            <Link
                              className={
                                "w-full md:w-full lg:w-full p-[10px] rounded-xl hover:bg-[#f3f3f3] " +
                                (searchParams.get("v").split("?plid=")[0] ==
                                data?.snippet?.resourceId?.videoId
                                  ? " bg-[#f3f3f3]"
                                  : " bg-transparent")
                              }
                              key={data?.snippet?.resourceId?.videoId}
                              to={
                                "/watch?v=" +
                                data?.snippet?.resourceId?.videoId +
                                "?plid=" +
                                data?.snippet?.playlistId
                              }
                            >
                              <div className="w-full h-auto flex  lg:flex-row md:flex-row">
                                <div className="w-[160px] player ">
                                  <img
                                    loading="lazy"
                                    src={data?.snippet?.thumbnails?.medium?.url}
                                    className="w-full h-full rounded-xl "
                                  ></img>
                                </div>
                                <div className=" w-full md:w-[calc(100%-145px)]  lg:w-[calc(100%-145px)] pl-[10px] flex flex-col text-[#6F6F6F] font-[roboto]">
                                  <span className=" w-full min-h-[20px] max-h-[42px] text-15px  text-[14px] flex items-start justify-start overflow-hidden text-black line-clamp-2 text-ellipsis font-semibold ">
                                    {data?.snippet?.title}
                                  </span>

                                  <span className=" w-full h-[17px] text-[12px] mt-[3px] text-black flex justify-start items-center">
                                    {data?.snippet?.channelTitle}{" "}
                                    {searchParams.get("v").split("?plid=")[0] ==
                                    data?.snippet?.resourceId?.videoId ? (
                                      <>
                                        <span className="text-white pl-[6px] pr-[10px] py-[2px] rounded-full bg-[#1f1f1f] ml-[10px] font-medium font-[robotoT] flex justify-start items-center ">
                                          {searchParams
                                            .get("v")
                                            .split("?plid=")[0] ==
                                          data?.snippet?.resourceId?.videoId ? (
                                            <>
                                              <CgLoadbarSound className="text-[20px] " />{" "}
                                              <TbAntennaBars3 className="text-[20px] ml-[-8px] mb-[1.3px] mr-[5px]" />
                                              Playing
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </span>{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={
                        "w-full mt-[10px]  flex flex-col justify-start items-start overflow-y-scroll overflow-hidden" +
                        (playlistFlag
                          ? " h-[calc(100%-40px)] mt-[15px]"
                          : " h-0 mt-0")
                      }
                    >
                      {Array(8)
                        .fill(" ")
                        .map((data) => {
                          return (
                            <>
                              <div className="w-full md:w-full lg:w-full p-[10px] rounded-xl bg-transparent ">
                                <div className="w-full h-auto flex  lg:flex-row md:flex-row">
                                  <div className="w-[160px] player rounded-xl  ">
                                    <div className="w-full h-full rounded-xl animate-pulse bg-[#f3f3f3]">
                                      {" "}
                                    </div>
                                  </div>
                                  <div className=" w-full md:w-[calc(100%-145px)]  lg:w-[calc(100%-145px)] pl-[10px] flex flex-col text-[#6F6F6F] font-[roboto]">
                                    <span className=" w-full h-[24px] rounded-sm bg-[#f3f3f3] animate-pulse "></span>

                                    <span className=" w-full h-[20px] rounded-sm animate-pulse text-[12px] mt-[7px] bg-[#f3f3f3] flex justify-start items-center"></span>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          <RelatedVideosContainer tags={tags} chaName={chaName} />
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
