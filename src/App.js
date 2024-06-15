import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Body from "./components/Body";
import store from "./utils/store";
import "./App.css";
import ShimmerList from "./components/Shimmer/ShimmerList";
import Error from "./components/Error";
import WatchPageShimmer from "./components/Shimmer/WatchPageShimmer";
import ShimmerSearchList from "./components/Shimmer/ShimmerSearchList";

const MainContainer = lazy(() => import("./components/MainContainer"));
const WatchPage = lazy(() => import("./components/WatchPage"));
const SearchVideoList = lazy(() => import("./components/SearchVideoList"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<ShimmerList/>}>
          <MainContainer/>
          </Suspense>
        ),
      },
      {
        path: "watch",
        element: (
          <Suspense fallback={ <WatchPageShimmer/>}>
            <WatchPage/>
          </Suspense>
        ),
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<ShimmerSearchList/>}>
            <SearchVideoList/>
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);
function App() {

  return (
   
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
