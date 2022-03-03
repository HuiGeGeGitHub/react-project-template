import React, { memo, useState } from "react"
import { Layout, Menu } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import RouterConfig from "../../../router/config"
import HeaderCustom from "../HeaderCustom/HeaderCustom"
import "./ManageSkeleton.scss"
const { Sider } = Layout
const { menus } = RouterConfig
function ManageSkeleton(props) {
    const asideWidth = 256
    let [collapsed, setcollapsed] = useState(false)
    return (
        <Layout style={{ height: "100%" }}>
            <Sider trigger={null} collapsible width={asideWidth} collapsed={collapsed}>
                <section className="logo"></section>
                <SiderCustom {...props} />
                <span className="collapsedBtn" onClick={() => setcollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
            </Sider>
            <Layout className="contentWrap">
                <HeaderCustom />
                {props.children}
            </Layout>
        </Layout>
    )
}
type ItemType = {
    route: string
    icon: string
    title: string
}
function SiderCustom(props) {
    return (
        <Menu selectedKeys={[props.location.pathname]} mode="inline" className="sideBar">
            {menus.map((item: any) => {
                return item.children.map((i: ItemType) => (
                    <Menu.Item key={item.route + i.route}>
                        <Link to={item.route + i.route}>
                            {/* <Icon type={i.icon} /> */}
                            <span>{i.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            })}
        </Menu>
    )
}
export default withRouter(ManageSkeleton)
