import React, {useState} from 'react'
import { addPost } from '../../store/actions/postAction'
import {useDispatch} from 'react-redux'

const PostForm = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost({text}))
        setText('')
    }

    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
      </div>
    )
}

export default PostForm
