const initState = {
    lisData: [],
    headerData: {
        city: "杭州",
        list: [
            {
                title: "正在热映",
                type: 0,
            },
            {
                title: "即将上映",
                type: 1,
            }
        ],
        current: 0,
    }
};

export const store = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_DATA":
            let obj = {
                ...state,
                lisData: action.dataList
            }
            return obj;
        case "HEADER_DATA":
            return {
                ...state,
                headerData: action.headerData
            } 
        default: 
            return state;
    }
}