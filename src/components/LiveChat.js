import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");

  const chatMessages = useSelector((store) => store.chat.messages);
  console.log("chatMessages", chatMessages);

  useEffect(() => {
    const i = setInterval(() => {
      console.log("API Polling");
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(25) + "🍊",
        })
      );
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="border border-black ml-6 p-2 w-full h-[450px] bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {chatMessages?.map((c, index) => (
          <ChatMessage key={index} name={c.name} message={c.message} />
        ))}
      </div>
      <form
        className="w-[450px] p-2 ml-6 border border-black flex "
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Mariam",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="w-3/4 border px-1 border-slate-200"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          type="text"
        />
        <button className=" w-1/4 px-2 ml-4 bg-green-100">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
//"Hay, Hayasatan, Hayreniq u Astvac 🙏🏻"
