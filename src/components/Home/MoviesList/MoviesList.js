import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { PullToRefresh, ListView, Button } from "antd-mobile";
import axios from "axios";
import "./MoviesList.scss"

let data = [], // 展示数据
dataId = [], // 列表所有电影id集合
dataArr = []; 
const NUM_ROWS = 20;
let pageIndex = 0;
const PAGE_SIZE = 12;
async function genData (pIndex = 0) {
    let ids = dataId.length ? dataId.slice(pIndex*PAGE_SIZE, (pIndex+1)*PAGE_SIZE) : [];
    await axios({
        url: 'http://192.168.0.173:3030/api/list',
        params: {
            movieIds: ids.toString() || undefined,
            page: pageIndex
        }
    }).then(res => {
        if(res.statusText = "OK") {
            data = data.concat(res.data.movieList);
            dataId = res.data.movieIds; 
            for (let i = 0; i < res.data.movieList.length; i++) {
                dataArr.push(`row - ${PAGE_SIZE*pageIndex + i}`);
            }
        }
    }).catch(err => {
    })
    console.log(data)
    return dataArr;
}

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            useBodyScroll: false
        };
    }

    static propTypes = {
        getlist: PropTypes.func,
    }
    static rData = []
    componentDidMount() {
        setTimeout(async () => {     
            let arr = await genData();   
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({...this.rData,...arr}),
                refreshing: false,
                isLoading: false
            });
        }, 1500);
    }

    onEndReached = event => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        setTimeout(async() => {
            let arr = await genData(++pageIndex);   
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({...this.rData,...arr}),
                refreshing: false,
                isLoading: false
            });
        }, 1000);
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: "#F5F5F9",
                    height: 8,
                    borderTop: "1px solid #ECECED",
                    borderBottom: "1px solid #ECECED"
                }}
            />
        );
        // let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            const obj = data[rowID];
            console.log(obj)
            return (
                <div
                    key={rowID}
                    style={{
                        paddingLeft: "0 4vw",
                        backgroundColor: "white"
                    }}
                >
                    <div
                        className="itemMovies"
                    >
                        <div>
                            <img
                                style={{
                                    height: "25.3vw",
                                    width: "17.3vw",
                                    marginRight: "15px"
                                }}
                                src={obj.img.replace(/\/w.h\//g,"/")}
                                alt=""
                            />
                            <div className="content" style={{ display: "inline-block" }}>
                                <div
                                    style={{
                                        marginBottom: "5px",
                                        color: "#000",
                                        fontSize: "16px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "50.8vw",
                                        display: "inline-block",
                                        verticalAlign: "middle"
                                    }}
                                >
                                    {obj.nm}
                                    { obj.version ? <i className="tpp-lbl-g"><i className="lbl-hdr">3D</i><i className="lbl">IMAX</i></i> : '' }
                                </div>
                                <div className="point">
                                    <span>观众评</span>
                                    <span>{obj.sc}</span>
                                </div>
                                <p className="star">
                                    主演: {obj.star}
                                </p>
                                <p>
                                    {obj.showInfo}
                                </p>
                            </div> 
                        </div>
                        <div className="btn-wrap">
                            <div className="btncontent">
                                <div className="tpp-btn-primary">
                                    购票
                                </div>
                                <p className="act-tag">
                                    特惠
                                </p>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <div>
                <ListView
                    key={true}
                    ref={el => (this.lv = el)}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: "center" }}>
                            {this.state.isLoading ? "Loading..." : "Loaded"}
                        </div>
                    )}
                    renderRow={row}
                    renderSeparator={separator}
                    useBodyScroll
                    // pullToRefresh={
                        // <PullToRefresh
                            // refreshing={this.state.refreshing}
                            // onRefresh={this.onRefresh}
                    //     />
                    // }
                    onEndReached={this.onEndReached}
                    pageSize={3}
                />
            </div>
        );
    }
}
