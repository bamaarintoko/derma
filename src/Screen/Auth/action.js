import Api from "../../Utils/Api";

export function actLoginFacebook(params, data) {
    return dispatch => {
        Api._POST('auth/login_with_facebook', params)
            .then((response) => {
                // console.log(data)
                if (response.data.status) {
                    dispatch({
                        type: 'LOGIN',
                        status_get: true,
                        data: {data: data, profile: response.data.result},
                        message: "login facebook sukses"
                    })
                    dispatch({type: 'HOME'})
                }
            }).catch((err) => {
            dispatch({
                type: 'LOGIN',
                status_get: false,
                data: [],
                message: "login facebook sukses"
            })
            // dispatch({type: 'HOME'})
        })
    }
}

export function actRegister(params) {
    console.log(params)
    return dispatch => {
        Api._POST('auth/register', params)
            .then((response) => {
                dispatch({
                    type: "REGISTER",
                    status_add: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
                console.log(response)
            }).catch(err => {
            dispatch({
                type: "REGISTER",
                status_add: false,
                message: "",
                data: []
            })
            console.log(err)

        })
    }

}