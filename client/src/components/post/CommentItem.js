import React, {Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteComment } from '../../store/actions/postAction'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'


// TODO Delete a comment

const CommentItem = ({ postId, comment: { _id, text, avatar, name, user, date } }) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const {isAuthenticated, loading} = auth;

    const handleDelete = () => {
        dispatch(deleteComment(postId, _id))
    }
    
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt={name}
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{text}</p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={handleDelete} type='button' className='btn btn-danger'>
                   <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
}

export default CommentItem
