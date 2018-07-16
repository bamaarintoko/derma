import {combineReducers} from 'redux'
import {nav} from './dataReducers'
import {redGetColor} from './colorReducers'
import {redAuth, redRegister} from './authReducers'
import {redAddReserve} from './reserveReducers'

const rootReducer = combineReducers({
    redGetColor: redGetColor,
    redAuth: redAuth,
    redRegister: redRegister,
    redAddReserve: redAddReserve,
    nav: nav
})

export default rootReducer