import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* getList (actions) {
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

function* rootSaga() {
    yield takeEvery("GET_STORE_DATA",getList)
}
export default rootSaga;