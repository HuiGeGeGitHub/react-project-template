import { actionInter } from "../EditVideo/action";
import { SET_DRAFT } from './type'
export interface StoreDraftState {
    drafArr: any[];
}
const initState: StoreDraftState = {
    drafArr: []
};

export const draftArrReducer = (
    state = initState,
    action: actionInter
): StoreDraftState => {
    switch (action.type) {
        case SET_DRAFT:
            var newObj = action.payload
            if(action.payload.length && Array.isArray(action.payload)) {
                newObj = action.payload.map(v => ({
                    ...v,
                    data: typeof v.data === 'string' ? JSON.parse(v.data) : v.data
                }))
            }
            return {
                ...state,
                drafArr: newObj
            };
        default:
            return state;
    }
};
