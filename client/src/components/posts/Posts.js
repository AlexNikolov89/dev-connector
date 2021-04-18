import React, {Fragment, useEffect} from 'react'
import { getPosts } from '../../store/actions/postAction'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = () => {
    const dispatch = useDispatch()
    const userPosts = useSelector(state => state.userPosts)
    const {posts, loading} = userPosts;

    useEffect(() => {
        dispatch(getPosts())
    }, [getPosts])

    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome to the community
                    </p>
                    <PostForm />
                    <div className="posts">
                        {posts.map(post => {
                            return <PostItem key={post._id} post={post} />
                        })}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Posts
