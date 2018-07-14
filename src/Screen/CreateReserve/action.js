import axios from "axios";
import {host} from "../../Utils/Api";

export function actAddReserve(params) {
    return dispatch => {
        const data = new FormData();
        data.append('par_title', params.par_title)
        data.append('par_kategory', params.par_kategory)
        data.append('par_description', params.par_description)
        data.append('par_note', params.par_note)
        data.append('par_reserve_name', params.par_reserve_name)
        data.append('par_reserve_cp', params.par_reserve_cp)
        data.append('par_address', params.par_address)
        data.append('par_province', params.par_province)
        data.append('par_district', params.par_district)
        data.append('par_sub_district', params.par_sub_district)
        data.append('par_end_date', params.par_end_date)
        data.append('par_create_by', params.par_create_by)

        axios.post(host + 'reserve/add_reserve', data)
            .then((response) => {
                console.log(response)
            }).catch(error => {
            console.log(error)
        })
    }
}