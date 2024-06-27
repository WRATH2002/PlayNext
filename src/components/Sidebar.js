import { AiFillHome, AiOutlineLike } from "react-icons/ai";
import {
  MdOutlineSportsBaseball,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoDownload, GoHistory } from "react-icons/go";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { RiHome3Line, RiVideoLine } from "react-icons/ri";
import { PiDownloadSimple, PiMonitorPlayLight } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import { IoTrendingUpOutline, IoVideocamOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgLivePhoto } from "react-icons/cg";
import { SiYoutubegaming } from "react-icons/si";
import { MdSportsVolleyball } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiAirplay } from "react-icons/fi";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden  px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <Link to={"/"} className="flex justify-start items-center ">
          <RiHome3Line className="text-[20px]" />
          <span className="ml-[15px]  font-[roboto] text-[15px] ">Home</span>
        </Link>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <MdOutlineSlowMotionVideo className="text-[20px]" />

        <span className="ml-[15px]  font-[roboto] text-[15px] ">Shorts</span>
      </div>
      {/* <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <MdOutlineSubscriptions className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">
          Subscriptions
        </span>
      </div> */}
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <IoVideocamOutline className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">
          Your Videos
        </span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden mt-[17px]  px-[10px]  h-[20px] cursor-pointer ">
        <span className="ml-[0px]  font-[roboto mb-[-1px] text-[15px] font-semibold">
          PlayLists
        </span>
      </div>

      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   h-[20px] rounded-xl cursor-pointer min-h-[20px]">
        <div className="border-[1px] border-[#f2f2f2] w-full"></div>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <GoHistory className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">History</span>
      </div>
      {/*  */}

      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <GoDownload className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Downloads</span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <FiAirplay className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Library</span>
      </div>

      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <AiOutlineLike className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">
          Liked Videos
        </span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden mt-[17px]  px-[10px]  h-[20px] cursor-pointer ">
        <span className="ml-[0px]  font-[roboto mb-[-1px] text-[15px] font-semibold">
          Trendings
        </span>
      </div>

      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   h-[20px] rounded-xl cursor-pointer min-h-[20px]">
        <div className="border-[1px] border-[#f2f2f2] w-full"></div>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <IoTrendingUpOutline className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Trending</span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <LiaShoppingBagSolid className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Shopping</span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <IoMusicalNoteOutline className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Music</span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <PiFilmSlateLight className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Films</span>
      </div>
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <CgLivePhoto className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Live</span>
      </div>
      {/* <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <SiYoutubegaming className="text-[20px]" />
        <span className="ml-[15px]  font-[roboto] text-[15px] ">Gaming</span>
      </div> */}
      <div className="flex flex-row justify-start items-center w-[100%] whitespeace-nowrap overflow-hidden   px-[10px]  h-[40px] rounded-xl hover:bg-[#f3f3f3] cursor-pointer min-h-[40px]">
        <MdOutlineSportsBaseball className="text-[20px]" />
        <span className="ml-[15px] text-[14px] ">Sport</span>
      </div>
    </>
  );
};

export default Sidebar;
