import { initialGet } from "../Utils/initialState";

export function redAuth(state = initialGet, action) {
    // console.log(action.type)
    switch (action.type){
        case "LOGIN":
            return {
                status          : true,
                status_get      : action.status_get,
                data            : action.data,
                message         : action.message
            }
        case "LOGOUT":
            return {
                status          : false,
                status_get      : false,
                data            : [],
                message         : ""
            }
        case "LOGIN_RESET":{
            return {
                status          : false,
                status_get      : false,
                data            : [],
                message         : ""
            }
        }
        default:
            return state;
    }
}