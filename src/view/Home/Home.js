import React,{ Component } from "react";
import PropTypes from 'prop-types';
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getlist, getimgAction } from "../../redux/Home/action"
import TableCom from "../../components/Home/Table";
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: ''
        };
    }
    static propTypes = {
        tableList: PropTypes.any,
        getlist: PropTypes.func.isRequired,
    }
    style = {
        width: "100px",
        height: "100px",
        display: "block"
    }
    componentDidMount() {
        this.setState({
            formdata: new FormData()
        })
        this.props.getlist();
    }
    onChange = (e) => {
        this.setState({
            formdata: this.state.formdata.append("image",e.target.files[0])
        })
        this.props.getimgAction(this.state.formdata)
    }
    render() {
        return (
            <div className="page page-home">
                <TableCom list={this.props.tableList.data} />
                <input type="file"  onChange={this.onChange}/>
                <img src={this.props.tableList.imgsrc} alt="" style={this.style}/>
            </div>
        );
    }
}
export default connect(state => {
    let { tableList } = state;
    return {
        tableList
    }
},{
    getlist,
    getimgAction
})(HomeView);