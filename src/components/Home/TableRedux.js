const initState = {
    data: []
};
const LOAD_DATA = "LOAD_DATA";

function getList (state = initState, action) {
    switch(action.type) {
        case LOAD_DATA: 
            return {
                ...state,
                data: action
            }
            break;
        default: 
            return state;
    }
}
export default getList