import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import homeRedux from "./reducers";

const finalCreateStore = compose(
    applyMiddleware(ThunkMiddleware)
)(createStore);
const reducer = combineReducers(Object.assign({}, homeRedux));
export default function configureStore(initState) {
    const store =  finalCreateStore(reducer, initState);
    return store;
}