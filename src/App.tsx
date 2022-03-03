import React, { Component } from "react"
import { Provider } from "react-redux"
import { ConfigProvider } from "antd"
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
                    <ConnectedRouter history={history}>
                        <RouteConfig></RouteConfig>
                    </ConnectedRouter>
                </Provider>
            </ConfigProvider>
        )
    }
}

export default App
