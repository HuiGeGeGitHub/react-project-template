import { combineReducers } from 'redux';
import tableRedux from "../../components/Home/TableRedux";
export const tableActions = tableRedux;

export default combineReducers({
    tableRedux,
});
// 这个是Why?