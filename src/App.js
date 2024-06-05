import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./components/Body";
import store from "./utils/store";
import "./App.css";
import ShimmerList from "./components/ShimmerList";

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
            <MainContainer />
          </Suspense>
        ),
      },
      {
        path: "watch",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <SearchVideoList />
          </Suspense>
        ),
      },
    ],
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
