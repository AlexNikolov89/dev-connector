const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')


// Get api/auth, Public
router.get('/',auth, async (req, res) => {
    try {
       const user = await User.findById(req.user.id).select('-password')
       res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// POST, Login User
// api/auth, Authenticated user and get token, Public
router.post('/', [
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password} = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email })

        if(!user) {
           return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' }) 
        }

        

        // return jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: '7d' },
            (err, token) => {
                if(err) throw new err;
                res.json({ token })
            }
        )

        //res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
    
})

module.exports = router;