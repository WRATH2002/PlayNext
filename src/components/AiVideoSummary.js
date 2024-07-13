import React, { useEffect, useRef, useState } from "react";
import { BiSolidMicrophone, BiSolidSend } from "react-icons/bi";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { MdOutlineMic, MdSubtitles } from "react-icons/md";
import { YoutubeTranscript } from "youtube-transcript";
import { TbExchange } from "react-icons/tb";
import { FaClipboard, FaEarthAmericas } from "react-icons/fa6";
import { TiVideo } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { API_KEY, GEM_API_KEY } from "../utils/constants";
import { RiMic2Fill, RiMicFill } from "react-icons/ri";

import { AssemblyAI } from "assemblyai";

const AiVideoSummary = (props) => {
  // const { translate } = require("free-translate");
  // const translate = require("translate-google");
  // const translator = require("open-google-translator");
  // translator.supportedLanguages();
  const [searchParams] = useSearchParams();
  const [TranSec, setTranSec] = useState(false);
  // const defaultVideoId = "dPi52laeuTc";
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [formattedTranscript, setFormattedTranscript] = useState([]);
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
  const [firstChat, setFirstChat] = useState(true);
  const [transcriptHistory, setTranscriptHistory] = useState([
    { id: "sample", transcript: "sample transcript" },
  ]);
  // const
  const scrollToLast = useRef(null);

  const formatTimestamp = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secs = date.getUTCSeconds().toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${minutes}:${secs}`;
    } else {
      return `${minutes}:${secs}`;
    }
  };

  const getTimestamps = (transcript) => {
    return transcript?.map((entry) => {
      const startTime = entry.offset;
      const endTime = entry.offset + entry.duration;
      return {
        text: entry?.text,
        startTime: formatTimestamp(startTime),
        endTime: formatTimestamp(endTime),
      };
    });
  };

  // useEffect(() => {
  //   if (transcript.length != undefined) {
  //     setFormattedTranscript(getTimestamps());
  //   }
  // }, [transcript]);

  // useEffect(() => {
  //   if (transcriptHistory?.some((data) => data.id == props?.videoId)) {
  //     setFirstChat(false);
  //   } else {
  //     setTranscriptHistory((prev) => [
  //       ...prev,
  //       { id: props?.videoId, transcript: " sample " },
  //     ]);
  //     setFirstChat(true);
  //   }
  //   // setFirstChat(true);
  // }, [props?.videoId]);

  useEffect(() => {
    setFirstChat(true);
  }, [props?.videoId]);

  useEffect(() => {
    if (scrollToLast.current) {
      scrollToLast.current.scrollTop = scrollToLast.current.scrollHeight;
    }
  }, [responseObj, searchFlag, loading]);

  const fetchTranscript = async () => {
    setError("");

    try {
      const transcriptData = await YoutubeTranscript.fetchTranscript(
        // "https://www.youtube.com/watch?v=" +
        props?.videoId
        // lang: "hi"
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
    temperature: 0.5,
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
        "Here is the video transcript and treat this as a Video not as a Text : " +
          joinText() +
          "    Here is the prompt : " +
          searchPrompt +
          " please answer in English" +
          // "NOTE : if you are unable to find the answer from the given text just simply reponse this string : 'The Topic you are asking has not been discussed in this video, to know more about this Topic please set your Chat-Mode to Global. **( To change the Mode -> click the 2nd icon in Bottom Left )**' and dont give anything else as a response ."
          // "NOTE : if you are unable to find the answer from the given text just simply reponse this string : 'Not Found - Change Mode'"
          "NOTE : Please keep in mind . First check if answer to my prompt can be given from that video or not . if not possible then answer from your knowledge and outside of the given video . "
        // " also rememeber if before my prompt nothing is provided as a transcript then only response the string '**Unable to fetch transcription from this video! Sorry for the Inconvenience.** If you want to know about some specific topic then change the **Chat Mode** to **Global**'"
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

  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  }

  function formatText(text) {
    // Escape only code blocks and inline code
    text = text.replace(
      /```(.*?)```/gs,
      (match, p1) =>
        `<div style="width: 100%; height: auto; padding: 15px; background-color: gray; whitespace-prewrap ;background-color: #1b1b1b;
    color: white; overflow-x:scroll; border-radius: 16px;"><pre><code>${escapeHtml(
      p1
    )}</code></pre></div>`
    );
    text = text.replace(
      /`([^`]+)`/g,
      (match, p1) => `<code>${escapeHtml(p1)}</code>`
    );

    // Replace **text** with <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace * with • if it's a single asterisk
    text = text.replace(/\*(?!\*|$)/g, "•");

    // Replace ##text with <b>text</b>
    text = text.replace(/##(.*?)(?=\n|$)/g, "<b>$1</b>");

    // Replace URLs with anchor tags
    text = text.replace(
      /(https:\/\/[^\s]+)/g,
      '<a href="$1" class="bold" target="_blank">$1</a>'
    );

    return text;
  }

  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  }

  function formatText(text) {
    // Escape only code blocks and inline code

    text = text.replace(/```(.*?)```/gs, (match, p1) => {
      if (p1.trim() === "") {
        return "";
      }
      const language = p1.trim().split("\n")[0];
      const code = p1.trim().slice(language.length).trim();
      return `
      <div style="width: 100%; height: auto;  whitespace-prewrap ;background-color: #2e2e2e;
    color: white; border-radius: 16px; display:flex ; flex-direction: column ; justify-content:start; align-items:start">
        <div style="width: 100%; height: 40px;  background-color: #000000; 
    color: white ; display:flex  ; justify-content:space-between; align-items:center; padding: 0px 15px ; border-radius: 16px 16px 0px 0px ">
          <span style="color: #acacac">${language}</span>
          <button style="width: auto; height: auto;whitespace-nowrap ;
    color: white; " >copy</button>
        </div>
        <pre style="padding: 15px; width: 100% ;  overflow-x:scroll "><code>${escapeHtml(
          code
        )}</code></pre>
      </div>
    `;
    });

    text = text.replace(
      /`([^`]+)`/g,
      (match, p1) => `<code>${escapeHtml(p1)}</code>`
    );

    // Replace **text** with <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace * with • if it's a single asterisk
    text = text.replace(/\*(?!\*|$)/g, "•");

    // Replace ##text with <b>text</b>
    text = text.replace(/##(.*?)(?=\n|$)/g, "<b>$1</b>");

    // Replace URLs with anchor tags
    text = text.replace(
      /(https:\/\/[^\s]+)/g,
      '<a href="$1" class="bold" target="_blank">$1</a>'
    );

    return text;
  }

  // function copyToClipboard(button) {
  //   const codeElement =
  //     button.parentElement.nextElementSibling.querySelector("code");
  //   const textArea = document.createElement("textarea");
  //   textArea.value = codeElement.innerText;
  //   document.body.appendChild(textArea);
  //   textArea.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(textArea);
  //   button.textContent = "Copied!";
  //   setTimeout(() => {
  //     button.textContent = "Copy";
  //   }, 2000);
  // }

  useEffect(() => {
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const codeElement =
          button.parentElement.nextElementSibling.querySelector("code");
        const textArea = document.createElement("textarea");
        textArea.value = codeElement.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 2000);
      });
    });
  }, []);

  //   useEffect(() => {
  //     let text = "";
  //     if (response.length != 0) {
  //       text = formatText(response);
  //       document.getElementById("content").innerHTML = formatText(text);
  //     }
  //   }, [response]);

  function replaceF(text) {
    const entities = {
      "&#39;": "'",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      // Add other entities as needed
    };

    return text.replace(
      /&#39;|&amp;|&lt;|&gt;|&quot;/g,
      (match) => entities[match]
    );
  }

  // const fetchSummary = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=",
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
    <div
      className={
        "  rounded-2xl  bg-white  drop-shadow-none md:drop-shadow-sm lg:drop-shadow-sm   pt-[10px] font-[roboto] text-[14px] flex-wrap  flex-col flex justify-start items-center" +
        (!props?.chatModal
          ? " h-[calc(100dvh-100px)] pb-[20px] mb-[20px] px-[0px] w-[100%] "
          : " h-[55px] pb-[0px] mb-[10px] px-[10px] w-[170px] ")
      }
      style={{ transition: ".3s" }}
      onClick={() => {
        // props?.setChatModal(!props.chatModal);
      }}
    >
      <div
        className={
          "w-full h-[45px] pb-[10px]  flex justify-between items-center pl-[10px] pr-[20px] " +
          (props?.chatModal ? " border-b border-[#f3f3f3]" : " border-none")
        }
      >
        {/* <div className="w-auto font-[roboto] text-[13px]  font-normal h-full flex  justify-center items-center text-[#313131]">
         
          <RiMic2Fill className="text-[22px] mb-[-2px] mr-[6px]" />
          <span className="flex justify-start text-[20px] font-semibold  items-center">
            Ask
            <span className="font-semibold text-[20px] bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent ml-[5px]">
              Luna
            </span>
          </span>
        </div> */}
        <div
          className={
            "w-[70px] h-full text-[20px]  rounded-3xl justify-center items-center z-50 " +
            (TranSec ? " hidden" : " flex")
          }
        >
          {/* {chatSec ? (
            <>
              <TiVideo className="mr-[] " />
            </>
          ) : (
            <>
              <FaEarthAmericas className=" " />
            </>
          )} */}
        </div>
        <div
          className={
            "w-[calc(100%-140px)] font-[roboto] text-[20px] font-semibold h-full justify-center items-center bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent" +
            (TranSec ? " hidden" : " flex")
          }
        >
          {responseObj.length == 0 ? <></> : <>Luna</>}
        </div>
        <div
          className={
            "w-[calc(100%-70px)] font-[roboto] text-[20px] px-[10px] font-semibold h-full justify-start items-center bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent" +
            (TranSec ? " flex" : " hidden")
          }
        >
          Transcript [Auto-Generated]
        </div>

        <div
          className={
            "w-[35px] h-[35px] flex justify-end items-center text-[18px] cursor-pointer rounded-full hover:text-[black]" +
            (TranSec ? " text-[black]" : " text-[#727272]")
          }
          onClick={() => {
            setTranSec(!TranSec);
          }}
        >
          <MdSubtitles />
        </div>
        <div
          className={
            "w-[35px] h-[35px]  justify-end items-center text-[18px] cursor-pointer rounded-full" +
            (TranSec ? " hidden" : " flex")
          }
          onClick={() => {
            setResponseObj([]);
            setChatHistory([]);
          }}
        >
          <AiFillDelete />
        </div>
      </div>
      <div
        className={
          "w-full  flex justify-center items-end  z-10" +
          (TranSec ? " h-[calc(100%-45px)]" : " h-[calc(100%-110px)]")
        }
      >
        <div
          className="w-full h-full  overflow-y-scroll text-[14px] px-[20px]"
          ref={scrollToLast}
        >
          {/* <div className="w-full"></div> */}
          {TranSec ? (
            <>
              <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll">
                {getTimestamps(transcript)?.map((data, index) => {
                  return (
                    <>
                      <div
                        className="w-full flex justify-start items-start font-normal"
                        key={index}
                      >
                        <div className=" text-[12px] mr-[10px] min-w-[40px] w-auto px-[4px] my-[10px] flex justify-center items-center rounded-md bg-[#dbf0fd] text-[#0075ba] ">
                          {data?.startTime}
                        </div>
                        <div
                          className="flex justify-start items-start text-[13px] pt-[8px]"
                          dangerouslySetInnerHTML={{
                            __html: replaceF(data?.text),
                          }}
                        >
                          {/* {translateText(data?.text)} */}
                          {/* {translator
                            .TranslateLanguageData({
                              listOfWordsToTranslate: "helo",
                              fromLanguage: "en",
                              toLanguage: "hi",
                            })
                            .then((data) => {
                              console.log(data);
                              return data;
                            })} */}
                          {/* {(async () => {
                            const translatedText = await translate(data?.text, {
                              to: "en",
                            });

                            console.log(translatedText);
                            return translatedText; // これはカッコいい！
                          })()} */}
                          {/* {data?.text} */}
                        </div>
                      </div>
                    </>
                  );
                })}
                {getTimestamps(transcript).length == 0 ? (
                  <div className="text-[16px] w-[100%] px-[20px] h-full flex justify-center items-center text-center">
                    Transcript for this Video is not available
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              {responseObj.length != 0 || loading == true ? (
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
                              ></pre>
                            </>
                          )}
                        </span>
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="w-full h-full flex flex-col justify-start items-center  text-[35px] text-black font-[roboto] font-bold">
                  <span className="text-[35px]">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent">
                      Luna
                    </span>
                  </span>
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
            </>
          )}
        </div>
      </div>

      <div
        className={
          "w-full h-[45px] rounded-2xl   justify-between items-center text-[18px]  px-[20px]" +
          (TranSec ? " hidden mt-[0px]" : " flex mt-[20px]")
        }
      >
        <div className="w-[30px] flex justify-start items-center cursor-pointer">
          <BiSolidMicrophone />
        </div>
        <div
          className="w-[30px] flex justify-start items-center cursor-pointer"
          onClick={() => {
            setChatSec(!chatSec);
          }}
        >
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
        <input
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              //   if (firstChat == false) {
              if (searchPrompt.length != 0) {
                setLoading(true);
                setSearchFlag(true);
              }
              //   } else {
              //       if (searchPrompt.length != 0) {
              //     // setSearchFlag(true);
              //         fetchTranscriptCheckTranscript();
              //       }
              //     }
            }
            // console.log(e);
          }}
          placeholder="Enter prompt here ..."
          className="w-[calc(100%-90px)] text-[15px] placeholder:font-[roboto]  px-[14px] bg-[#f7f7f7] rounded-2xl h-full border-none outline-none"
        ></input>
        <div
          className="w-[30px] flex justify-end items-center cursor-pointer"
          onClick={() => {
            // if (firstChat == false) {
            if (searchPrompt.length != 0) {
              setLoading(true);
              setSearchFlag(true);
            }
            // } else {
            //   if (searchPrompt.length != 0) {
            //     // setSearchFlag(true);
            //     fetchTranscriptCheckTranscript();
            //   }
            // }

            // fetchTranscript();

            // console.log("TRANSCRIPTTTTTT");
            // console.log(transcript);
          }}
        >
          <BiSolidSend />
        </div>
      </div>
    </div>
  );
};

export default AiVideoSummary;
