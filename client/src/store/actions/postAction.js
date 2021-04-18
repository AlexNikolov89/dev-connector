import {GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from './types'
import axios from 'axios'
import {setAlert} from './alertAction'

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// Add Like
export const addLike = (id) => async dispatch => {
    try {
        const {data} = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: data}
        })
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// Remove Like
export const removeLike = (id) => async dispatch => {
    try {
        const {data} = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: data}
        })
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// Delete Post
export const deletePost = (id) => async dispatch => {
    try {
        const {data} = await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })
      dispatch(setAlert('Post Removed', 'success'))  
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// Add Post
export const addPost = (formData) => async dispatch => {
    try {
        
        const {data} = await axios.post(`/api/posts`, formData)
        console.log("CREATE POST", data)

        dispatch({
            type: ADD_POST,
            payload: data
        })
      dispatch(setAlert('Post Created', 'success'))  
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// Get post
export const getPost = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}


// Add Comment
export const addComment = (postId, formData) => async dispatch => {
    try {
        
        const {data} = await axios.post(`/api/posts/comment/${postId}`, formData)

        dispatch({
            type: ADD_COMMENT,
            payload: data
        })
      dispatch(setAlert('Comment Created', 'success'))  
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        
        await axios.post(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
      dispatch(setAlert('Comment Removed', 'success'))  
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}