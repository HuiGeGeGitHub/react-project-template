import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TableCom from "../../components/Home/Table";
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        title: PropTypes.string
    }
    render() {
        return (
            <div className="page page-home">
                <TableCom />
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        list: []
    }
};
export default connect(
    mapStateToProps
)(HomeView);
