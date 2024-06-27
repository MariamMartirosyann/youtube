import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useAPI = () => {
  const error = useSelector((store) => store.app.isError);
  const [key, setKey] = useState(process.env.REACT_APP_API_KEY3);

  const changeKey = () => {
    if (error) {
      setKey(process.env.REACT_APP_API_KEY2);
    }
  };

  useEffect(() => {
    changeKey();
  }, [key, error]);
  //console.log(key, "GOOGLE_API_KEY");
  return key;
};

export default useAPI;
