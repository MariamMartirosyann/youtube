import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const GOOGLE_API_KEY1 = "AIzaSyDmPMnpn3pccWz7xlF5UaOk6itv8JKfLB4";
export const GOOGLE_API_KEY2 = "AIzaSyB_hZpvetMN46neTQMwUh7k71A9wvmYnC0";
export const GOOGLE_API_KEY3 = "AIzaSyD3ukNmSSDAINJYtvD90MP_sXyc0F0_2io";
// export const GOOGLE_API_KEY4 = "AIzaSyCQJQfcp8WMgDGCqV2ZfKuVi1-d-ZwsxDI";
// export const GOOGLE_API_KEY5 = "AIzaSyAZQ4HWk5ZnNFhq_ipM6P-dheoujZ40tZk";
// export const GOOGLE_API_KEY6 = "AIzaSyDvoI2jjKY8cUO6TWlqsxwbspc2xIKzghM";
// export const GOOGLE_API_KEY7 = "AIzaSyBifGhBLBWTJdZgxeySMJgF_Ubxvgc9c4g";
// export const GOOGLE_API_KEY8 = "AIzaSyCUZTFI5oitR97SyGG34ZYxhqjFSWE_5Sg";
// export const GOOGLE_API_KEY9 = "AIzaSyDO7H-DnWU4H0dCHQR4YRrdh5BxHP_PVuM";
// export const GOOGLE_API_KEY10 = "AIzaSyAjJUqM7nLoWU1i_oDQP1k3PYylmPJskAQ";


const useAPI = () => {
  const error = useSelector((store) => store.app.isError);
  const [key, setKey] = useState("AIzaSyDmPMnpn3pccWz7xlF5UaOk6itv8JKfLB4");

  const changeKey = () => {
    if (error) {
      setKey("AIzaSyB_hZpvetMN46neTQMwUh7k71A9wvmYnC0");
      
    }
  };

  useEffect(() => {changeKey()}, [key, error]);
  //console.log(key, "GOOGLE_API_KEY");
  return key;
};

export default useAPI;
