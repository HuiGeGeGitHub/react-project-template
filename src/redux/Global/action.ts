import { actionInter } from '../EditVideo/action'
import { SETSAMLL } from './type'
function pubFactory(typeName: string) {
    return (payload: object): actionInter => {
        return {
            type: typeName,
            payload
        }
    }
}

export const login = pubFactory(SETSAMLL)