import React, { Component } from "react";
import "./Home.scss";
interface Props {
    [propName: string]: any;
}
interface State {
}
class Login extends Component<Props> {
    constructor(props) {
        super(props)
    }
    state: State = {
    }
    render() {
        return (
            <section className="homeWrap">
                <div className="form">
                </div>
            </section>
        )
    }
}
// connect(mapStateToProps, mapDispatchToProps)(MyComponent);
export default Login
    
