import ytlogo from "../assets/img/vid2.png";
import logo from "../assets/img/logo6.png";
import { IoMdMic } from "react-icons/io";
import { BiSearch, BiUser } from "react-icons/bi";
import { GoDownload, GoHistory, GoSearch } from "react-icons/go";
import { FiAirplay, FiArrowLeft, FiBarChart2 } from "react-icons/fi";
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLike, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsBell, BsPerson } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import VideoContainer from "./VideoContainer";
import WatchVideoPage from "./WatchVideoPage";
import { useSelector } from "react-redux";
import { toggleSidebar, openSidebar } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { SEARCH_API } from "../utils/constants";
import SearchSuggestionContainer from "./SearchSuggestionContainer";
import { buttonList } from "../utils/constants";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import {
  PiBell,
  PiBellBold,
  PiBellSimple,
  PiMicrophone,
  PiMicrophoneFill,
} from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdMicNone, MdPerson } from "react-icons/md";
// Sidebar Icons
import { PiBellSimpleFill } from "react-icons/pi";
import { TiVideo } from "react-icons/ti";
import { LuLogOut, LuSearchX, LuUser } from "react-icons/lu";
import { IoTrendingUpOutline, IoVideocamOutline } from "react-icons/io5";
import { RiMicLine, RiUser3Line, RiUser6Line } from "react-icons/ri";
import { HiOutlineVideoCamera } from "react-icons/hi2";
// import { useHistory } from "react-router-dom";
const Navbar = () => {
  const [phone, setPhone] = useState(true);
  const sidebarFlag = useSelector((store) => store.app.sidebar);
  const dispatch = useDispatch();
  const [pSearch, setPSearch] = useState(false);
  const [help, setHelp] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  console.log(searchQuery);

  // if (searchQuery != "") {
  //   setSuggestionFlag(true);
  // }
  useEffect(() => {
    if (searchQuery.length != 0) {
      const timer = setTimeout(() => SearchSuggestionn(), 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery]);

  function sidebarHandler() {
    dispatch(toggleSidebar());
  }
  function clearSuggestion() {
    setSearchSuggestion([]);
    setSearchQuery("");
  }

  const SearchSuggestionn = async () => {
    // const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
    // const targetUrl = `http://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=${searchQuery}`;
    // const fullUrl = corsProxyUrl + targetUrl;

    // const options = {
    //   method: "GET", // Using GET request instead of POST
    //   headers: {
    //     "x-requested-with": "XMLHttpRequest",
    //   },
    // };

    // try {
    //   console.log("Sending request to CORS proxy...");
    //   console.log("Full URL:", fullUrl);

    //   const response = await fetch(fullUrl, options);
    //   const result = await response.json();

    //   console.log("Response status:", response.status);
    //   console.log("Response text:", result);
    //   setSearchSuggestion(result[1]);

    //   // Check if the response is okay
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   console.log("Result:", result);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

    const data = await fetch(SEARCH_API + searchQuery);
    const json = await data.json();
    console.log("search suggestion");
    console.log(json);
    setSearchSuggestion(json[1]);
  };

  // dispatch(addItemName({ name, isVeg, price, qty, id }));
  // const [sidebar, SetSidebar] = useState(false);

  // function toggleSidebar() {
  //   SetSidebar(!sidebar);
  // }
  function PhoneSearchToggle() {
    setPhone(false);
  }

  // const history = useHistory();

  return (
    <>
      {pSearch === true && phone === true ? (
        <>
          <div className="w-full h-[100svh] bg-[#f7f7f7] fixed z-50 pt-[15px]">
            <div className="w-full h-[45px] flex justify-center items-center mb-[10px] px-[10px]">
              <div
                className="w-[30px] h-[45px] rounded-full flex justify-center items-center mr-[10px] "
                onClick={() => {
                  setSearchQuery("");
                  setPSearch(false);
                  setSearchSuggestion([]);
                }}
              >
                <GoArrowLeft className="text-[25px] text-[#000000]" />
              </div>
              <input
                className="w-[calc(100%-50px)] h-full border border-[#f0f0f0] px-[20px] pr-[50px] outline-none bg-[#ffffff] rounded-xl  text-[black] font-[roboto]"
                placeholder="Search PlayNext"
                // type="text"
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.nativeEvent.key === "Enter") {
                    console.log("enter");
                    window.location.href = "/search?v=" + searchQuery;
                  }
                }}
                onChange={(e) => {
                  console.log(e);
                  setSearchQuery(e.target.value);
                }}
              ></input>
              <div className="w-[40px] h-[45px] ml-[-40px] rounded-full flex justify-center items-center  bg-[#ffffff]">
                <PiMicrophone className="text-[20px] text-[#000000]" />
              </div>
            </div>
            <div className="w-full h-auto">
              {/* {searchQuery.length === 0 ? (
                <div className="w-full  mt-[10px] shadow-md rounded-xl bg-[#222222]"></div>
              ) : searchSuggestion?.length === 0 && searchQuery.length !== 0 ? (
                <div className="w-full  mt-[10px] shadow-md rounded-xl py-[10px]">
                  <div className="w-full px-[13px] h-[45px] flex justify-start items-center hover:bg-[#323232d7]">
                    <div className=" h-[20px] text-[black] font-[roboto]  w-[100%] flex justify-start items-center bg-transparent">
                      <LuSearchX className="mr-[30px] text-[25px]" />
                      <span>No Related Search Suggestion</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full  mt-[10px] shadow-md rounded-xl py-[10px]">
                  {searchSuggestion?.map((search, index) => (
                    <Link
                      className="w-full px-[13px] h-[45px] flex justify-start items-center hover:bg-[#323232d7]"
                      key={index}
                      to={"/search?v=" + search}
                      onClick={() => {
                        setPSearch(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className=" h-[20px] text-[black] font-[roboto]  w-[100%] flex justify-start items-center bg-transparent">
                        <GoSearch className="mr-[30px] text-[25px]" />
                        <span>{search}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )} */}

              {searchSuggestion?.length > 0 ? (
                <div className="w-[calc(100%-36px)] ml-[18px]  mt-[15px] px-[10px] drop-shadow-sm  rounded-2xl bg-[#ffffff] py-[10px]">
                  {searchSuggestion?.map((search, index) => (
                    <Link
                      className="w-full  h-[40px] flex justify-start items-center hover:bg-[#f7f7f7] rounded-lg"
                      key={index}
                      to={"/search?v=" + search}
                      onClick={() => {
                        setSearchQuery("");
                        setPSearch(false);
                        setSearchSuggestion([]);
                      }}
                    >
                      <SearchSuggestionContainer data={search} />
                    </Link>
                  ))}
                </div>
              ) : searchSuggestion?.length == 0 && searchQuery.length > 0 ? (
                <div className="w-[calc(100%-36px)] ml-[18px]  mt-[15px]  p-[10px] drop-shadow-sm rounded-2xl bg-[#ffffff]">
                  <div className="w-full  h-auto flex flex-col justify-center items-start  rounded-lg">
                    <div className="p-[15px] h-[20px] text-[black] font-[roboto]  w-full flex justify-between items-center bg-transparent">
                      <div className="flex justify-start items-center">
                        <FiSearch className="mr-[15px] text-[18px]" />
                        No Results Fetched
                      </div>
                      <div>
                        <RxQuestionMarkCircled
                          className="text-[20px] cursor-pointer"
                          onClick={() => setHelp(!help)}
                        />
                      </div>
                    </div>
                    {/* {help ? ( */}
                    <div className="p-[15px] h-auto text-[14px] text-[black] font-[roboto]  w-full  bg-transparent">
                      For CORS Error, you have to create a demo server to fetch
                      Search Suggestions. Simply{" "}
                      <a
                        className="font-semibold whitespace-nowrap cursor-pointer "
                        href="https://cors-anywhere.herokuapp.com/corsdemo"
                        target="_blank"
                      >
                        Click Here
                      </a>{" "}
                      and click 'Request Temporary Demo Server'.
                    </div>
                    {/* ) : (
                          <></>
                        )} */}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {phone === false ? (
        <>
          <div className="h-[60px] fixed flex w-full justify-center items-center bg-[#0f0f0f]">
            <div
              className="w-[40px] h-[40px] rounded-full flex justify-center items-center mx-[10px] cursor-pointer"
              onClick={() => PhoneSearchToggle()}
            >
              <FiArrowLeft className="text-[20px]" />
            </div>
            <div className="w-[calc(100%-120px)]">
              <input
                className="w-full px-[20px] outline-none h-[40px] rounded-full border border-[#bdbdbd]  "
                placeholder="Search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
            </div>
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center mx-[10px]">
              <IoMdMic className="text-[20px]" />
            </div>
          </div>
          <div className="h-[60px]  w-full flex justify-center items-center"></div>
        </>
      ) : (
        <>
          <div
            className="h-[60px] w-full flex fixed justify-center items-center   z-2 bg-[#ffffffc9] backdrop-blur-2xl"
            style={{ zIndex: "2" }}
          >
            <div className="h-[40px] flex justify-start items-center w-[60%]  lg:w-[28%] md:w-[28%] z-50 text-[#000000]">
              {sidebarFlag ? (
                <RxCross2
                  onClick={() => sidebarHandler()}
                  className="rotate-90 text-[24px] mx-[23px] cursor-pointer flex md:flex  lg:flex"
                />
              ) : (
                <FiBarChart2
                  onClick={() => sidebarHandler()}
                  className="rotate-90 text-[24px] mx-[23px] cursor-pointer flex md:flex  lg:flex"
                />
              )}

              {/* <img
                className="h-[33px] cursor-pointer hidden md:flex  lg:flex"
                src={ytlogo}
              ></img> */}
              <Link
                className="w-auto h-auto flex justify-center items-center "
                to={"/"}
              >
                <img
                  className="h-[29px] cursor-pointer mr-[5px] ml-[-10px] md:ml-0 lg:ml-0"
                  src={logo}
                ></img>
                <span className="font-[kenya] font-normal text-[23px] tracking-[0.005rem]">
                  PlayNext
                </span>
              </Link>
            </div>
            <div className=" h-[40px] w-[40%] lg:w-[72%] md:w-[72%] flex justify-between items-start ">
              <div className="w-[30%] lg:w-[80%] md:w-[80%] flex justify-end lg:justify-start items-start">
                <button className="w-[40px] h-[40px]  hidden md:flex lg:flex justify-center items-center z-10 ml-[5px] mr-[-45px] ">
                  <FiSearch
                    className="text-[18px] text-[#000000]"
                    onClick={() => setPSearch(true)}
                  />
                </button>
                <div className=" flex-col items-end hidden lg:flex lg:w-[63%]">
                  <input
                    className="w-full pr-[80px] pl-[45px] border border-[#ededed] outline-none h-[40px] text-[#000000] rounded-xl bg-[#f7f7f7]  font-[roboto] font-[400]"
                    placeholder="Search PlayNext"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.nativeEvent.key === "Enter") {
                        // setPSearch(true);
                        // console.log("enter");
                        window.location.href = "/search?v=" + searchQuery;
                        setSearchQuery("");
                        clearSuggestion();
                      }
                    }}
                  ></input>
                  {searchQuery.length === 0 ? (
                    <></>
                  ) : (
                    <div
                      className="mt-[-40px] mr-[40px] cursor-pointer w-[40px] h-[40px] rounded-full  flex justify-center items-center"
                      onClick={() => clearSuggestion()}
                    >
                      <RxCross2 className="text-[18px] text-[#000000]" />
                    </div>
                  )}

                  {searchSuggestion?.length > 0 ? (
                    <div className="w-full  mt-[20px] px-[10px] drop-shadow-sm border border-[#ececec] rounded-2xl bg-[#ffffff] py-[10px]">
                      {searchSuggestion?.map((search, index) => (
                        <Link
                          className="w-full  h-[40px] flex justify-start items-center hover:bg-[#f7f7f7] rounded-lg"
                          key={index}
                          to={"/search?v=" + search}
                          onClick={() => {
                            setSearchQuery("");
                            clearSuggestion();
                          }}
                        >
                          <SearchSuggestionContainer data={search} />
                        </Link>
                      ))}
                    </div>
                  ) : searchSuggestion?.length == 0 &&
                    searchQuery.length > 0 ? (
                    <div className="w-full  mt-[20px] p-[10px] drop-shadow-sm rounded-2xl border border-[#ececec] bg-[#ffffff]">
                      <div className="w-full  h-auto flex flex-col justify-center items-start  rounded-lg">
                        <div className="p-[15px] h-[20px] text-[black] font-[roboto]  w-full flex justify-between items-center bg-transparent">
                          <div className="flex justify-start items-center">
                            <FiSearch className="mr-[15px] text-[18px]" />
                            No Results Fetched
                          </div>
                          <div>
                            <RxQuestionMarkCircled
                              className="text-[20px] cursor-pointer"
                              onClick={() => setHelp(!help)}
                            />
                          </div>
                        </div>
                        {/* {help ? ( */}
                        <div className="p-[15px] h-auto text-[14px] text-[black] font-[roboto]  w-full  bg-transparent">
                          For CORS Error, you have to create a demo server to
                          fetch Search Suggestions. Simply{" "}
                          <a
                            className="font-semibold whitespace-nowrap cursor-pointer "
                            href="https://cors-anywhere.herokuapp.com/corsdemo"
                            target="_blank"
                          >
                            Click Here
                          </a>{" "}
                          and click 'Request Temporary Demo Server'.
                        </div>
                        {/* ) : (
                          <></>
                        )} */}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="w-[40px] h-[40px] rounded-full ml-[-46px] mr-[6px] hidden md:flex lg:flex justify-center items-center">
                  <MdMicNone className="text-[20px] text-[#000000]" />{" "}
                </div>
                {/* <button className="w-[40px] lg:w-[65px]  hidden lg:flex md:flex items-center justify-center h-[40px] rounded-full lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none cursor-pointer border-none md:border-[1.5px] lg:border-[1.5px] border-[#f3f3f3] bg-[#f3f3f3] border-l-0">
                  <FiSearch
                    className="text-[20px] text-[#000000]"
                    onClick={() => setPSearch(true)}
                  />
                </button>
                <div
                  className="w-[40px] ml-0 lg:ml-[20px] md:ml-[20px]  hidden lg:flex md:flex items-center justify-center h-[40px] rounded-full cursor-pointer bg-[#f3f3f3]
            "
                >
                  <PiMicrophone className="text-[20px] text-[#000000] " />
                </div> */}
              </div>
              <div className="w-[70%] lg:w-[20%] md:w-[20%]  flex justify-center lg:justify-end md:justify-end  items-center text-[black]">
                <div className="flex lg:hidden md:hidden justify-center items-center mx-[5px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  <FiSearch
                    className="text-[20px]"
                    onClick={() => setPSearch(true)}
                  />
                </div>
                <div className="hidden lg:flex md:flex justify-center items-center mx-[5px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  <HiOutlineVideoCamera className="text-[20px] " />
                </div>
                <div className="flex justify-center items-center mx-0 lg:mx-[5px] md:mx-[5px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  {" "}
                  <PiBellBold className="text-[20px] " />
                </div>
                <div className="flex justify-center items-center mx-0 lg:mx-[5px] md:mx-[5px] mr-[10px] lg:mr-[20px] md:lg:mr-[20px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  {" "}
                  <BiUser className="text-[21px] " />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[60px] flex  w-full md:flex lg:flex justify-center items-center"></div>
        </>
      )}

      <div className="flex w-full bg-[#f7f7f7]">
        {/* {sidebar === false ? <></> : <Sidebar />} */}
        {sidebarFlag === false ? (
          <>
            <div
              className="fixed h-[calc(100dvh-60px)] left-0 md:w-[230px] lg:w-[230px] ml-[-50%] md:ml-[-230px] lg:ml-[-230px] flex-shrink-0 flex flex-col items-center p-[0px] md:p-[20px]  bg-transparent lg:p-[20px] pr-0  text-[black] z-50 overflow-hidden"
              style={{ transition: ".3s" }}
            >
              <div className="w-full h-full rounded-none md:rounded-2xl lg:rounded-2xl bg-white border border-[#eeeeee] flex flex-col justify-start items-start p-[20px] drop-shadow-sm">
                <div className="w-full h-full overflow-y-scroll flex flex-col justify-start items-start">
                  <Sidebar />
                </div>
              </div>
            </div>
            <div
              className=" h-[calc(100dvh-60px)] w-[230px] ml-[-230px] flex-shrink-0 flex flex-col items-center pt-[20px] border-none  bg-transparent p-[20px] pr-0  text-[black] z-50"
              style={{ transition: ".3s" }}
            ></div>
            {/* <div
              className="h-[calc(100vh-60px)] w-0 flex-shrink-0 fixed lg:relative md:relative bg-transparent text-[black]"
              style={{ transition: ".3s" }}
            ></div> */}
          </>
        ) : (
          <>
            <div
              className="fixed h-[calc(100dvh-60px)] w-[60%] left-0 md:w-[230px] lg:w-[230px] flex-shrink-0 flex flex-col items-center p-0 md:p-[20px] lg:p-[20px]   bg-transparent  pr-0 md:pr-[0px] lg:pr-[0px]  text-[black] z-50 font-[roboto] font-semibold"
              style={{ transition: ".3s", zIndex: "100" }}
            >
              <div className="w-full h-full rounded-none md:rounded-2xl lg:rounded-2xl bg-white border-[0px] md:border lg:border border-[#eeeeee] flex flex-col justify-start items-start p-[20px] drop-shadow-sm">
                <div className="w-full h-full overflow-y-scroll flex flex-col justify-start items-start">
                  <div className="w-full h-full flex flex-col justify-start items-start">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" h-[calc(100dvh-60px)] w-[230px]  flex-shrink-0 hidden md:flex lg:flex flex-col items-center pt-[20px]  bg-transparent p-[20px] pr-0 border-none  text-[black] z-50"
              style={{ transition: ".3s" }}
            ></div>
            {/* <div
              className="h-[calc(100vh-60px)] w-[230px] flex-shrink-0 fixed lg:relative md:relative bg-[#f7f7f700] text-[black]"
              style={{ transition: ".3s" }}
            ></div> */}
          </>
        )}
        <div className="w-full bg-[#ffffff] md:bg-[#f7f7f7] lg:bg-[#f7f7f7] ">
          {/* <div className="flex w-full overflow-x-scroll">
            {buttonList.map((btnName) => {
              return (
                <Link to={"/category?v=" + btnName}>
                  <Button name={btnName} />
                </Link>
              );
            })}
          </div> */}

          <Outlet />

          {/*  */}
        </div>
        {/* <div className="w-full bg-slate-400 p-[25px] flex flex-wrap justify-center z-0">
          <VideoContainer />
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
