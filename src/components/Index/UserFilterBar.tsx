import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd'
import { deleteWhiteHanlde } from "../../utils/tools";
import './UserFilterBar.scss'
type Props = {
    searchInfo: any;
    changeState: Function;
    changePage: Function;
}
export default React.memo(function FilterBar(props: Props) {
    let [accountTemp, setAccountTemp] = useState(''),
        [companyTemp, setCompanyTemp] = useState('');
    return (
        <section className="filterBarwrap">
            <div className="item">
                <label>账户:</label>
                <Input placeholder="请输入租户" 
                    value={accountTemp}
                    style={{ width: 230 }}
                    onChange={(e) => {
                        deleteWhiteHanlde(e.target.value)((v) => {
                            setAccountTemp(v)
                        })
                    }}
                    maxLength={100}
                    allowClear/>
            </div>
            <div className="item">
                <label>公司:</label>
                <Input placeholder="请输入账号" style={{ width: 230 }}
                    value={companyTemp}
                    onChange={(e) => {
                        deleteWhiteHanlde(e.target.value)((v) => {
                            setCompanyTemp(v)
                        })
                    }}
                    maxLength={100}
                    allowClear/>
            </div>
            <div className="item">
                <Button type="primary" onClick={() => {
                    props.changeState({
                        searchInfo: {
                            company: companyTemp,
                            account: accountTemp
                        }
                    })
                    props.changePage(1)
                }}>查询</Button>
                <Button onClick={() => {
                    setCompanyTemp('')
                    setAccountTemp('')
                    props.changeState({
                        searchInfo: {
                            company: '',
                            account: ''
                        }
                    })
                    props.changePage(1)
                }}>重置</Button>
            </div>
        </section>
    )
})