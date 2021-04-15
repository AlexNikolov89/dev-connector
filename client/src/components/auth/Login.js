import React, { Fragment, useEffect, useState } from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import { login } from '../../store/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('ale5@email.com')
    const [password, setPassword] = useState('123456')

    const auth = useSelector(state => state.auth)
    const {isAuthenticated} = auth;

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login({email, password}))
       
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }    


    return (
        <Fragment>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'><i className="fas fa-user"></i>Signin to Your Account</p>
            <form className='form' onSubmit={handleSubmit}>
                
                <div className='form-group'>
                    <input 
                    type="email" 
                    placeholder='Email Address' 
                    name='email' 
                    value={email}  
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    minLength='6' 
                    value={password}  
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
                <input 
                type="submit" 
                className='btn btn-primary' 
                value='Login'
                />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login
