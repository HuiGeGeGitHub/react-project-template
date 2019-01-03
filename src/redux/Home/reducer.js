const initState = {
    data: [],
    imgsrc: ''
};

export const tableList = (state = initState, action) => {
    console.log(action)
    switch(action.type) {
        case "LOAD_DATA":
            let obj = {
                ...state,
                data: action.dataList
            }
            return obj
        case "SET_IMG_SRC": 
            return {
                ...state,
                imgsrc: action.src
            }
        default: 
            return state;
    }
}