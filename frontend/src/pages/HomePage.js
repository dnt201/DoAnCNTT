import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/banner/Banner";
import Policy from "../components/policy/Policy";
import { Link } from "react-router-dom";
import Monitor1 from "../images/Monitor1.png";
import Monitor2 from "../images/Monitor2.png";
import LaptopVideo from "../images/alianware.mp4";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="flex_column_center mb_36px">
        <h1 className=" mt_16px mb_16px ">MONITOR</h1>
        <div className="flex_row_center">
          <img className="w35" src={Monitor1} alt="" />
          <img className="w35" src={Monitor2} alt="" />
        </div>
        <Link
          to="/Monitor"
          className="pd_1628 mb_36px bg_gray  white btnHomePage"
        >
          Details
        </Link>
      </div>
      <div className="flex_column_center w100 bg_gray ">
        <h1 className="white button mt_16px mb_16px ">Laptop</h1>

        <video
          className="w100 h90"
          autoPlay="autoPlay"
          loop="loop"
          muted="muted"
          src={LaptopVideo}
        ></video>
        <Link
          to="/Laptop"
          className="pd_1628 mb_16px mt_8px bg_white btnHomePage"
        >
          Details
        </Link>
      </div>

      <Policy show={true} />
    </div>
  );
};

export default HomePage;
