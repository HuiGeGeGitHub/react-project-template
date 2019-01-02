import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getlist } from "../../redux/Home/action"
import TableCom from "../../components/Home/Table";
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        tableList: PropTypes.any,
        getlist: PropTypes.func.isRequired,
    }
    componentDidMount() {
        this.props.getlist();
    }
    render() {
        console.log(this.props)
        return (
            <div className="page page-home">
                <TableCom list={this.props.tableList.data} />
            </div>
        );
    }
}
export default connect(state => {
    return {
        tableList: state.tableList
    }
},{
    getlist
})(HomeView);