import {_initialGet} from "../Utils/initialState";
import {LIST_MESSAGE, RESET_MESSAGE} from "../Utils/Constant";

export function redMessage(state = _initialGet, action) {
    switch (action.type) {
        case LIST_MESSAGE :
            return {
                status: true,
                status_get: action.status_get,
                data: action.data,
                message: action.message,
                kode: action.kode
            }
        case RESET_MESSAGE :
            return {
                status: false,
                status_get: false,
                data: [],
                message: "",
                kode: ""
            }
        default :
            return state;
    }
}