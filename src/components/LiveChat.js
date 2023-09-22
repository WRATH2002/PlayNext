import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { generateName } from "../utils/constants";
import { generateMessage } from "../utils/constants";

const Message = ({ name, message }) => {
  return (
    <>
      <div className="flex justify-start items-center">
        <AiOutlineLogout className="text-[20px]" />
        <span className="text-[15px] ml-[15px]">{name}</span>
        <span className="text-[14px] ml-[15px]">{message}</span>
      </div>
    </>
  );
};

const LiveChat = () => {
  const dispatch = useDispatch();
  //   const [liveChat, setLiveChat] = useState([]);
  const liveChat = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      console.log(liveChat);
      console.log("API Pooling");
      dispatch(
        addMessage({
          name: generateName(),
          message: generateMessage(25),
        })
      );
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div>
        {liveChat.map((chat, index) => (
          <Message key={index} name={chat.name} message={chat.message} />
        ))}
      </div>
    </>
  );
};

export default LiveChat;
