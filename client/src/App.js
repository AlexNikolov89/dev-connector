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
          </Switch>
        </section>
    </Router>
    </Provider>
  )
}

export default App
