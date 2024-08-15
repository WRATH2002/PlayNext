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
import { RxCross2 } from "react-icons/rx";
import { IoArrowUp } from "react-icons/io5";
import { Sparkle } from "lucide";

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
  const [responseObjVideo, setResponseObjVideo] = useState([]);
  const [responseObjGlobe, setResponseObjGlobe] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const [chatSec, setChatSec] = useState(true);
  const [firstChat, setFirstChat] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [firstTranscriptFetch, setFirstTranscriptFetch] = useState(true);
  const [transcriptHistory, setTranscriptHistory] = useState([
    { id: "sample", transcript: "sample transcript" },
  ]);

  const [transcriptText, setTranscriptText] = useState("");
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
    setTranscriptText("");
  }, [props?.videoId]);

  useEffect(() => {
    if (scrollToLast.current) {
      scrollToLast.current.scrollTop = scrollToLast.current.scrollHeight;
    }
  }, [responseObjVideo, responseObjGlobe, searchFlag, loading]);

  const fetchTranscript = async () => {
    setError("");

    try {
      const transcriptData = await YoutubeTranscript.fetchTranscript(
        // "https://www.youtube.com/watch?v=" +
        // "https://cors-anywhere.herokuapp.com/https://www.youtube.com/watch?v=" +
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
    if (firstTranscriptFetch) {
      setFirstTranscriptFetch(false);
      fetchTranscript();
    }
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
    setFirstTranscriptFetch(true);
    if (transcript.length > 0) {
      // translateTranscript(joinText());
      console.log("transcript changeeed and useeefect activated");
      console.log(transcript);
    }
  }, [transcript]);

  const translateTranscript = async (textt) => {
    console.log(
      "TRANSLATION API CALLEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
    );
    const url =
      "https://langtranslate-your-ultimate-language-translation-tool.p.rapidapi.com/api/translate";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "3a260fc6eamsh97386d4e8211356p193e18jsna6f28fbc816c",
        "x-rapidapi-host":
          "langtranslate-your-ultimate-language-translation-tool.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isoCode: "en",
        text: textt,
      }),
    };

    // async function translateText() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranscriptText(result?.data);
      console.log("translationnnssssssssssssssssssss ");
      console.log(result?.data);
    } catch (error) {
      setTranscriptText(joinText());
      console.error(error);
    }
    // }
  };

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const apiKey = GEM_API_KEY;
  const genAI = new GoogleGenerativeAI(GEM_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
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
      setResponseObjGlobe([...responseObjGlobe, obj]);
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
        setResponseObjVideo([...responseObjVideo, obj]);
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
    setResponseObjVideo([...responseObjVideo, obj]);
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
  }, [responseObjVideo, responseObjGlobe]);

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
  useEffect(() => {
    console.log("video lenght hegth in ai component ---------------");
    console.log(props?.firstDivHeight);
  });
  return (
    <>
      {alertModal ? (
        <div
          className="w-[420px] fixed top-[10px] right-[20px] h-[50px] rounded-2xl justify-center items-center bg-[black] text-white z-50 hidden md:flex lg:flex"
          style={{ transition: ".4s" }}
        >
          <span
            className=""
            style={{ transition: ".3s", transitionDelay: ".3s" }}
          >
            Please enable CORS Entension for better experience
          </span>
        </div>
      ) : (
        <div
          className="w-[420px] fixed top-[10px] right-[-420px] h-[50px] rounded-2xl justify-center items-center bg-[black]  z-50 hidden md:flex lg:flex"
          style={{ transition: ".4s" }}
        >
          <span
            className=""
            // style={{transition:'.3s', transitionDelay:".3s"}}
          >
            Please enable CORS Entension for better experience
          </span>
        </div>
      )}
      <div
        className={
          " w-full  flex flex-col justify-end md:justify-normal lg:justify-normal   fixed md:static lg:static bottom-0 p-0 " +
          (props?.chatModal
            ? " h-[calc(100dvh-60px)] md:h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] items-start  z-[60]"
            : " h-[65px] md:h-[65px] lg:h-[65px] fixed md:block lg:block items-end pr-[10px] md:items-start lg:items-start  z-[10]")
        }
        // style={{ zIndex: "200" }}
      >
        <div
          className={
            `w-full  md:hidden lg:hidden ` +
            (props?.chatModal ? " flex" : " hidden")
          }
          style={{ minHeight: `${props?.firstDivHeight}px` }}
        ></div>

        <div
          className={
            `  bg-white  drop-shadow-none md:drop-shadow-sm lg:drop-shadow-sm   pt-[10px] font-[roboto] text-[14px] flex-wrap  flex-col flex justify-start items-center  z-20 md:z-0 lg:z-0 cursor-pointer` +
            (props?.chatModal
              ? ` max-h-[calc(100dvh-${props?.firstDivHeight}px)] flex-grow md:min-h-[calc(100dvh-100px)] lg:min-h-[calc(100dvh-100px)] pb-[20px] mb-[0px] md:mb-[20px] lg:mb-[20px] px-[0px] w-[100%] rounded-none md:rounded-2xl lg:rounded-2xl`
              : searchParams?.get("v")?.split("?plid=")?.length == 2
              ? `min-h-[55px] max-h-[55px] flex justify-center items-center bottom-[-20px] mb-[110px] px-[20px] w-auto max-w-[100px] pb-[10px] ml-[10px] md:ml-0 lg:ml-0 rounded-2xl md:rounded-2xl lg:rounded-2xl gradAi text-white`
              : `min-h-[55px] max-h-[55px] flex justify-center items-center bottom-[-20px] mb-[10px] px-[20px] w-auto max-w-[100px] pb-[10px] ml-[10px] md:ml-0 lg:ml-0 rounded-2xl md:rounded-2xl lg:rounded-2xl gradAi text-white`)
          }
          style={{
            transition: ".3s",
            zIndex: "200",
            maxHeight: props.chatModal
              ? `calc(100dvh - ${props?.firstDivHeight}px - 60px)`
              : "55px",
          }}
          onClick={() => {
            if (props?.chatModal) {
            } else {
              if (firstTime) {
                setFirstTime(false);
                setAlertModal(true);
                setTimeout(() => {
                  setAlertModal(false);
                }, 4000);
              }
              props?.setChatModal(true);
            }
          }}
        >
          {props?.chatModal ? (
            <>
              <div
                className={
                  "w-full h-[45px] pb-[10px]  flex justify-between items-center pl-[10px] pr-[20px] " +
                  (props?.chatModal
                    ? " border-b border-[#f3f3f3]"
                    : " border-none")
                }
              >
                <div
                  className={
                    "w-[70px] h-full text-[20px]  rounded-3xl justify-start pl-[10px] items-center z-50 " +
                    (TranSec ? " hidden" : " flex")
                  }
                >
                  <div
                    className=""
                    onClick={() => {
                      props?.setChatModal(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-minimize"
                    >
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                  </div>
                </div>
                <div
                  className={
                    "w-[calc(100%-140px)] font-[roboto] text-[20px] font-semibold h-full justify-center items-center bg-gradient-to-r from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent" +
                    (TranSec ? " hidden" : " flex")
                  }
                >
                  {responseObjVideo.length > 0 && chatSec ? (
                    <>
                      <div className="font-[book]">cosmos</div>
                    </>
                  ) : responseObjGlobe.length > 0 && chatSec == false ? (
                    <>
                      <div className="font-[book]">cosmos</div>
                    </>
                  ) : (
                    <>{/* <div className="font-[test]">Luna</div> */}</>
                  )}
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
                    if (chatSec) {
                      setResponseObjVideo([]);
                    } else {
                      setResponseObjGlobe([]);
                    }
                    setChatHistory([]);
                  }}
                >
                  <AiFillDelete />
                </div>
              </div>
              <div
                className={
                  "w-full  flex justify-center items-end  z-10" +
                  (TranSec
                    ? " h-[calc(100%-45px)]"
                    : chatSec
                    ? " h-[calc(100%-185px)]"
                    : " h-[calc(100%-95px)]")
                }
                style={{ transition: ".3s" }}
              >
                <div
                  className="w-full h-full flex flex-col justify-start items-center  overflow-y-scroll text-[14px] px-[20px]"
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
                      {(responseObjGlobe.length != 0 && chatSec == false) ||
                      (responseObjVideo.length != 0 && chatSec) ||
                      loading == true ? (
                        <>
                          {chatSec ? (
                            <>
                              {responseObjVideo?.map((data, index) => {
                                return (
                                  <>
                                    <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                                      <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#ecf3ff]">
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
                            <>
                              {chatSec ? (
                                <>
                                  {responseObjVideo?.map((data, index) => {
                                    return (
                                      <>
                                        <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                                          <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#ecf3ff]">
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
                                <>
                                  {responseObjGlobe?.map((data, index) => {
                                    return (
                                      <>
                                        <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                                          <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#ecf3ff]">
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
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center  text-[35px] text-black font-[google] font-medium">
                          <span className="text-[35px] flex justify-center items-center">
                            {/* Welcome to{" "} */}
                            {/* <div className="w-[36px] h-[36px] mb-[0px]  md:mb-[-10px]  lg:mb-[-10px]  bg-gradient-to-r from-[#3d72c9] to-[#4285f4] flex flex-wrap mt-[-10px]">
                        <div className="w-[18px] h-[18px] rounded-br-full bg-[white]"></div>
                        <div className="w-[18px] h-[18px] rounded-bl-full bg-[white]"></div>
                        <div className="w-[18px] h-[18px] rounded-tr-full bg-[white]"></div>
                        <div className="w-[18px] h-[18px] rounded-tl-full bg-[white]"></div>
                      </div>
                      <svg
                        className="ml-[-12px] mt-[-32px] md:mt-[-22px] lg:mt-[-22px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="#4285f4"
                        stroke="#4285f4"
                        stroke-width=".7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-sparkle"
                      >
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                      </svg> */}
                            <div className="mt-[0px] md:mt-[0px] lg:mt-[0px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="#4a83ef"
                                stroke="#4a83ef"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-sparkles"
                              >
                                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                                <path d="M20 3v4" />
                                <path d="M22 5h-4" />
                                <path d="M4 17v2" />
                                <path d="M5 18H3" />
                              </svg>
                            </div>
                            <span className="bg-gradient-to-r ml-[6px] font-[book] font-semibold from-[#4a83ef] to-[#d96570] bg-clip-text text-transparent">
                              cosmos
                            </span>
                          </span>
                          <span className="text-[24px] font-semibold text-[#333333] font-[sign]">
                            Ai Chat Assistance
                          </span>
                        </div>
                      )}

                      {loading ? (
                        <>
                          <span className="w-full h-auto  flex justify-end items-center  mt-[15px]">
                            <span className="max-w-[80%] w-auto h-auto flex-wrap p-[10px] px-[20px] rounded-2xl rounded-tr-[4px] bg-[#ecf3ff]">
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
              {chatSec ? (
                <div
                  className={
                    "w-[calc(100%-40px)] h-[110px] mb-[-40px]  rounded-t-2xl bg-[#f0f4f9] text-[black] justify-start items-start" +
                    (TranSec ? " hidden " : " flex")
                  }
                  style={{ transition: ".3s" }}
                >
                  <div
                    className="w-full h-[100px] flex justify-start items-start p-[10px] opacity-100 z-0"
                    style={{ transition: ".3s", transitionDelay: ".4s" }}
                  >
                    <div
                      className={
                        "h-full w-[124.5px] rounded-xl " +
                        (chatSec ? " hidden md:flex lg:flex" : " flex")
                      }
                    >
                      <img
                        className="w-full player object-cover rounded-2xl"
                        src={
                          "https://img.youtube.com/vi/" +
                          props?.videoId +
                          "/hqdefault.jpg"
                        }
                      ></img>
                    </div>
                    <div
                      className={
                        "w-[calc(100%-174.5px)] h-full flex flex-col justify-start items-start ml-[10px] text-[black]" +
                        (chatSec ? " hidden md:flex lg:flex" : " flex")
                      }
                    >
                      <span className="w-full leading-5 overflow-hidden text-ellipsis line-clamp-2 text-[14px] font-semibold">
                        {props?.videoName}
                      </span>
                      <span className="w-full overflow-hidden mt-[5px] text-ellipsis line-clamp-1 text-[12px] font-normal">
                        {props?.channelName}
                      </span>
                    </div>
                    <div
                      className={
                        "w-[calc(100%-50px)] h-full flex flex-col justify-start items-start ml-[10px] text-[black]" +
                        (chatSec ? " flex md:hidden lg:hidden" : " hidden")
                      }
                    >
                      <span className="w-full leading-5  text-[14px] font-semibold">
                        Due to CORS Error, this feature can only be used in
                        Laptops by enabling CORS Extension. You can only use the
                        Global Mode. Click 2nd left icon to switch to Global
                        Mode.
                      </span>
                    </div>
                    <div
                      className="w-[30px] h-[30px] cursor-pointer rounded-full hover:bg-[#e6e6e6] bg-[white] border border-[#e8f3ff] text-[black] flex justify-center items-center ml-[10px] "
                      onClick={() => {
                        setChatSec(!chatSec);
                      }}
                    >
                      <RxCross2 className="text-[16px]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    "w-[calc(100%-40px)] h-[40px] overflow-hidden mb-[-60px] rounded-t-2xl bg-[#f0f4f9] z-0" +
                    (TranSec ? " hidden " : " flex")
                  }
                  style={{ transition: ".3s" }}
                >
                  <div className="w-full h-[100px] flex justify-start items-start p-[10px] opacity-0 z-0"></div>
                </div>
              )}

              <div
                className={
                  "w-[calc(100%-40px)] h-[50px] rounded-2xl bg-[#f0f4f9]  justify-between items-center text-[18px]  pl-[10px] px-[10px] z-10 " +
                  (TranSec ? " hidden mt-[0px]" : " flex mt-[20px]")
                }
              >
                <div className="w-[30px] h-[35px] rounded-l-full  flex justify-center items-center cursor-pointer">
                  <BiSolidMicrophone />
                </div>
                <div
                  className="w-[30px] h-[35px]   flex justify-center items-center cursor-pointer"
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
                      if (searchPrompt.length != 0) {
                        setLoading(true);
                        setSearchFlag(true);
                      }
                    }
                  }}
                  placeholder="Enter prompt here ..."
                  className="w-[calc(100%-100px)]  rounded-l-[0px] bg-transparent text-[15px] placeholder:font-[roboto]  px-[14px]  rounded-2xl h-[35px]  outline-none"
                ></input>
                {/* <div
            className={
              "w-[calc(100%-100px)]  rounded-l-[0px] bg-transparent text-[15px] font-[roboto]  px-[14px]  rounded-2xl h-[35px] justify-start items-center" +
              (chatSec ? " flex md:hidden lg:hidden" : " hidden")
            }
          >
            This feature not available
          </div> */}
                {/* <div
            className="w-[calc(100%-100px)]  rounded-l-[0px] bg-transparent text-[15px]  px-[14px]  rounded-2xl h-[35px] flex justify-start items-start"
          ></div> */}
                <div
                  className={
                    "w-[30px] h-[30px] rounded-full ml-[10px] bg-[#121212] text-white  justify-center items-center cursor-pointer" +
                    (chatSec ? " hidden md:flex lg:flex" : " flex")
                  }
                  onClick={() => {
                    if (searchPrompt.length != 0) {
                      setLoading(true);
                      setSearchFlag(true);
                    }
                    // console.log(transcriptText);
                    // translateTranscript(joinText());
                    console.log(joinText());
                  }}
                >
                  <IoArrowUp />
                </div>
                <div
                  className={
                    "w-[30px] h-[30px] rounded-full ml-[10px] bg-[#12121257] text-white flex justify-center items-center " +
                    (chatSec ? " flex md:hidden lg:hidden" : " hidden")
                  }
                >
                  <IoArrowUp />
                </div>
              </div>
            </>
          ) : (
            <div className="h-[55px] flex justify-center items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-bot"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>{" "}
              <span className="text-[17px] ml-[10px]">Ask</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AiVideoSummary;
