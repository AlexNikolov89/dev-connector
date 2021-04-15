const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const request = require('request')
const config = require('config')


// Get api/profile/me, Private
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
      
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// POST api/profile, Private
// Create or Update User Profile
router.post('/', [auth, [
    body('status', 'Status is required').notEmpty(),
    body('skills', 'Skills are required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body)
    const {company, website, location, bio, status, githubusername, 
            skills, youtube, facebook, twitter, instagram, linkedin} = req.body;
    
    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(', ').map(skill => skill.trim())
    }

    // build social obj
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    //console.log(profileFields.social.twitter)
    
    try {
        let profile = await Profile.findOne({ user: req.body.id })
        
        if(profile) {
            // update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, 
            { $set: profileFields }, 
            { new: true })

            return res.json(profile)
        }

       // create new
       profile = new Profile(profileFields)

       await profile.save()
       res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// Get api/profile, Public
// Get all profiles
router.get('/', async (req, res) => {
    try {
       const profiles = await Profile.find().populate('user', ['name', 'avatar'])
       res.json(profiles) 
    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server error') 
    }
})


// Get api/profile/user/:user_id, Public
// Get profile by user id
router.get('/user/:user_id', async (req, res) => {
    try {
       const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
       
       if(!profile) {
           return res.status(404).json({ message: 'Profile not found' })
       }
       
       res.json(profile) 
    } catch (err) {
       console.error(err.message)
       if(err.kind == 'ObjectId') {
        return res.status(404).json({ message: 'Profile not found' })
       }
       res.status(500).send('Server error') 
    }
})


// Delete api/profile, Private
// Delete profile, user and Posts
router.delete('/', auth, async (req, res) => {
    try {
        // todo - remove posts

        // Remove Profile
       await Profile.findOneAndRemove({ user: req.user.id })

        // Remove user
       await User.findOneAndRemove({ _id: req.user.id })

       res.json({ message: 'User deleted' })
    } catch (err) {
       console.error(err.message)
       if(err.kind == 'ObjectId') {
        return res.status(404).json({ message: 'Profile not found' })
       }
       res.status(500).send('Server error') 
    }
})


// Put api/profile/experience, Private
// Add  profile experience,
router.put('/experience', [auth, [
    body('title', 'Title is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {title, company, location, from, to, current, description} = req.body;

    // todo - update experince
    // create obj 
    const newExp = { title, company, location, from, to, current, description }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error') 
    }
})


// Delete api/profile/experience/:exp_id, Private
// Delete  profile experience,
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
   
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
   
      profile.experience.splice(removeIndex, 1);
   
      await profile.save();
   
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// Put api/profile/education, Private
// Add  profile education,
router.put('/education', [auth, [
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {school, degree, fieldofstudy, from, to, current, description} = req.body;

    // todo - update education
    // create obj 
    const newEdu = { school, degree, fieldofstudy, from, to, current, description }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error') 
    }
})


// Delete api/profile/education/:edu_id, Private
// Delete  profile education,
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
   
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
   
      profile.education.splice(removeIndex, 1);
   
      await profile.save();
   
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// Get api/profile/github/:username, Public
// Get  user repos from Github,
router.get('/github/:username', (req, res) => {
    try {
       const options = {
           uri: `https://api.github.com/users/${req.params.username}/repos?
           per_page=5&sort=created:asc&client_id=${config.get('githubCleintId')}
           &client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
       } 

       request(options, (error, respinse, body) => {
           if(error) console.error(error)

           if(res.statusCode !== 200) {
               res.status(404).json({ message: 'No Github profile found' })
           }
           res.json(JSON.parse(body))
       })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;