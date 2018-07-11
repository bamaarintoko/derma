import {combineReducers} from 'redux'
import {nav} from './dataReducers'
import {redGetColor} from './colorReducers'
import {redAuth} from './authReducers'

const rootReducer = combineReducers({
    redGetColor: redGetColor,
    redAuth: redAuth,
    nav: nav
})

export default rootReducer