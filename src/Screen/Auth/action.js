import Api from "../../Utils/Api";

export function actLoginFacebook(params,data) {
    return dispatch => {
        Api._POST('auth/login_with_facebook', params)
            .then((response) => {
                // console.log(data)
                if (response.data.status) {
                    dispatch({
                        type: 'LOGIN',
                        status_get: true,
                        data: data,
                        message: "login facebook sukses"
                    })
                    dispatch({type: 'HOME'})
                }
            })
    }
}
