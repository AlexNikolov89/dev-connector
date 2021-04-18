import React, { Fragment, useEffect } from 'react'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import {Alert} from './components/layout/Alert'
import {Provider} from 'react-redux'
import store from './store/store'
import { authUser } from './store/actions/authAction'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-form/CreateProfile'
import EditProfile from './components/profile-form/EditProfile'
import AddExperience from './components/profile-form/AddExperience'
import AddEducation from './components/profile-form/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(authUser())
  }, [])

  
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
     
        <Route exact path='/' component={Landing} />
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
          </Switch>
        </section>
    </Router>
    </Provider>
  )
}

export default App
