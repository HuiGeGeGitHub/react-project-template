import axios from "axios";
export const getlist = () => {
    return async dispatch => {
        let list = await axios({
            url: 'http://192.168.0.173:3030/api/list',
        }).then(res => {
            return res.data
        }).catch(err => {
            return []
        })
        dispatch({
            type: "LOAD_DATA",
            dataList: list
        });
    }
}