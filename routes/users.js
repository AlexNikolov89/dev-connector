const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// POST, register User
// api/users, Public
router.post('/', [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Pleae eneter Password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email })

        if(user) {
           return res.status(400).json({ message: 'User already exists' })
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User ({
            name, email, avatar, password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

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