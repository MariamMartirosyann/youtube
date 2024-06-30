import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";




const useVideoAPI = () => {
  const error = useSelector((store) => store.app.isError);
  const [key, setKey] = useState(process.env.REACT_APP_API_KEY4);

  const changeKey = () => {
    if (error) {
      setKey( process.env.REACT_APP_API_KEY5);
      
    }
  };

  useEffect(() => {changeKey()}, [key, error]);
  return key;
};

export default useVideoAPI;
