const RelatedVideos = () => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row md:flex-row ">
        <img
          src="https://i.ytimg.com/vi/Tq1s45_ZvRE/mqdefault.jpg"
          className="w-full md:w-[175px] lg:w-[175px] rounded-lg"
        ></img>
        <div className=" w-full md:w-[calc(100%-175px)]  lg:w-[calc(100%-175px)] h-full pl-[10px] flex flex-col">
          <span className=" w-full min-h-[24px] max-h-[47px] text-15px mb-[7px] flex items-start justify-start overflow-hidden ">
            Match Highlights | Kerala Blasters FC 2-1 Bengaluru FC | MW 1 | ISL
            2023-24
          </span>
          <span className=" w-full h-[20px] text-[13px]">Sony Live</span>
          <span className=" w-full h-[20px] text-[13px]">3.5K views</span>
        </div>
      </div>
    </>
  );
};

export default RelatedVideos;
