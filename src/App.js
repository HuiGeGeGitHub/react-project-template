import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./redux/store";
import Home from './view/Home/Home'
import "./App.css";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
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
