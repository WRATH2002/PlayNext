import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="flex justify-start items-start my-[20px]  px-[10px] lg:px-0 md:px-0 ">
        <img
          className="h-9 w-9 rounded-full"
          src={
            comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
          }
        ></img>
        <div className="flex flex-col w-full  ml-[25px] text-[13px] lg:text-[15px] md:text-[15px]">
          <span className="flex items-center justify-start font-semibold h-[20px] ">
            @{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          </span>
          <span className="leading-[18px] ">
            {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
          </span>
          <div className="flex justify-start items-center my-[7px]">
            <BiSolidDislike className="text-[16px] lg:text-[19px] md:text-[19px]" />
            <span className="flex justify-start items-center ml-[2px] mr-[10px]">
              {comment?.snippet?.topLevelComment?.snippet?.likeCount}
            </span>
            <BiSolidLike className="text-[16px] lg:text-[19px] md:text-[19px]" />
            <button className="ml-[17px] hover:bg-[#f1f1f1] px-[13px] text-[12px] lg:text-[15px] md:text-[15px] flex justify-center items-center rounded-full h-[32px]">
              Reply
            </button>
          </div>

          {/* <span></span> */}
          <span className="text-[#005fff] font-semibold">
            {comment?.snippet?.totalReplyCount} Replies
          </span>
        </div>
      </div>
    </>
  );
};

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </>
  );
};

export default Comments;
