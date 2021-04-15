import React, { Fragment, useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {setAlert} from '../../store/actions/alertAction'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../../store/actions/authAction'

const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')


    const auth = useSelector(state => state.auth)
    const {isAuthenticated} = auth;
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password2: ''
    // })


    //const { name, email, password, password2 } = formData;

    //const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/dashboard')
        }
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        if(password !== password2) {
            dispatch(setAlert('Password do not match', 'danger'))
        } else {
            dispatch(register({ name, email, password }))
        }
    }


    return (
        <Fragment>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'><i className="fas fa-user"></i>Create Your Account</p>
            <form className='form' onSubmit={submitHandler}>
                <div className='form-group'>
                    <input 
                    type="text" 
                    name="name" 
                    placeholder='Name' 
                    value={name}  
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input 
                    type="email" 
                    placeholder='Email Address' 
                    name='email' 
                    value={email}  
                    onChange={e => setEmail(e.target.value)}
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use a Gravatr email
                    </small>
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
                <div className='form-group'>
                    <input 
                    type="password" 
                    name="password2" 
                    placeholder='Confirm Password' 
                    minLength='6' 
                    value={password2}  
                    onChange={e => setPassword2(e.target.value)}
                    />
                </div>
                <input 
                type="submit" 
                className='btn btn-primary' 
                value='Register'
                />
            </form>
            <p className='my-1'>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

export default Register
