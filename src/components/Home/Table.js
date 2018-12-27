import React from 'react';
import { Table } from 'antd';
const Tables = (props) => {
    return (
        <Table columns={props.columns} dataSource={props.dataSource} />
    )
}
export default Tables; 