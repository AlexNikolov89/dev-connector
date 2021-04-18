import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { addComment } from '../../store/actions/postAction'


const CommentForm = ({postId}) => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(postId, {text}))
        setText('')
    }

    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Leave a comment</h3>
            </div>
            <form class="form my-1" onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Create a coment"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
      </div>
    )
}

export default CommentForm
