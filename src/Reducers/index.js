import {combineReducers} from 'redux'
import {nav} from './dataReducers'
import {redGetColor} from './colorReducers'
import {redAuth, redRegister} from './authReducers'
import {redAddReserve, redGetListReserve, redGetListReserveUser} from './reserveReducers'

const rootReducer = combineReducers({
    redGetColor: redGetColor,
    redAuth: redAuth,
    redRegister: redRegister,
    redAddReserve: redAddReserve,
    redGetListReserve: redGetListReserve,
    redGetListReserveUser: redGetListReserveUser,
    nav: nav
})

export default rootReducer