import {combineReducers} from 'redux'
import {alertReducer} from './alertReducer'
import {authReducer} from './authReducer'
import {profileReducer} from './profileReducer'

export default combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    userProfile: profileReducer
})