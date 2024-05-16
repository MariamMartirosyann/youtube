import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./components/Body";
import store from "./utils/store";
import "./App.css";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchVideoList from "./components/SearchVideoList";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path:"results", element:<SearchVideoList/>}
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <Head /> */}
        <RouterProvider router={appRouter} />
        
      </div>
    </Provider>
  );
}

export default App;
