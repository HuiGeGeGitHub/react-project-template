import React, { memo, useState, useEffect,  } from "react";
import { connect } from "react-redux";
import { Button, Modal, message, Icon } from "antd";
import { withRouter } from 'react-router-dom'
import { setDraft } from "../../redux/DraftBox/action";
import { StoreDraftState } from "../../redux/DraftBox/reducer";
import { axios } from "../../utils/tools";
import "./DraftBox.scss";
import NoData from "../../components/Global/NoData/NoData";
export interface DraftBoxProps extends StoreDraftState {
    setDraft: Function;
}
let inputBlurTime

const DraftBox = memo(function DraftBox(props: DraftBoxProps) {
    let [deleteIndex, setDeleteIndex] = useState(-1),
    [editIndex, setEditIndex] = useState(-1),
    [editHoverIndex, setEditHoverIndex] = useState(-1),
    [editName, changeName] = useState(''),
    [loadding, setLoadding] = useState(false),
    EditOrShow = withEditOrShow();
    useEffect(() => {
        setLoadding(true)
        queryDraft((data) => {
            props.setDraft(data)
            setLoadding(false)
        })
        return () => { // componentWillUnmount
            clearTimeout(inputBlurTime)
        }
    }, [])
    let len = props.drafArr.length
    return (
        <div className="drafboxWrap">
            {!!len &&
            <ul className="drafList">
                {
                    props.drafArr.map((v, i) => (
                        <li
                            key={v.uuid}
                            onMouseEnter={e => {
                                setDeleteIndex(i);
                            }}
                            onMouseLeave={() => {
                                setDeleteIndex(-1);
                            }}
                            onClick={() => {
                                setEditData(v, props)
                            }}
                        >
                            <div className="name" >
                                <EditOrShow v={v} i={i} editHoverIndex={editHoverIndex} setEditHoverIndex={setEditHoverIndex}
                                    editIndex={editIndex} setEditIndex={setEditIndex} changeName={changeName} editName={editName}
                                    setDraft={props.setDraft}
                                />
                            </div>

                            <p className="time"> {v.data.submitTime || '--/--/-- --:--:--'} </p>
                            {deleteIndex == i && (
                                <Icon
                                    type="close"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        showConfirm(() => {
                                            deleteDraft(v.uuid, () => props.drafArr.splice(i, 1))
                                        });
                                    }}
                                />
                            )}
                        </li>
                    ))
                }
                <p className="count">
                   {len}/20
                </p>
            </ul>
            }
            {!len && (
                <section className="noData">
                    <NoData loadding={loadding} info="您还没有保存草稿呢~" />
                </section>
            )}
        </div>
    );
});
function setEditData(value: any, props) { // 草稿箱数据导出到编辑页面
    if(!value){
        return
    }
    let { setEditState, setDrafInfo } = props,
        { currentAvaCount, currentAvaLeftIndex, currentAvaRightIndex, currentBgIndex, editDataArr, submitTime, drafName } = value.data,
    editData = {
        currentAvaCount,
        currentAvaLeftIndex,
        currentAvaRightIndex,
        currentBgIndex,
        editDataArr,
        editIndex: [0, 0]
    }
    setEditState(editData)
    setDrafInfo({
        submitTime,
        drafName,
        uuid: value.uuid
    })
    setTimeout(() => {
        console.log(props)
        props.history.push('/app')
    })
}
async function queryDraft(cd) {
    try{
        var res: any = await axios({
            url: `/api/draft/query`,
            method: "get",
        })
    }catch(err) {
        cd([])
    }
    if(res && res.data && res.data.code === 2 ) {
        cd(res.data.data)
    }else{
        message.error((res && res.data) ? res.data.message : '获取草稿箱失败~')
    }
}
async function updataDraft(data, cb) {
    var res: any = await axios({
        url: `/api/draft/update`,
        method: "post",
        data: data
    })
    if(res && res.data && res.data.code === 2 ) {
        message.success('修改草稿成功~')
        cb()
    }else{
        message.error(res.data.message || '修改草稿失败~')
    }
}
async function deleteDraft( uuid, cd) {
    var res: any = await axios({
        url: `/api/draft/delete`,
        method: "post",
        data: {
            uuid
        }
    })
    if(res && res.data && res.data.code === 2 ) {
        cd()
        message.success('删除此草稿成功！')
        return
    }
    message.error(res.data.message || '获取草稿箱失败~')
}
function showConfirm(cb) {
    Modal.confirm({
        title: "确定删除此草稿吗?",
        okType: "danger",
        onOk: cb
    });
}
function withEditOrShow() {
    // console.log(document.querySelector('.drafList .name p'))
    return props => {
        let { setEditHoverIndex, editHoverIndex, i , v, editIndex, setEditIndex, changeName, editName, setDraft } = props
        return (
            editIndex !== i ? (
                <p
                    onMouseEnter={() => {
                        if(i == editHoverIndex) {
                            return
                        }
                        setEditHoverIndex(i);
                    }}
                    onMouseLeave={() => {
                        if(i == -1) {
                            return
                        }
                        setEditHoverIndex(-1)
                    }}
                >
                    {v.data.drafName || '未命名'}
                    {editHoverIndex == i && <Icon type="edit" theme="filled" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditIndex(i)
                            changeName(v.data.drafName)
                        }}
                    />}
                </p>
            ) : (
                <div className="input">
                    <input type="text" autoFocus defaultValue={editName} maxLength={30} 
                        onChange={(e) => changeName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={() => inputBlurTime = setTimeout(() => {
                            setEditIndex(-1)
                            clearTimeout(inputBlurTime)
                        }, 500)}
                    />
                    <div className="btn">
                        <Button size="small" onClick={(e) => {
                            e.stopPropagation()
                            if(!editName){
                                message.error('请输入草稿名称！')
                                return
                            }
                            updataDraft({
                                ...v,
                                data: JSON.stringify({
                                    ...v.data,
                                    drafName: editName
                                })
                            }, () => queryDraft(setDraft))}}
                        >确定</Button>
                        <Button onClick={(e) => {
                            e.stopPropagation()
                            setEditIndex(-1)
                        }} size="small">取消</Button>
                    </div>
                </div>
            )
        )
    }
}
// connect(mapStateToProps, mapDispatchToProps)(MyComponent);
let DraftBoxWrap: any = connect(
    (state: { draftArrReducer: StoreDraftState }) => {
        let { drafArr } = state.draftArrReducer;
        return {
            drafArr
        }
    },
    {
        setDraft,
    }
)(DraftBox);
export default withRouter(DraftBoxWrap)

