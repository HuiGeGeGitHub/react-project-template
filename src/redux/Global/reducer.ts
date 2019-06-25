import { actionInter } from "../EditVideo/action";
import { SETSAMLL } from './type'
export interface StoreEditVideoState {
    smallScreen: boolean;
}
const initState: StoreEditVideoState = {
    smallScreen: false
};

export const globalReducer = (
    state = initState,
    action: actionInter
): StoreEditVideoState => {
    switch (action.type) {
        case SETSAMLL:
            return {
                ...state,
                smallScreen: action.payload
            };
        default:
            return state;
    }
};
