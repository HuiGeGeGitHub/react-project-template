import React, { Component } from "react"
import "./HeaderCustom.scss"
import { Layout, Popover } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
// import { StoreEditVideoState } from "../../redux/Login/reducer";

const defaultIcon = require("./images/defaultuser.png")
function logout(props) {
    props.history.replace("/login")
    window.localStorage.removeItem("token")
}
function Content(props) {
    return (
        <ul className="customPopover">
            <li onClick={() => logout(props)}>
                <LogoutOutlined />
                退出
            </li>
        </ul>
    )
}
function HeaderBar(props) {
    return (
        <Layout.Header className="custom-theme">
            <div className="flex">
                <Popover placement="bottom" content={Content(props)}>
                    <div className="userInfo">
                        <img src={defaultIcon} alt="用户头像" />
                        <p>{props.user.account || "未设置名称"}</p>
                    </div>
                </Popover>
            </div>
        </Layout.Header>
    )
}

export default connect((state: any /* { loginReducer: StoreEditVideoState } */) => {
    return {
        user: {},
    }
})(HeaderBar)
