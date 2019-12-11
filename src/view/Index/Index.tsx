import React, { memo, useState, useEffect } from "react"
import { connect } from "react-redux"
import FilterBar from '../../components/Index/UserFilterBar'
import { Button, Table, Popover } from "antd"
import { httpReq, formatTime } from "../../utils/tools"
import './Index.scss'
const columns: any = [
    {
        title: "序号",
        key: "sortIndex",
        width: 80,
        render: (text, record, i) => {
            return i + 1
        }
    },
    {
        title: "租户名称",
        dataIndex: "username",
        key: "username",
        width: 160,
        render: (text) => {
            return text
        }
    },
    {
        title: "账号",
        dataIndex: "account",
        key: "account",
        width: 160,
        className: 'accountTd',
        render: (text) => {
            if(!text || !text.length) {
                return null
            }
            return (
                <p>
                    <i title={text[0].account}>{ text[0].account }</i>
                    {
                        text.length > 0 && <Popover title={text[0].company} trigger="hover"
                            content={<div>
                                {
                                    text.map(v => <p key={v.account}>{v.account}</p>)
                                }
                            </div>}
                        >
                            更多
                        </Popover>
                    }
                </p>
            )
        }
    },
    {
        title: "联系方式",
        dataIndex: "contact",
        key: "contact",
        width: 150,
        className: "contact",
        render: (text) => {
            return text[0].contact
        }
    },
    {
        title: "有效期",
        dataIndex: "package",
        key: "endtime",
        width: 220,
        render: (text) => {
            let start = formatTime(text.start, 'yy.mm.dd'),
                end = formatTime(text.end, 'yy.mm.dd')
            return start + '-' + end
        }
    },
    {
        title: '并发量',
        dataIndex: "complicat",
        key: "complicat",
        width: 100,
        render: text => text
    },
    {
        title: "存储容量(G)",
        dataIndex: "package",
        key: "store",
        width: 120,
        render: text => text.store
    },
    {
        title: "视频时长(min)",
        dataIndex: "package",
        key: "total_time",
        width: 130,
        render: text => Math.ceil(text.total_time / 60)
    },
    {
        title: "使用时长",
        dataIndex: "package",
        key: "use_time",
        width: 100,
        render: text => Math.ceil(text.total_time / 60)
    },
    {
        title: "剩余时长",
        dataIndex: "package",
        key: "total_time",
        width: 100,
        render: text => Math.ceil(text.total_time / 60)
    },
    {
        title: "申请状态",
        key: "status",
        width: 120,
        className: 'status',
        render: (text) => {
            return <p><i className={"status" + text.status}></i>{/* statusMap[text.status] */}正常</p>
        }
    },
    {
        title: "操作",
        dataIndex: "package",
        key: "edit",
        width: 150,
        className: 'edit',
        render: (text, record, i) => (
            <div>
                <span className={`editBtn ${record.status ? '' : 'disabled'}`} onClick= {() => {
                    if(!record.status) { // 审核中
                        return false;
                    }
                    // this.changeState({
                    //     addUserConfig: initEditData(record),
                    //     showForm: true,
                    //     ModalIndex: i
                    // })
                }}
                >配置</span>
            </div>
        )
    }
]
const TenantInfo = memo(props => {
    let [searchInfo, setSearchInfo] = useState({
            company: '',
            account: ''
        }),
        [pageInfo, setPageInfo] = useState({
            page: 1,
            pageSize: 10,
        }),
        [tableData, setTableData] = useState([])
    useEffect(() => {
        httpReq({
            url: `/api/info/tts`,
            method: "get",
        }).then(res => {
            console.log(res)
        })
    }, [])
    return <div className="tenantInfoWrap">
        <div className="filterBg">
            <h3>用户配置</h3>
            <FilterBar 
                searchInfo={searchInfo} 
                changeState={setSearchInfo}
                changePage={setPageInfo}
            ></FilterBar>
            <div className="addUser">
                <Button icon="plus" type="primary" /* disabled={!Object.keys(avatarMotionArr).length || !Object.keys(toneType).length} */ 
                    onClick={() => {
                        // this.changeState({
                        //     addUserConfig: JSON.parse(JSON.stringify(initConfig))
                        // })
                        this.sliderModal()
                    }}>新增租户</Button>
            </div>
        </div>
        <div className="tableContent">
            <Table
                className="table"
                // dataSource={tableData ? tableData.data : []}
                columns={columns}
                rowKey="_id"
                // loading={loadding}
                pagination={{
                    current: pageInfo.page,
                    pageSize: pageInfo.pageSize,
                    total: tableData.count,
                    onChange: (page: any) => {
                        this.changePage(page)
                    }
                }}
            />
        </div>
        {/* <Modal
            title={addUserConfig.editStatus ? "编辑用户" : '新增用户' }
            visible={showForm}
            width= {600}
            maskClosable={false}
            destroyOnClose
            key={ModalIndex + '-' + pageInfo.page}
            onOk={this.submitForm}
            confirmLoading={confirmLoading}
            okText={addUserConfig.editStatus ? "重新申请" : '发送申请'}
            onCancel={() => this.setState({
                showForm: false
            })}
        >
            <UserConfigForm 
                addUserConfig={addUserConfig}
                toneType={toneType}
                avatarMotionArr={avatarMotionArr}
                selectNonCustom={selectNonCustom}
                changeUserConfig={this.changeUserConfig}
            />
        </Modal> */}
    </div>
})
export default connect(state => {
    return {}
})(TenantInfo)
