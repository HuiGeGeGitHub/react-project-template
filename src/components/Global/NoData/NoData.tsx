import React from 'react'
import './NoData.scss';
import { Spin } from 'antd'
const nodata = require('./images/noData.svg')
export default function NoData(props){
    if(props.loadding) {
        return (
            <div className="noDataWrap">
                <Spin size="large" />
            </div>
        )
    }
    return (
        <div className="noDataWrap">
            <img src={nodata} alt="没有数据呢~"/>
            <p>{props.info}</p>
        </div>
    )
}
