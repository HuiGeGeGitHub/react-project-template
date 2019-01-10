import React from "react";
import Tablist from "../Tablist";
import "./HeaderBar.scss";

function HomeHeader(props) {
    let { headerData, setHeader } = props;
    let logo = require("./images/logo-50-50.svg");
    return (
        <div className="header">
            <div className="left">
                <img src={logo} alt="logo"/>
                <span>{headerData.city}</span>
                <span className="arrow-down"></span>
            </div>
            <Tablist headerData={headerData} setHeader={setHeader}></Tablist>
        </div>
    )
}
export default HomeHeader