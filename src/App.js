import React, { Component } from "react";
// import logo from "./logo.svg";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore"
import "./App.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from './view/Home/Home'
class App extends Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <BrowserRouter>
                    <div>
                        <Route path="/" component={ Home }></Route>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
