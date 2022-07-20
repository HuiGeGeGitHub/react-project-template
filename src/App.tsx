import React, { Component } from "react"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { history } from "./redux/store"
import RouteConfig from "./router/index"
import store from "./redux/store"
import "./App.scss"
import zhCN from "antd/lib/locale-provider/zh_CN"
class App extends Component {
    componentDidMount() {}
    public render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Provider store={store}>
                    {/* <ConnectedRouter history={history}> */}
                    <BrowserRouter>
                        <RouteConfig />
                    </BrowserRouter>
                    {/* </ConnectedRouter> */}
                </Provider>
            </ConfigProvider>
        )
    }
}

export default App
