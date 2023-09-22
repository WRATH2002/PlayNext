import "./App.css";
import Navbar from "./components/Navbar";
import VideoCard from "./components/VideoCard";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VideoContainer from "./components/VideoContainer";
import WatchVideoPage from "./components/WatchVideoPage";
import Body from "./components/Body";

function App() {
  return (
    <Provider store={store}>
      {/* <span className="font-bold">Hello</span>
      <h1 className="font-bold">Helllo</h1> */}
      {/* <Navbar /> */}
      {/* <Body /> */}
      <RouterProvider router={appRouter} />
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
        path: "watch",
        element: <WatchVideoPage />,
      },
    ],
  },
]);

export default App;
