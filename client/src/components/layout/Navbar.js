import React, { Fragment } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { logout } from '../../store/actions/authAction'
import {useSelector, useDispatch} from 'react-redux'


const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const {isAuthenticated, loading} = auth;

    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }
    return (
        <nav className='navbar bg-dark'>
            <h1><Link to="/"><i className='fas fa-code'></i>DevConnector</Link></h1>
            {isAuthenticated ? (
                <ul>
                    <li><Link to='/profiles'>Developers</Link></li>
                    <li><Link to='/dashboard'>
                    <i className="fas fa-user"></i>{' '}
                    <span className='hide-sm'>Dashboard</span></Link></li>

                    <li><Link onClick={handleLogout} to="/login">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span></Link></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to="/developers">Developers</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar
