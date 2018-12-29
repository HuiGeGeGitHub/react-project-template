import React,{ Component } from "react";
import { Table } from 'antd';
import PropTypes from 'prop-types'
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
            <span>
                {tags}
            </span>
        )
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <span>
                <a href="javascript:;">Invite {record.name}</a>
                <a href="javascript:;">Delete</a>
            </span>
        )
    }
];

class TableCom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        columns: PropTypes.array
    }
    render() {
        console.log(this.props.columns)
        return (
            <div className="page page-home">
                {/* <Table columns={columns} dataSource={data}/> */}
                <Table columns={columns}/>
            </div>
        );
    }
}
export default TableCom; 