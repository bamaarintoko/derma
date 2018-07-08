import { combineReducers } from 'redux'
import { nav } from './dataReducers'
import { redGetColor } from './colorReducers'
const rootReducer = combineReducers({
    redGetColor:redGetColor,
    nav: nav
})

export default rootReducer