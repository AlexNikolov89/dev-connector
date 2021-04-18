import React, { Fragment, useEffect, useState } from 'react'
import { getPost } from '../../store/actions/postAction'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({match}) => {
    const dispatch = useDispatch()
    const [showActions, setShowActions] = useState(true)

    const userPosts = useSelector(state => state.userPosts)
    const {post, loading} = userPosts;

    useEffect(() => {
        dispatch(getPost(match.params.id))
    }, [match, dispatch, getPost])

    return (
        loading || post === null ? <Spinner /> : <Fragment>
            <Link to='/posts' className='btn'>Back to Posts</Link>
            {/** TODO not to show buttons */}
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => {
                    return <CommentItem key={comment._id} comment={comment} postId={post._id} />
                })}
            </div>
        </Fragment>
    )
}

export default Post
