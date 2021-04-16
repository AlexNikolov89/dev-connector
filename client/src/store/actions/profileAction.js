import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types'
import {setAlert} from './alertAction'
import axios from 'axios'


// get current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/profile/me');
        console.log("data", data)

        dispatch({
            type: GET_PROFILE,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// create or update profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/pofile', formData, config)
        console.log("DATA", data)

        dispatch({
            type: GET_PROFILE,
            payload: data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        if (!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/pofile/experience', formData, config)
        console.log("DATA", data)

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// add education
export const addEducatio = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/pofile/education', formData, config)
        console.log("DATA", data)

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}