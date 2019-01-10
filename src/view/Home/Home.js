import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getlist, setHeader } from "../../redux/Home/action"
import HeaderBar from "Components/Home/HeaderBar/HeaderBar";
import CurrentList from "./CurrentList/CurrentList"
import NextList from "./NextList/NextList"
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        tableList: PropTypes.any,
    }
    componentDidMount() {
        console.log(this.props)
    }
    componentWillReceiveProps() {
        console.log(this.props)
    }
    render() {
        return (
            <div className="page page-home">
                <HeaderBar headerData={this.props.headerData} setHeader={this.props.setHeader}></HeaderBar>
                <Switch>
                    <Route exact path="/" component={ CurrentList }></Route>
                    <Route path="/home_next" component={ NextList }></Route>
                </Switch>
            </div>
        );
    }
}
export default connect(state => {
    return {
        tableList: state.store.lisData,
        headerData: state.store.headerData
    }
},{
    setHeader,
    getlist
})(HomeView);