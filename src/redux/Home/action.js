
export function getlist(arr){
    return {
        type: "GET_STORE_DATA",
        payload: arr
    }
}
export function getimgAction(arr) {
    return {
        type: "GET_IMG_BUFFER",
        payload: arr,
    }
}