import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import store from "./redux/store";
import Home from './view/Home/Home'
import "./App.scss";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Route path="/" component={ Home }></Route>
                        {/* <Redirect to="/" /> */}
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
