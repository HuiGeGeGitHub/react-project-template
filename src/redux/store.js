import { createStore, combineReducers, applyMiddleware } from "redux";
import * as home from "./Home/reducer";
import thunk from "redux-thunk";
let obj = {
    ...home
}
let store = createStore(
    combineReducers(obj),
    applyMiddleware(thunk)
);
export default store;
