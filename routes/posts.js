const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post')
const User = require('../models/User')
const Profile = require('../models/Profile')

// Post api/posts, Private
router.post('/', [auth, [
    body('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        })
        // const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

    
})


// Get api/posts, Private
// Get all posts
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// Get api/posts/:id, Private
// Get posts by id
router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// Delete api/posts/:id, Private
// Delete post by id
router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' })
        }

        await post.remove()
        res.json({ message: 'Post removed' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// Put api/posts/like/:id, Private
// Like a post
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // check if post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ message: 'Post already liked' })
        }
        post.likes.unshift({ user: req.user.id })

        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// Put api/posts/unlike/:id, Private
// Unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // check if post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ message: 'Post has not been liked' })
        }
        // remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


// Post api/posts/comment/:id, Private
// Comment on post
router.post('/comment/:id', [auth, [
    body('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        }

        post.comments.unshift(newComment)
        // const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

    
})


// Delete api/posts/comment/:id/:comment_id, Private
// Delete comment by id
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        // Make sure comment exist
        if(!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' })
        }
        // find index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        
        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;