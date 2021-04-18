import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {useSelector, useDispatch} from 'react-redux'
import { addLike, removeLike, deletePost } from '../../store/actions/postAction'


const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date }, showActions }) => {
    
    const auth = useSelector(state => state.auth)
    const {isAuthenticated} = auth;

    //const [showActions, setShowAction] = useState(true)

    const dispatch = useDispatch()

    return (
        <div className="post bg-white p-1 my-1">
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
           <p className="post-date">
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {!showActions && <Fragment>
            <button type="button" className="btn btn-light" onClick={e => dispatch(addLike(_id))}>
            <i className="fas fa-thumbs-up"></i>{' '}
            <span>{likes.length > 0 && (
                <span>{likes.length}</span>
            )}</span>
          </button>
          <button type="button" className="btn btn-light" onClick={e => dispatch(removeLike(_id))}>
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
            )} 
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button  
            onClick={() => dispatch(deletePost(_id))}    
            type="button"
            class="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
          )}
            </Fragment>}
         
        </div>
      </div> 
    )
}

export default PostItem
