import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware  } from 'connected-react-router' // redux中可以使用router
import { createBrowserHistory } from 'history' // redux中可以使用router
import { draftArrReducer } from './DraftBox/reducer'
// import { globalReducer } from './Global/reducer'
export const history = createBrowserHistory()
const actionsHistory = routerMiddleware(history)
const obj = {
    draftArrReducer,
    router: connectRouter(history) // root reducer with router state
}
// let middleware = [sagaMiddleware, actionsHistory]
let store = createStore(
    combineReducers(obj),
    applyMiddleware(actionsHistory) // for dispatching history actions
);
export default store;
