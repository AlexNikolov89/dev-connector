import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-form/CreateProfile'
import EditProfile from '../profile-form/EditProfile'
import AddExperience from '../profile-form/AddExperience'
import AddEducation from '../profile-form/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'
import Register from '../auth/Register'
import Login from '../auth/Login'
import {Alert} from '../layout/Alert'

const Routes = () => {
    return (
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create-profile' component={CreateProfile} />
            <Route exact path='/edit-profile' component={EditProfile} />
            <Route exact path='/add-experience' component={AddExperience} />
            <Route exact path='/add-education' component={AddEducation} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/posts' component={Posts} />
            <Route exact path='/post/:id' component={Post} />
            <Route component={NotFound} />
          </Switch>
        </section>
    )
}

export default Routes
