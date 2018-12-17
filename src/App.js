import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from './view/Home/Home'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={ Home }></Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
