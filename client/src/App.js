import React, { Fragment, useEffect } from 'react'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store'
import { authUser } from './store/actions/authAction'
import setAuthToken from './utils/setAuthToken'
import Routes from './components/routing/Routes'



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
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
    </Router>
    </Provider>
  )
}

export default App
