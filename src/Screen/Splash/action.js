import Api from "../../Utils/Api";
import {LIST_MESSAGE} from "../../Utils/Constant";

export function actGetSetting() {
    return dispatch => {
        Api._POST('setting/setting')
            .then((response) => {
                dispatch({
                    type: 'SETTING',
                    status_get: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
            }).catch((err) => {
            dispatch({
                type: 'SETTING',
                status_get: false,
                message: err.message,
                data: []
            })
        })
    }
}

export function actGetMessage(params) {
    return dispatch => {
        Api._POST('message/get_messages',params)
            .then((response)=>{
                dispatch({
                    type :LIST_MESSAGE,
                    data:response.data.data,
                    kode:response.data.kode,
                    message:response.data.message,
                    status_get : response.data.status
                })
                console.log(response)
            }).catch((err)=>{
                console.log(err)
        })
    }
}