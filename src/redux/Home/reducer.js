const initState = {
    data: []
};

export const tableList = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_DATA":
            let obj = {
                ...state,
                data: action.dataList
            }
            return obj
        default: 
            return state;
    }
}