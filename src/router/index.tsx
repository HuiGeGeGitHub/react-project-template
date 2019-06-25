import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from '../view/NotFound/NotFound'
import routesConfig from "../router/config"
// const createBrowserHistory = require('history').createBrowserHistory
class RouteConfig extends Component{
    componentWillReceiveProps(nexProps) {
        console.log(this.props, nexProps)
    }
    render() {
        return (
            // <BrowserRouter>  {/* 上一级已经有全局Router了  */}
            //  <Router history={createBrowserHistory()}>  
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app" push />}></Route>
                    <Route path="/app" component={MainComp} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            // </Router>
        )
    }
}

function MainComp() {
    return (
        Object.keys(routesConfig).map(key => 
            routesConfig[key].map(r => {
                const route = r => {
                    return (
                        <Route
                            key={r.route || r.key}
                            exact
                            path={r.route || r.key}
                            render={
                                (props) => renderRoute(props, r)
                            }
                        />
                    )
                }
                return route(r)
            })
        )
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
    return <Component ></Component>
}
export default RouteConfig