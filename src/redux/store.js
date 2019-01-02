import { createStore, combineReducers, applyMiddleware } from "redux";
import * as home from "./Home/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from './saga.js';
const sagaMiddleware = createSagaMiddleware();
let obj = {
    ...home
}
let store = createStore(
    combineReducers(obj),
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;