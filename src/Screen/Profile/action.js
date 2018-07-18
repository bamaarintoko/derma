import Api from "../../Utils/Api";

export function actGetListReserve(params) {
    return dispatch => {
        Api._POST('reserve/list_reserve_by_user', params)
            .then((response) => {
                dispatch({
                    type: "RESERVE_USER",
                    status_get: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
                console.log(response)
            }).catch((err) => {
            dispatch({
                type: "RESET_RESERVE_USER",
                status_get: false,
                message: err.message,
                data: []
            })
            console.log(err.message)
        })
    }
}