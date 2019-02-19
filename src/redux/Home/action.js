import axios from "axios";
export const getlist = () => {
    return async dispatch => {
        // 已经废弃
        // let list = await axios({
        //     url: 'http://192.168.0.173:3030/api/list',
        // }).then(res => {
        //     return res.data
        // }).catch(err => {
        //     return []
        // })
        // dispatch({
        //     type: "LOAD_DATA",
        //     dataList: list.movieList
        // });
    }
}
export const setHeader = (headerData) => {
    return {
        type: 'HEADER_DATA',
        headerData
    }
}