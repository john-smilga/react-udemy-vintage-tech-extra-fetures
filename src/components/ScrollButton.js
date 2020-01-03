import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { UserContext } from "../context/user";
export default () => {
  const { height } = React.useContext(UserContext);
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  return (
    <button
      className={height > 100 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
      onClick={scrollBackToTop}
    >
      <FaAngleDoubleUp></FaAngleDoubleUp>
    </button>
  );
};
