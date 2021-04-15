import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    SET_ALERT,
    REGISTER_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import axios from 'axios'
import {setAlert} from './alertAction'
import setAuthToken from '../../utils/setAuthToken'

// Loadd user auth
export const authUser = () => async (dispatch) => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// register user
export const register = ({ name, email, password }) => async dispatch => {
    dispatch({
        type: REGISTER_REQUEST
    })

    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    //const body = JSON.stringify({ name, email, password })

    try {
        const {data} = await axios.post('/api/users', {name, email, password}, config)
        //console.log("DATA", data)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
        dispatch(authUser())
    } catch (err) {
        // const errors = err.response;
        // if(errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        // }
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.message
        })
    }
}


// loin user
export const login = ({ email, password }) => async dispatch => {

    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const body = JSON.stringify({ email, password })

    try {
        const {data} = await axios.post('/api/auth', body, config)
        //console.log("DATA", data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        dispatch(authUser())
    } catch (err) {
        // const errors = err.response;
        // if(errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        // }
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message
        })
    }
}


// logout
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT
    })
}