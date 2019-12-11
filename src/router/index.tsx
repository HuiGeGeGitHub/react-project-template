import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from '../view/NotFound/NotFound'
import routesConfig from "../router/config"
import ManageSkeleton from '../components/Global/ManageSkeleton/ManageSkeleton';
// const createBrowserHistory = require('history').createBrowserHistory
const ParentWrapComMap = {
    ManageSkeleton
}
class RouteConfig extends Component{
    componentWillReceiveProps(nexProps) {
        console.log(this.props, nexProps)
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/manage/solution" push />}></Route>
                    <MainComp />
                    <Route component={NotFound}></Route>
                </Switch>
            </div>
        )
    }
}
function MainComp(): any {
    return Object.keys(routesConfig).map(key => 
            routesConfig[key].map(r => {
                if(r.component) {
                    return (
                        <Route
                            key={r.route}
                            path={r.route}
                            render={
                                (props) => renderRoute(props, r)
                            }
                        />
                    )
                }else if(r.children) { // 有子页面
                    if(r.parentWrapCom) {
                        const ParentWrapCom: any = ParentWrapComMap[r.parentWrapCom]
                        return (
                            <Route
                                key={r.route}
                                path={r.route}
                                render={() => {
                                    let parentFix = r.route === '/' ? '' : r.route
                                    return (
                                        r.children.map(v =>
                                            <Route
                                                path={parentFix + v.route}
                                                key={parentFix + v.route}
                                                render={
                                                    (props) => <ParentWrapCom>
                                                        {
                                                            renderRoute(props, v)
                                                        }
                                                    </ParentWrapCom>    
                                                }
                                            ></Route>
                                        )
                                    )
                                }}
                            />
                        )
                    }else {
                        return (
                            <Route
                                key={r.route}
                                path={r.route}
                                render={() => {
                                    let parentFix = r.route === '/' ? '' : r.route
                                    return (
                                        r.children.map(v =>
                                            <Route
                                                path={parentFix + v.route}
                                                key={parentFix + v.route}
                                                render={
                                                    (props) => renderRoute(props, v)
                                                }
                                            ></Route>
                                        )
                                    )
                                }}
                            />
                        )
                    }
                }
            })
        )
}
function renderRoute(props, r) {
    let Component = r.component,
        token = window.localStorage.getItem('token')
    document.title = r.title || '相芯科技'
    if(!token) { // 鉴权
        // return <Redirect to="/login" push /> 
        // 去登录
    }
    return <Component {...props}></Component>
}
export default RouteConfig