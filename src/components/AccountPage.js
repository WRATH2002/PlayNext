import React, { useEffect, useRef, useState } from "react";
import { API_KEY, CHANNEL_LOGO_API } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import VideoCard from "./VideoCard";

const PLayList = (props) => {
  // playlist videso

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (playlists.length == 0) {
      fetchPlaylists();
    }
  }, [props?.data?.id]);

  const fetchPlaylists = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=" +
        props?.data?.id +
        "&key=" +
        API_KEY +
        "&maxResults=50"
    );
    const json = await data.json();
    console.log(
      "Videos PLaylistsssssss API called ......................................................................"
    );
    setPlaylists(json?.items);
  };

  return (
    <>
      <Link
        className="w-full md:w-[calc((100%-64px)/4)] lg:w-[calc((100%-64px)/4)] m-0 md:mr-[16px] lg:mr-[16px] mb:[20px] lg:mb-[20px] md:mb-[20px] hidden md:block lg:block "
        key={playlists[0]?.snippet?.resourceId?.videoId}
        to={
          "/watch?v=" +
          playlists[0]?.snippet?.resourceId?.videoId +
          "?plid=" +
          props?.data?.id
        }
      >
        <div className="w-full   ">
          <img
            className=" player object-cover rounded-0 md:rounded-xl lg:rounded-xl "
            src={props?.data?.snippet?.thumbnails?.high?.url}
          ></img>
          {/* <div className="player relative top-0 bg-black"></div> */}
          <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
            <span className="text-[white] text-[12px] font-[roboto] font-[700px] px-[5px] rounded-[3px] bg-[#000000b6] flex justify-end items-center">
              <MdOutlinePlaylistPlay className="text-[18px] mr-[3px]" />{" "}
              {playlists.length} videos
            </span>
          </span>
          <div className="flex items-start  mt-[10px] h-[75px]  md:h-[100px] lg:h-[100px] w-full">
            <div className="flex flex-col justify-start w-full  ">
              <div className="w-full font-[robotoT] font-normal overflow-hidden text-ellipsis line-clamp-2 leading-5  ">
                {props?.data?.snippet?.title}
              </div>
              <div className="w-full h-auto overflow-hidden text-ellipsis line-clamp-2   mt-[11px] text-[14px] text-[#6f6f6f]   ">
                {props?.data?.snippet?.description ? (
                  <>{props?.data?.snippet?.description}</>
                ) : (
                  <>No Description Available</>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Link
        className="h-auto mb-[5px] flex justify-start items-start w-full md:hidden lg:hidden"
        key={playlists[0]?.snippet?.resourceId?.videoId}
        to={
          "/watch?v=" +
          playlists[0]?.snippet?.resourceId?.videoId +
          "?plid=" +
          props?.data?.id
        }
      >
        <div className="w-full h-auto mb-[10px] flex justify-start items-start">
          <div className="bg-[#f3f3f3] rounded-2xl h-auto w-[170px]">
            <div className="player">
              <img
                loading="lazy"
                className="w-full h-full rounded-2xl object-cover"
                src={props?.data?.snippet?.thumbnails?.high?.url}
              ></img>
              <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
                <span className="text-[white] text-[12px] font-[roboto] font-[700px] px-[5px] rounded-[3px] bg-[#000000b6] flex justify-end items-center">
                  <MdOutlinePlaylistPlay className="text-[18px] mr-[3px]" />{" "}
                  {playlists.length} videos
                </span>
              </span>
            </div>
          </div>
          <div className="w-[calc(100%-170px)] pl-[15px] flex flex-col h-full justify-start items-start">
            <div className="text-[15px] font-[robotoT] leading-[18px] font-medium w-full overflow-hidden text-ellipsis line-clamp-2">
              {props?.data?.snippet?.title}
            </div>
            <div className="w-full h-auto overflow-hidden text-ellipsis line-clamp-2  text-[13px]  mt-[11px] text-[#6f6f6f]   ">
              {props?.data?.snippet?.description ? (
                <>{props?.data?.snippet?.description}</>
              ) : (
                <>No Description Available</>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </Link>
    </>
  );
};

const AccountPage = (props) => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [chanDetail, setChanDetail] = useState();
  const [parentSection, setParentSection] = useState("Videos");
  const [section, setSection] = useState("Newest");
  const [total, setTotal] = useState("");
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));

  useEffect(() => {
    if (videos.length == 0) {
      SearchSuggestion();
    }
    if (playlists.length == 0) {
      fetchPlaylists();
    }
    if (chanDetail == undefined) {
      getChannelLogo();
    }
  }, []);

  const getChannelLogo = async () => {
    const data = await fetch(CHANNEL_LOGO_API + searchParams.get("id"));
    const jsonData = await data.json();
    console.log(
      "logo api calleddddddddddddddddddddddddddddddd ......................................."
    );
    console.log(jsonData);
    setChanDetail(jsonData?.items[0]);
    // setChannelLogo(jsonData?.items[0]?.snippet?.thumbnails?.default?.url);
  };

  const SearchSuggestion = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        API_KEY +
        "&channelId=" +
        searchParams.get("id") +
        "&part=snippet,id&order=date&maxResults=50&pageToken=" +
        nextPageToken
    );
    const json = await data.json();
    console.log(
      "Videos API called ......................................................................"
    );
    // console.log(searchVideos);
    setNextPageToken(json?.nextPageToken);
    setTotal(json?.pageInfo?.totalResults);
    console.log(json);
    console.log(data);
    setVideos(json?.items);
  };

  const fetchPlaylists = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=" +
        searchParams.get("id") +
        "&key=" +
        API_KEY +
        "&maxResults=50"
    );
    const json = await data.json();
    console.log(
      "Videos API called ......................................................................"
    );
    // console.log(searchVideos);
    // setNextPageToken(json?.nextPageToken);
    // set(json?.pageInfo?.totalResults);
    console.log(json);
    console.log(data);
    setPlaylists(json?.items);
  };

  const scrollableDivRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if the user has scrolled to the bottom
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       alert("You have reached the end of the page!");
  //       // SearchSuggestion();
  //     }
  //   };

  //   // Add event listener
  //   const a = document.getElementById("divv");
  //   a.addEventListener("scroll", handleScroll);

  //   // Cleanup the event listener on component unmount
  //   // return () => {
  //   //   window.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollableDiv = scrollableDivRef.current;
  //     if (scrollableDiv) {
  //       console.log("ScrollTop:", scrollableDiv.scrollTop);
  //       console.log("ClientHeight:", scrollableDiv.clientHeight);
  //       console.log("ScrollHeight:", scrollableDiv.scrollHeight);

  //       if (
  //         scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
  //         scrollableDiv.scrollHeight
  //       ) {
  //         alert("You have reached the end of the div!");
  //         SearchSuggestion();
  //       }
  //     }
  //   };

  //   const scrollableDiv = scrollableDivRef.current;
  //   if (scrollableDiv) {
  //     // Add event listener
  //     scrollableDiv.addEventListener("scroll", handleScroll);
  //     console.log("Scroll event listener added.");
  //   }

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     if (scrollableDiv) {
  //       scrollableDiv.removeEventListener("scroll", handleScroll);
  //       console.log("Scroll event listener removed.");
  //     }
  //   };
  // }, []);

  //   const scrollableDivRef = useRef(null);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const div = scrollableDivRef.current;
  //       if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
  //         alert("You have reached the bottom of the scrollable div!");
  //       }
  //     };

  //     const div = scrollableDivRef.current;
  //     div.addEventListener("scroll", handleScroll);

  //     return () => div.removeEventListener("scroll", handleScroll);
  //   }, []);

  function getDurationSince(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate - givenDate;

    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;

    if (diffInYears >= 1) {
      return `${Math.floor(diffInYears)} years ago`;
    } else if (diffInMonths >= 1) {
      return `${Math.floor(diffInMonths)} months ago`;
    } else if (diffInWeeks >= 1) {
      return `${Math.floor(diffInWeeks)} weeks ago`;
    } else if (diffInDays >= 1) {
      return `${Math.floor(diffInDays)} days ago`;
    } else if (diffInHours >= 1) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    }
  }

  function sortByOldestDuration() {
    setVideos(
      videos.sort((a, b) => {
        const dateA = new Date(a?.snippet?.publishedAt);
        const dateB = new Date(b?.snippet?.publishedAt);
        return dateA - dateB; // Sorting in ascending order (oldest first)
      })
    );
  }

  function sortByNewestDuration() {
    setVideos(
      videos.sort((a, b) => {
        const dateA = new Date(a?.snippet?.publishedAt);
        const dateB = new Date(b?.snippet?.publishedAt);
        return dateB - dateA; // Sorting in descending order (newest first)
      })
    );
  }

  return (
    <div
      // id="divv"
      ref={scrollableDivRef}
      className="w-full h-[calc(100dvh-60px)]  flex flex-col justify-start items-start overflow-y-scroll font-[roboto] font-normal p-[0px] md:p-[20px] lg:p-[20px] bg-transparent pl-0"
    >
      <div className="w-full h-auto flex flex-col justify-start  items-start bg-white border-none md:border lg:border border-[#eeeeee] drop-shadow-none md:drop-shadow-sm lg:drop-shadow-sm rounded-2xl p-[20px] pr-[20px] md:pr-[4px] lg:pr-[4px] ">
        <div className="w-full h-auto flex justify-start items-start">
          <div className="w-[70px] h-[70px] md:w-[160px] md:h-[160px] lg:w-[160px] lg:h-[160px] rounded-full bg-[#f3f3f3] ">
            <img
              loading="lazy"
              className="w-full h-full rounded-full object-cover"
              src={chanDetail?.snippet?.thumbnails?.high?.url}
            ></img>
          </div>
          <div className="w-[calc(100%-70px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-160px)] pl-[20px] flex flex-col justify-center items-start h-full font-[roboto] font-normal ">
            <div className="text-[22px] md:text-[32px] lg:text-[32px] font-bold font-[robotoT]">
              {videos[0]?.snippet?.channelTitle}
            </div>
            <div className="text-[13px] md:text-[15px] lg:text-[15px]  text-[#000000]">
              <span className="w-full hidden md:flex lg:flex">
                {chanDetail?.snippet?.customUrl} 10.5M Subscribers
              </span>
              <span className="w-full flex md:hidden lg:hidden">
                {chanDetail?.snippet?.customUrl}
              </span>
            </div>
            <div className="text-[15px] text-[#000000] mt-[1px] md:mt-[3px] lg:mt-[3px]">
              <div className="w-full hidden md:flex lg:flex overflow-hidden text-ellipsis line-clamp-1 text-[#6F6F6F]">
                {chanDetail?.snippet?.description}
              </div>
              <div className="w-full flex md:hidden lg:hidden justify-start items-center text-[13px] whitespace-nowrap">
                1.32M subscribers • {total} videos
              </div>
            </div>
            <div className="cursor-pointer text-[13px] md:text-[15px] lg:text-[15px] w-auto px-[15px] h-[35px] rounded-full bg-black text-white hidden md:flex lg:flex justify-center items-center mt-[10px] whitespace-pre">
              Subscribe
            </div>
          </div>
        </div>
        <div className="flex md:hidden lg:hidden justify-between items-center w-full mt-[10px] text-[13px]">
          <span className="w-[70%] overflow-hidden text-ellipsis line-clamp-1">
            {chanDetail?.snippet?.description}
          </span>
          <div className="px-[15px] py-[4px] rounded-full bg-black text-white h-[34px] flex justify-center items-center ">
            Subscribe
          </div>
        </div>
        {/* <div>ChannelInfo</div> */}
        <div className="w-full h-auto text-black font-medium font-[robotoT] mt-[10px]">
          <div className="w-full h-[50px] border-b border-[#eaeaea] flex justify-start items-center">
            <div className="w-auto text-[#6F6F6F] border-b-[2px] border-transparent mr-[20px] h-full text-[15px] md:text-[16px] lg:text-[16px] flex justify-center items-center cursor-pointer">
              Home
            </div>
            <div
              className={
                "w-auto border-b-[2px]  mr-[20px] h-full text-[15px] md:text-[16px] lg:text-[16px] flex justify-center items-center cursor-pointer" +
                (parentSection == "Videos"
                  ? " border-[black] text-black"
                  : " border-transparent text-[#6F6F6F]")
              }
              onClick={() => {
                setParentSection("Videos");
                // sortByNewestDuration();
              }}
            >
              Videos
            </div>
            <div
              className={
                "w-auto border-b-[2px] mr-[20px] h-full text-[15px] md:text-[16px] lg:text-[16px] flex justify-center items-center cursor-pointer" +
                (parentSection == "Playlists"
                  ? " border-[black] text-black"
                  : " border-transparent text-[#6F6F6F]")
              }
              onClick={() => {
                setParentSection("Playlists");
                // sortByNewestDuration();
              }}
            >
              Playlists
            </div>
          </div>
          {parentSection == "Videos" ? (
            <>
              <div className="w-full h-auto flex flex-col justify-start items-start">
                <div className="h-[55px] my-[10px] w-full flex justify-start items-center py-[10px]">
                  <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Newest"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Newest");
                      sortByNewestDuration();
                    }}
                  >
                    Newest
                  </div>
                  <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Oldest"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Oldest");
                      sortByOldestDuration();
                    }}
                  >
                    Oldest
                  </div>
                  <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Popular"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Popular");
                    }}
                  >
                    Popular
                  </div>
                </div>
                <div className="w-full  hidden md:flex lg:flex flex-col md:flex-row lg:flex-row justify-start items-start flex-wrap">
                  {videos?.map((data, index) => {
                    return (
                      <>
                        <Link
                          className="w-full md:w-[calc((100%-64px)/4)] lg:w-[calc((100%-64px)/4)] m-0 md:mr-[16px] lg:mr-[16px] mb:[20px] lg:mb-[20px] md:mb-[20px] "
                          key={data?.id?.videoId}
                          to={"/watch?v=" + data?.id?.videoId}
                        >
                          <div className="w-full   ">
                            <img
                              className=" player object-cover rounded-0 md:rounded-xl lg:rounded-xl"
                              src={data?.snippet?.thumbnails?.high?.url}
                            ></img>
                            <span className="flex justify-end items-center px-[4px] mt-[-31px] h-[33px] w-full">
                              <span className="text-[white] text-[12px] font-[roboto] font-[700px] px-[5px] rounded-[3px] bg-[#00000089]">
                                03:34
                              </span>
                            </span>
                            <div className="flex items-start  mt-[10px] h-[75px]  md:h-[100px] lg:h-[100px] w-full">
                              <div className="flex flex-col justify-start w-full  ">
                                <div className="w-full font-[robotoT] font-normal overflow-hidden text-ellipsis line-clamp-2 leading-5  ">
                                  {data?.snippet?.title}
                                </div>
                                <div className="w-full h-[22px] md:h-[40px] lg:h-[40px]   flex flex-row lg:flex-col md:flex-col text-[12px] md:text-[14px] lg:text-[14px] text-[#6F6F6F] font-[robotoT] font-normal  justify-start items-center md:justify-center md:items-start lg:justify-center lg:items-start mt-0  ">
                                  <div className="flex-row flex justify-start items-center h-full">
                                    30M views
                                    <span className=" flex justify-center items-center mx-[5px] h-full">
                                      •
                                    </span>
                                    <span className="  h-full flex justify-center items-center overflow-hidden line-clamp-1 text-ellipsis  whitespace-nowrap">
                                      {getDurationSince(
                                        data?.snippet?.publishedAt
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
                <div className="w-full flex md:hidden lg:hidden flex-col md:flex-row lg:flex-row justify-start items-start flex-wrap">
                  {videos?.map((data, index) => {
                    return (
                      <>
                        <Link
                          className="h-auto mb-[5px] flex justify-start items-start w-full"
                          key={data?.id?.videoId}
                          to={"/watch?v=" + data?.id?.videoId}
                        >
                          <div className="w-full h-auto mb-[10px] flex justify-start items-start">
                            <div className="bg-[#f3f3f3] rounded-2xl h-auto w-[170px]">
                              <div className="player">
                                <img
                                  loading="lazy"
                                  className="w-full h-full rounded-2xl object-cover"
                                  src={data?.snippet?.thumbnails?.high?.url}
                                ></img>
                              </div>
                            </div>
                            <div className="w-[calc(100%-170px)] pl-[15px] flex flex-col h-full justify-start items-start">
                              <div className="text-[15px] font-[robotoT] leading-[18px] font-medium w-full overflow-hidden text-ellipsis line-clamp-2">
                                {data?.snippet?.title}
                              </div>
                              <div className="font-normal text-[12px] mt-[5px] text-[#6F6F6F]">
                                234L views •{" "}
                                {getDurationSince(data?.snippet?.publishedAt)}
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-auto flex flex-col justify-start items-start">
                <div className="h-[55px] my-[10px] w-full flex justify-start items-center py-[10px]">
                  {playlists.length == 0 ? (
                    <>No playlists has been created by the owner</>
                  ) : (
                    <>Total Result : {playlists.length}</>
                  )}
                  {/* <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Newest"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Newest");
                      sortByNewestDuration();
                    }}
                  >
                    Newest
                  </div> */}
                  {/* <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Oldest"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Oldest");
                      sortByOldestDuration();
                    }}
                  >
                    Oldest
                  </div> */}
                  {/* <div
                    className={
                      "px-[15px] h-full rounded-xl mr-[9px] flex justify-center items-center text-[14px] cursor-pointer" +
                      (section == "Popular"
                        ? " bg-[#000000] text-[white]"
                        : " bg-[#f3f3f3] text-[black]")
                    }
                    onClick={() => {
                      setSection("Popular");
                    }}
                  >
                    Popular
                  </div> */}
                </div>
                {playlists.length == 0 ? (
                  <></>
                ) : (
                  <>
                    <div className="w-full  hidden md:flex lg:flex flex-col md:flex-row lg:flex-row justify-start items-start flex-wrap">
                      {playlists?.map((data, index) => {
                        return (
                          <>
                            {/* <Link
                          className="w-full md:w-[calc((100%-64px)/4)] lg:w-[calc((100%-64px)/4)] m-0 md:mr-[16px] lg:mr-[16px] mb:[20px] lg:mb-[20px] md:mb-[20px] "
                          key={data?.id?.videoId}
                          to={"/watch?v=" + data?.id?.videoId}
                        > */}
                            <PLayList data={data} />
                            {/* </Link> */}
                          </>
                        );
                      })}
                    </div>
                    <div className="w-full flex md:hidden lg:hidden flex-col md:flex-row lg:flex-row justify-start items-start flex-wrap">
                      {playlists?.map((data, index) => {
                        return (
                          <>
                            <PLayList data={data} />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* <div className="w-full h-auto mb-[10px] flex justify-start items-start">
              <div className="bg-[#f3f3f3] rounded-2xl h-auto w-[170px]">
                <div className="player">
                  <img
                    className="w-full h-full rounded-2xl object-cover"
                    src="https://images.pexels.com/photos/325139/pexels-photo-325139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  ></img>
                </div>
              </div>
            </div> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
