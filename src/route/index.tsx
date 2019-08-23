import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from '../view/NotFound/NotFound'
import config from './config'
interface Props {

}
class RouteConfig extends Component <Props>{
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps(nexProps) {
        console.log(nexProps)
    }
    render() {
        return (
            <BrowserRouter>  {/* 上一级已经有全局Router了  */}
                <Switch>
                    {
                        Object.keys(config).map(key => 
                            config[key].map(r => {
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
                            })
                        )
                    }
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default RouteConfig

function renderRoute(props, r) {
    let Component = r.component
        // token = window.localStorage.getItem('token')
    document.title = r.title || '相芯科技'
    // if(!token) { // 鉴权
    //     return <Redirect to="/login" push /> 
    // }
    return <Component />
}