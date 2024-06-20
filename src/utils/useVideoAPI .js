import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const GOOGLE_API_KEY1 = "AIzaSyDmPMnpn3pccWz7xlF5UaOk6itv8JKfLB4";
export const GOOGLE_API_KEY2 = "AIzaSyB_hZpvetMN46neTQMwUh7k71A9wvmYnC0";
export const GOOGLE_API_KEY3 = "AIzaSyD3ukNmSSDAINJYtvD90MP_sXyc0F0_2io";



const useVideoAPI = () => {
  const error = useSelector((store) => store.app.isError);
  const [key, setKey] = useState("AIzaSyCQJQfcp8WMgDGCqV2ZfKuVi1-d-ZwsxDI");

  const changeKey = () => {
    if (error) {
      setKey("AIzaSyAZQ4HWk5ZnNFhq_ipM6P-dheoujZ40tZk");
      
    }
  };

  useEffect(() => {changeKey()}, [key, error]);
  //console.log(key, "GOOGLE_API_KEY");
  return key;
};

export default useVideoAPI;
