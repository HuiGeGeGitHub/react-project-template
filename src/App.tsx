import React from "react";
import "./common/resize"
import RouteConfig from './route/index'
import "./App.scss";
function App() {
    return (
        <div className="App">
            {/* <Provider store={store}> */}
                <RouteConfig />
            {/* </Provider> */}
        </div>
    );
}

export default App;
