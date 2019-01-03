import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { buffertoArrayBuffer } from "../utils/tools";

function* getList () {
    let p = dispatch => {
        return axios({
            url: 'http://192.168.0.173:3030/api/list',
        }).then(res => {
            return res.data
        }).catch(err => {
            return []
        })
    }
    let resultArr = yield call(p);
    yield put({
        type: 'LOAD_DATA',
        dataList: resultArr
    })
}
function* getimg(action) {
    console.log(action)
    let src = dispatch => {
        return axios({
            url: 'https://api.faceunity.com/api/beauty?access_token=936fdf20-0f30-11e9-93c2-813e43c05ac7',
            method: "post",
            headers: {'Content-Type': 'multipart/form-data'},
            data: action.payload
        }).then((res) => {
            let arr = res.data.data.data;
            let arrbuffer = buffertoArrayBuffer(arr);
            var blob = new Blob([arrbuffer]);
            var src = URL.createObjectURL(blob);
            return src;
        })
    }
    let newsrc = yield call(src);
    yield put({
        type: 'SET_IMG_SRC',
        src: newsrc
    })
}
function* rootSaga() {
    yield takeEvery("GET_STORE_DATA",getList)
    yield takeEvery("GET_IMG_BUFFER",getimg)
}
export default rootSaga;