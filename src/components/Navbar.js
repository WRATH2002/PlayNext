import ytlogo from "../assets/img/ytlogo.png";
import { IoMdMic } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
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
import { PiMicrophoneFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
// Sidebar Icons
import { PiBellSimpleFill } from "react-icons/pi";
import { TiVideo } from "react-icons/ti";

const Navbar = () => {
  const [phone, setPhone] = useState(true);
  const sidebarFlag = useSelector((store) => store.app.sidebar);
  const dispatch = useDispatch();
  const [pSearch, setPSearch] = useState(false);

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
    const data = await fetch(SEARCH_API + searchQuery);
    const json = await data.json();
    console.log("search suggestion");
    console.log(json);
    setSearchSuggestion(json[1]);
    // console.log(searSuggestion);
    // setVideos(json.items);
  };

  // dispatch(addItemName({ name, isVeg, price, qty, id }));
  // const [sidebar, SetSidebar] = useState(false);

  // function toggleSidebar() {
  //   SetSidebar(!sidebar);
  // }
  function PhoneSearchToggle() {
    setPhone(false);
  }

  return (
    <>
      {pSearch === true && phone === true ? (
        <>
          <div className="w-full h-[100svh] bg-[#0f0f0f] fixed z-50 p-[10px]">
            <div className="w-full h-[40px] flex justify-center items-center mb-[10px]">
              <div
                className="w-[30px] h-[40px] rounded-full flex justify-center items-center mr-[10px] "
                onClick={() => setPSearch(false)}
              >
                <GoArrowLeft className="text-[25px] text-[white]" />
              </div>
              <input
                className="w-[calc(100%-90px)] h-full px-[20px] outline-none bg-[#222222] rounded-full text-white font-[roboto]"
                placeholder="Search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
              <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center ml-[10px] bg-[#222222]">
                <PiMicrophoneFill className="text-[20px] text-[white]" />
              </div>
            </div>
            <div className="w-full h-auto">
              {searchSuggestion?.length === 0 ? (
                <div className="w-full  mt-[10px] shadow-md rounded-xl bg-[#222222]">
                  {/* {searchSuggestion.map((search, index) => (
                        <Link
                          className="w-full  h-[40px] flex justify-start items-center hover:bg-[#323232d7]"
                          key={index}
                          to={"/search"}
                        >
                          <SearchSuggestionContainer data={search} />
                        </Link>
                      ))} */}
                </div>
              ) : (
                <div className="w-full  mt-[10px] shadow-md rounded-xl py-[10px]">
                  {searchSuggestion?.map((search, index) => (
                    <Link
                      className="w-full  h-[40px] flex justify-start items-center hover:bg-[#323232d7]"
                      key={index}
                      to={"/search?v=" + search}
                      onClick={() => setPSearch(false)}
                    >
                      <div className=" h-[20px] text-white font-[roboto]  w-[100%] flex justify-start items-center bg-transparent">
                        <GoSearch className="mr-[35px] text-[25px]" />
                        <span>{search}</span>
                      </div>
                    </Link>
                  ))}
                </div>
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
            className="h-[60px] w-full flex justify-center items-center fixed  z-2 bg-[#0f0f0f]"
            style={{ zIndex: "2" }}
          >
            <div className="h-[40px] flex justify-start items-center w-[60%]  lg:w-[28%] md:w-[28%] z-2 text-[white]">
              <RxHamburgerMenu
                onClick={() => sidebarHandler()}
                className="text-[24px] mx-[23px] cursor-pointer"
              />
              <img className="h-[22px] cursor-pointer" src={ytlogo}></img>
            </div>
            <div className=" h-[40px] w-[40%] lg:w-[72%] md:w-[72%] flex justify-between items-start ">
              <div className="w-[30%] lg:w-[80%] md:w-[80%] flex justify-end lg:justify-start items-start">
                <div className=" flex-col items-end hidden lg:flex lg:w-[63%]">
                  <input
                    className="w-full px-[20px] outline-none h-[40px] text-[white] rounded-tl-3xl bg-[#0f0f0f] rounded-bl-3xl border-[1.5px] border-[#222222] font-[roboto] font-[400]"
                    placeholder="Search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></input>
                  {searchQuery.length === 0 ? (
                    <></>
                  ) : (
                    <div
                      className="mt-[-40px] cursor-pointer w-[40px] h-[40px] rounded-full hover:bg-[#222222d8] flex justify-center items-center"
                      onClick={() => clearSuggestion()}
                    >
                      <RxCross2 className="text-[20px] text-[white]" />
                    </div>
                  )}

                  {searchSuggestion.length === 0 ? (
                    <div className="w-full  mt-[10px] shadow-md rounded-xl bg-[#222222]">
                      {/* {searchSuggestion.map((search, index) => (
                        <Link
                          className="w-full  h-[40px] flex justify-start items-center hover:bg-[#323232d7]"
                          key={index}
                          to={"/search"}
                        >
                          <SearchSuggestionContainer data={search} />
                        </Link>
                      ))} */}
                    </div>
                  ) : (
                    <div className="w-full  mt-[10px] shadow-md rounded-xl bg-[#222222] py-[10px]">
                      {searchSuggestion.map((search, index) => (
                        <Link
                          className="w-full  h-[40px] flex justify-start items-center hover:bg-[#323232d7]"
                          key={index}
                          to={"/search?v=" + search}
                        >
                          <SearchSuggestionContainer data={search} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <button className="w-[40px] lg:w-[65px]  flex items-center justify-center h-[40px] rounded-full lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none cursor-pointer border-none md:border-[1.5px] lg:border-[1.5px] border-[#bdbdbd] bg-[#222222] border-l-0">
                  <FiSearch
                    className="text-[20px] text-[white]"
                    onClick={() => setPSearch(true)}
                  />
                </button>
                <div
                  className="w-[40px] ml-0 lg:ml-[20px] md:ml-[20px]  hidden lg:flex md:flex items-center justify-center h-[40px] rounded-full cursor-pointer bg-[#222222]
            "
                >
                  <IoMdMic className="text-[20px] text-[white] " />
                </div>
              </div>
              <div className="w-[70%] lg:w-[20%] md:w-[20%]  flex justify-center lg:justify-end md:justify-end  items-center text-white">
                <div className="hidden lg:flex md:flex justify-center items-center mx-[5px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  <TiVideo className="text-[20px] " />
                </div>
                <div className="flex justify-center items-center mx-0 lg:mx-[5px] md:mx-[5px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  {" "}
                  <PiBellSimpleFill className="text-[20px] " />
                </div>
                <div className="flex justify-center items-center mx-0 lg:mx-[5px] md:mx-[5px] mr-[10px] lg:mr-[20px] md:lg:mr-[20px]  w-[40px] h-[40px] rounded-full cursor-pointer ">
                  {" "}
                  <MdPerson className="text-[23px] " />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[60px]  w-full flex justify-center items-center"></div>
        </>
      )}

      <div className="flex w-full">
        {/* {sidebar === false ? <></> : <Sidebar />} */}
        {sidebarFlag === false ? (
          <>
            <div
              className="fixed flex  flex-shrink-0  h-[calc(100vh-60px)]  w-0 bg-[#0f0f0f] text-white"
              style={{ transition: ".3s" }}
            ></div>
            <div
              className="h-[calc(100vh-60px)] w-0 flex-shrink-0 fixed lg:relative md:relative bg-[#0f0f0f] text-white"
              style={{ transition: ".3s" }}
            ></div>
          </>
        ) : (
          <>
            <div
              className="fixed h-[calc(100vh-60px)] z-10 w-[230px]   flex-shrink-0 flex flex-col items-center pt-[10px] overflow-y-scroll bg-[#0f0f0f] text-white"
              style={{ transition: ".3s" }}
            >
              <Sidebar />
            </div>
            <div
              className="h-[calc(100vh-60px)] w-[230px] flex-shrink-0 fixed lg:relative md:relative bg-[#0f0f0f] text-white"
              style={{ transition: ".3s" }}
            ></div>
          </>
        )}
        <div className="w-full bg-[#0f0f0f] ">
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
