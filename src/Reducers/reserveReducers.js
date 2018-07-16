import {initialAdd} from "../Utils/initialState";

export function redAddReserve(state = initialAdd, action) {
    switch (action.type) {
        case "ADD_RESERVE":
            return {
                status: true,
                status_add: action.status_add,
                message: action.message,
                data: action.data
            }
        case "RESET_RESERVE":
            return {
                status: false,
                status_add: false,
                message: "",
                data: []
            }
        default :
            return state;
    }
}