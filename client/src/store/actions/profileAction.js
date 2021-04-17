import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, GET_REPOS, NO_REPOS} from './types'
import {setAlert} from './alertAction'
import axios from 'axios'


// get current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/profile/me');
        //console.log("data", data)

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

// get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try {
        const {data} = await axios.get('/api/profile');
        //console.log("data", data)

        dispatch({
            type: GET_PROFILES,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// get profile by id
export const getProfileById = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/profile/user/${id}`);
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

// github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/profile/github/${username}`);
        //console.log("data", data)

        dispatch({
            type: GET_REPOS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NO_REPOS,
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

        const {data} = await axios.post('/api/profile', formData, config)
        console.log("DATA", data)

        dispatch({
            type: GET_PROFILE,
            payload: data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        // if (!edit) {
        //     history.push('/dashboard')
        // }
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// add experience
// TODO - 500 error
export const addExperience = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/profile/experience', formData, config)
        console.log("DATA", data)

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        dispatch(setAlert('Experience Added', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/profile/education', formData, config)
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

// Delete experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })

        dispatch(setAlert('ExperienceRemoved', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// Delete education
export const deleteEducation = (id) => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })

        dispatch(setAlert('Education Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// delete account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can not be undone!')){
    try {
        const {data} = await axios.delete(`/api/profile`);

        dispatch({
            type: CLEAR_PROFILE
        })

        dispatch({
            type: ACCOUNT_DELETED
        })

        dispatch(setAlert('Your account has been permanently deleted'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}
}
