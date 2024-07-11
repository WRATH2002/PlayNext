import React, { useEffect, useRef, useState } from "react";
import { BiSolidMicrophone, BiSolidSend } from "react-icons/bi";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { MdOutlineMic } from "react-icons/md";
import { YoutubeTranscript } from "youtube-transcript";
import { TbExchange } from "react-icons/tb";
import { FaEarthAmericas } from "react-icons/fa6";
import { TiVideo } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { GEM_API_KEY } from "../utils/constants";

const AiVideoSummary = (props) => {
  const [searchParams] = useSearchParams();
  // const defaultVideoId = "dPi52laeuTc";
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [error, setError] = useState("");
  const [searchPrompt, setSearchPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseObj, setResponseObj] = useState([
    // { user: "hello", res: "hello there" },
  ]);
  const [chatHistory, setChatHistory] = useState([]);

  const [chatSec, setChatSec] = useState(true);
  // const
  const scrollToLast = useRef(null);

  useEffect(() => {
    if (scrollToLast.current) {
      scrollToLast.current.scrollTop = scrollToLast.current.scrollHeight;
    }
  }, [responseObj, searchFlag, loading]);

  // const { createProxyMiddleware } = require("http-proxy-middleware");

  // module.exports = function (app) {
  //   app.use(
  //     "/api",
  //     createProxyMiddleware({
  //       target: "https://youtube-transcript-api-url.com",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "", // Remove '/api' from the proxy request path
  //       },
  //     })
  //   );
  // };

  const fetchTranscript = async () => {
    setError("");

    try {
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      // const apiUrl = `https://cors-anywhere.herokuapp.com/https://www.youtube.com/watch?v=${props?.videoId}`;
      // const apiUrl = `https://youtube-transcript-api-url/${props?.videoId}`;
      const transcriptData = await YoutubeTranscript.fetchTranscript(
        props?.videoId
        // apiUrl
      );
      setTranscript(transcriptData);

      console.log(
        "TRANSCRITPTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
      );
      console.log(transcriptData);
    } catch (err) {
      setError(
        "Failed to fetch transcript. Make sure the video ID is correct and the video has transcripts available."
      );
    } finally {
      // setLoading(false);
    }

    // setError("");

    // try {
    //   const apiUrl = `/api/fetch-transcript`;
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ videoId: props?.videoId }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const transcriptData = await response.json();
    //   setTranscript(transcriptData);

    //   console.log("TRANSCRIPT FETCHED");
    //   console.log(transcriptData);
    // } catch (err) {
    //   setError(
    //     "Failed to fetch transcript. Make sure the video ID is correct and the video has transcripts available."
    //   );
    // } finally {
    //   // setLoading(false);
    // }
  };

  useEffect(() => {
    fetchTranscript();
  }, [props?.videoId]);
  useEffect(() => {
    if (searchFlag == true && searchPrompt.length != 0) {
      setLoading(true);
      run();
    } else {
      setSearchFlag(false);
    }
  }, [searchFlag]);

  useEffect(() => {
    setLoading(false);
  }, [transcript]);

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const apiKey = GEM_API_KEY;
  const genAI = new GoogleGenerativeAI(GEM_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  function joinText() {
    return transcript.map((item) => item.text).join(" ");
  }

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: chatHistory,
    });

    if (!chatSec) {
      const result = await chatSession.sendMessage(
        searchPrompt + " please answer in English"
      );
      console.log(result.response.text());
      setResponse(result.response.text());
      let obj = { user: searchPrompt, res: result.response.text() };
      console.log(obj);
      setResponseObj([...responseObj, obj]);
      setChatHistory([
        ...chatHistory,
        { role: "user", parts: [{ text: searchPrompt }] },
        { role: "model", parts: [{ text: result.response.text() }] },
      ]);
      setSearchFlag(false);
      setSearchPrompt("");
    } else {
      const result = await chatSession.sendMessage(
        joinText() +
          "    " +
          searchPrompt +
          " please answer in English" +
          // "NOTE : if you are unable to find the answer from the given text just simply reponse this string : 'The Topic you are asking has not been discussed in this video, to know more about this Topic please set your Chat-Mode to Global. **( To change the Mode -> click the 2nd icon in Bottom Left )**' and dont give anything else as a response ."
          "NOTE : if you are unable to find the answer from the given text just simply reponse this string : 'Not Found - Change Mode'"
        // "   if you are unable to get the answer from the given text then just simply tell me to 'Switch the chat to Gloabl from 2nd Bottom Left icon' "
      );
      console.log(result.response.text().toLowerCase());
      if (
        result.response.text().toLowerCase().includes("not found - change mode")
      ) {
        console.log("Trueeeeeeeeee");
        GlobalResponseCall();
      } else {
        console.log("Falseeeeeeeee");

        setResponse(result.response.text());
        let obj = { user: searchPrompt, res: result.response.text() };
        console.log(obj);
        setResponseObj([...responseObj, obj]);
        setChatHistory([
          ...chatHistory,
          { role: "user", parts: [{ text: searchPrompt }] },
          { role: "model", parts: [{ text: result.response.text() }] },
        ]);
        setSearchFlag(false);
        setSearchPrompt("");
      }
    }
  }

  async function GlobalResponseCall() {
    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });

    const resultt = await chatSession.sendMessage(
      searchPrompt + " please answer in English"
    );
    console.log(resultt.response.text());
    // if (result.response.text().toLowerCase() == "Not Found - Change Mode") {
    //   GlobalResponseCall();
    // } else {
    setResponse(resultt.response.text());
    let obj = {
      user: searchPrompt,
      res:
        "The topic you've asked about hasn't been covered in this video. Instead, here's an answer that I hope will address your query.    <br/><br/>" +
        resultt.response.text() +
        "<br/><br/>For a deeper understanding of this topic, please switch the **Chat Mode** to **Global** by clicking the second icon from the bottom left and **Ask your Query**.",
    };
    console.log(obj);
    setResponseObj([...responseObj, obj]);
    setChatHistory([
      ...chatHistory,
      { role: "user", parts: [{ text: searchPrompt }] },
      { role: "model", parts: [{ text: resultt.response.text() }] },
    ]);
    setSearchFlag(false);
    setSearchPrompt("");
    // }
  }

  // useEffect(() => {
  //   if (responseObj.length != 0) {
  //     setChatHistory([
  //       ...chatHistory,
  //       // {
  //       //   role: "user",
  //       //   parts: [{ text: searchPrompt }],
  //       // },
  //       {
  //         role: "model",
  //         parts: [{ text: responseObj[responseObj.length - 1].res }],
  //       },
  //     ]);

  //     setSearchPrompt("");
  //   }
  // }, [responseObj]);

  useEffect(() => {
    console.log(chatHistory);
    setChatHistory(
      chatHistory.filter((data, index) => {
        if (index < chatHistory.length - 2) {
          return data;
        }
      })
    );
    setLoading(false);
  }, [responseObj]);

  function formatText(text) {
    // Replace ##text with <span class="bold">text</span>

    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace * with • if it's a single asterisk
    text = text.replace(/\*(?!\*|$)/g, "•");

    // Replace ##text with <b>text</b>
    text = text.replace(/##(.*?)(?=\n|$)/g, "<b>$1</b>");

    text = text.replace(
      /(https:\/\/[^\s]+)/g,
      '<a href="$1" class="bold" target="_blank">$1</a>'
    );
    return text;
  }

  //   useEffect(() => {
  //     let text = "";
  //     if (response.length != 0) {
  //       text = formatText(response);
  //       document.getElementById("content").innerHTML = formatText(text);
  //     }
  //   }, [response]);

  // const fetchSummary = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4RJ5W16CnLostbXLAR6Dut71OTZdfO-4",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Add any required headers, such as API keys or authentication tokens
  //         },
  //         body: JSON.stringify({
  //           prompt:
  //             "https://www.youtube.com/watch?v=" +
  //             props?.videoId +
  //             "    plaese from this video make me a bulleted points summary of the above video",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch summary");
  //     }

  //     const data = await response.json();
  //     console.log("data.summaryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //     console.log(data.summary);
  //     //   setSummary(data.summary);
  //   } catch (error) {
  //     console.error("Error fetching summary:", error);
  //     // Handle errors gracefully (e.g., show error message)
  //   }
  // };
  return (
    <div className="w-full h-[calc(100dvh-100px)] mb-[20px] rounded-2xl bg-white border border-[#e5e7eb] drop-shadow-none md:drop-shadow-sm lg:drop-shadow-sm p-[20px] px-[0px] pt-[10px] font-[roboto] text-[14px] flex-wrap  flex-col flex justify-end items-center">
      <div className="w-full h-[45px] pb-[10px] z-50 flex justify-between items-center pl-[10px] pr-[20px] border-b border-[#f3f3f3]">
        <div className="w-[35px] h-full bg-gradient-to-r from-[#4a83ef75] to-[#d9657075] rounded-3xl flex justify-center items-center z-50 ">
          {chatSec ? (
            <>
              <TiVideo className="mr-[] " />
            </>
          ) : (
            <>
              <FaEarthAmericas className=" " />
            </>
          )}
        </div>
        <div className="w-auto font-[roboto] text-[20px] font-semibold h-full flex justify-center items-center bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent">
          {responseObj.length == 0 ? <></> : <>Luna</>}
        </div>
        <div
          className="w-[35px] h-[35px] flex justify-end items-center text-[18px] cursor-pointer rounded-full"
          onClick={() => {
            setResponseObj([]);
            setChatHistory([]);
          }}
        >
          <AiFillDelete />
        </div>
      </div>
      <div className="w-full h-[calc(100%-110px)] flex justify-center items-end  z-10">
        <div
          className="w-full h-full  overflow-y-scroll text-[14px] px-[20px]"
          ref={scrollToLast}
        >
          {responseObj.length != 0 ? (
            <>
              {responseObj?.map((data, index) => {
                return (
                  <>
                    <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                      <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#f4f4f4]">
                        {data.user}
                      </span>
                    </span>
                    <span className="w-full h-auto  flex justify-start items-start mt-[8px]">
                      <div className="w-[30px] h-[30px] bg-gradient-to-r from-[#4a83ef] to-[#d96570] flex flex-wrap mt-[6px]">
                        <div className="w-[15px] h-[15px] rounded-br-full bg-[white]"></div>
                        <div className="w-[15px] h-[15px] rounded-bl-full bg-[white]"></div>
                        <div className="w-[15px] h-[15px] rounded-tr-full bg-[white]"></div>
                        <div className="w-[15px] h-[15px] rounded-tl-full bg-[white]"></div>
                      </div>
                      {/* {loading ? (
                      <>
                        <div className="lds-facebook mt-[50px] ml-[5px]">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </>
                    ) : (
                      <> */}
                      {data?.res.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          <pre
                            className="max-w-[calc(100%-40px)] w-auto h-auto  p-[10px] px-[20px] pl-[10px] rounded-2xl rounded-tl-[4px] whitespace-pre-wrap break-words font-[roboto]"
                            //   id="content"
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: formatText(data?.res),
                            }}
                          >
                            {/* {data?.res} */}
                          </pre>
                        </>
                      )}
                      {/* </>
                    )} */}
                    </span>
                  </>
                );
              })}
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center  text-[35px] text-black font-[roboto] font-bold">
              <span className="text-[35px]">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent">
                  Luna
                </span>
              </span>
              {/* <span className="text-[20px]">An AI</span> */}
              <span className="text-[20px] font-normal">
                AI Chat Assistance
              </span>
            </div>
          )}
          {loading ? (
            <>
              <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#f4f4f4]">
                  {searchPrompt}
                </span>
              </span>
              <span className="w-full h-auto  flex justify-start items-start mt-[8px]">
                <div className="w-[30px] h-[30px] bg-gradient-to-r from-[#4a83ef] to-[#d96570] flex flex-wrap mt-[6px]">
                  <div className="w-[15px] h-[15px] rounded-br-full bg-[white]"></div>
                  <div className="w-[15px] h-[15px] rounded-bl-full bg-[white]"></div>
                  <div className="w-[15px] h-[15px] rounded-tr-full bg-[white]"></div>
                  <div className="w-[15px] h-[15px] rounded-tl-full bg-[white]"></div>
                </div>

                <div className="lds-facebook mt-[50px] ml-[11px]">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </span>
            </>
          ) : (
            <></>
          )}
          <div className="w-full"></div>
        </div>
      </div>

      <div className="w-full h-[45px] rounded-2xl  flex justify-between items-center text-[18px] mt-[20px] px-[20px]">
        <div className="w-[30px] flex justify-start items-center cursor-pointer">
          <BiSolidMicrophone />
          {/* <TbExchange /> */}
        </div>
        <div
          className="w-[30px] flex justify-start items-center cursor-pointer"
          onClick={() => {
            setChatSec(!chatSec);
          }}
        >
          {/* <BiSolidMicrophone /> */}
          <TbExchange />
        </div>
        <input
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setSearchFlag(true);
            }
            // console.log(e);
          }}
          placeholder="Enter prompt here ..."
          className="w-[calc(100%-90px)] text-[15px] placeholder:font-[roboto]  px-[14px] bg-[#f7f7f7] rounded-2xl h-full border-none outline-none"
        ></input>
        {/* <PiArrowBendUpRightBold /> */}
        <div
          className="w-[30px] flex justify-end items-center cursor-pointer"
          onClick={() => {
            if (searchPrompt.length != 0) {
              setSearchFlag(true);
            }
            console.log("TRANSCRIPTTTTTT");
            console.log(transcript);
          }}
        >
          <BiSolidSend />
        </div>
      </div>
    </div>
  );
};

export default AiVideoSummary;
