
import { useDispatch } from "react-redux";
import { useRouteError } from "react-router-dom";
import { setError } from "../utils/appSlice";

const Error = () => {
  const err = useRouteError();
  const dispatch = useDispatch();
;
  if(err) dispatch(setError(err.status))
  console.log(err,"my error");
  return (
    <div className="m-5 p-5">
      <h1>Oops!!!</h1>
      <h2> Something went wrong!!</h2>
      <h3>
        {err.status}: {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
