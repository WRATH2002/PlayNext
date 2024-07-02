import "./App.css";
import Navbar from "./components/Navbar";
import VideoCard from "./components/VideoCard";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VideoContainer from "./components/VideoContainer";
import WatchVideoPage from "./components/WatchVideoPage";
import Body from "./components/Body";
import SearchVideo from "./components/SearchVideo";
import AccountPage from "./components/AccountPage";

function App() {
  return (
    <Provider store={store}>
      {/* <span className="font-bold">Hello</span>
      <h1 className="font-bold">Helllo</h1> */}
      {/* <Navbar /> */}
      {/* <Body /> */}
      {/* <div className="w-full h-[100vsh] flex justify-start items-center bg-white"> */}
      <RouterProvider router={appRouter} />
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
