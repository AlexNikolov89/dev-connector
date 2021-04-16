import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, LOGOUT, UPDATE_PROFILE} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}