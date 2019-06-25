import React, { Component } from "react";
import { Provider } from "react-redux";
import { LocaleProvider } from 'antd'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/store'
import RouteConfig from './router/index'
import store from "./redux/store";
import "./App.scss";
import zhCN from 'antd/lib/locale-provider/zh_CN';
class App extends Component {
    componentDidMount() {
        // let user = window.localStorage.getItem('user')
        // if(user) {
        //     let userObj = JSON.parse(user)
        //     if(Object.prototype.toString.call(userObj) !== '[object Object]' ) {
        //         return
        //     }
            // dispatch()
            // store.dispatch(changeUserInfo({user: userObj}))
        // }
    }
    public render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <RouteConfig></RouteConfig>
                    </ConnectedRouter>
                </Provider>
            </LocaleProvider>
        )
    }
}

export default App;
