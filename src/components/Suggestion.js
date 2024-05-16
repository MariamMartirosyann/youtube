import React from "react";
import { Link } from "react-router-dom";

const Suggestion = ({ s }) => {
  return (
    <div>
      <Link to="/results">
        <li className=" p-2 shadow-sm hover:bg-gray-100" >🔍{s}</li>
      </Link>
    </div>
  );
};

export default Suggestion;
