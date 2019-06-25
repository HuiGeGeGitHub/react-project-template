import { actionInter } from '../EditVideo/action'
import { SET_DRAFT } from './type'
function pubFactory(typeName: string) {
    return (payload: object): actionInter => {
        return {
            type: typeName,
            payload
        }
    }
}

export const setDraft = pubFactory(SET_DRAFT)
