import "./App.css";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VideoContainer from "./components/VideoContainer";
import WatchVideoPage from "./components/WatchVideoPage";
import Body from "./components/Body";
import SearchVideo from "./components/SearchVideo";
import AccountPage from "./components/AccountPage";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { VIDEO_API } from "./utils/constants";

function App() {
  const [APILimitEnd, setAPILimitEnd] = useState(false);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (videos.length == 0) {
      getVideos();
    }
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(VIDEO_API);
      const json = await data.json();
      console.log("Home Screen Video API is called ... under 'VideoContainer'");
      setVideos(json.items);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Assuming 403 status code indicates the API limit has been reached
        setAPILimitEnd(true);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <Provider store={store}>
      {/* <span className="font-bold">Hello</span>
      <h1 className="font-bold">Helllo</h1> */}
      {/* <Navbar /> */}
      {/* <Body /> */}
      {/* <div className="w-full h-[100vsh] flex justify-start items-center bg-white"> */}
      <ErrorBoundary>
        {APILimitEnd ? (
          <>
            <ErrorPage />
          </>
        ) : (
          <RouterProvider router={appRouter} />
        )}
      </ErrorBoundary>
      {/* </div> */}
      {/* <Outlet /> */}
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <VideoContainer />,
      },
      {
        path: "channel",
        // element: <WatchVideoPage />,
        element: <AccountPage />,
      },
      {
        path: "watch",
        element: <WatchVideoPage />,
        // element: <AccountPage />,
      },
      {
        path: "search",
        element: <SearchVideo />,
      },
    ],
  },
]);

export default App;
