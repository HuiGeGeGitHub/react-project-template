import { createStore, combineReducers, applyMiddleware } from "redux";
import * as home from "./Home/reducer";
import thunck from "redux-thunk";
let obj = {
    ...home
}
let store = createStore(
    combineReducers(obj),
    applyMiddleware(thunck)
);
export default store;
