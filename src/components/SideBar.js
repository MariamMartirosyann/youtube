import React from "react";
import { useSelector } from "react-redux";

const sideBarTabs = [
  {
    name: "Home",
    icon: (
      <svg
        class="h-7 w-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />{" "}
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Shorts",
    icon: (
      <svg
        class="h-7 w-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />{" "}
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: "Subscrp.",
    icon: (
      <svg
        class="h-7 w-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <circle cx="12" cy="12" r="10" />{" "}
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
  },
  {
    name: "You",
    icon: (
      <svg
        class="h-7 w-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
        <circle cx="8.5" cy="7" r="4" /> <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
    children: ["Music", "Sport", "History"],
  },
];

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className=" p-5 shadow-lg w-25">
      {sideBarTabs.map((t) => (
        <>
          <h1 key={t.name} className= {` ${isMenuOpen?" font-bold flex":null} pt-7 `}>
            <div className="mx-2">{t.icon}</div>
            <span>{t.name}</span>
            
          </h1>
          {isMenuOpen?t.children?.map((c) => (
            <div  className="ml-10 mt-1"key={c}>{c}</div>
          )):null}
        </>
      ))}
    </div>
  );
};

export default SideBar;
