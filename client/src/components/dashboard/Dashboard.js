import React, { Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../../store/actions/profileAction'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


const Dashboard = () => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const {user} = auth;

    const userProfile = useSelector(state => state.userProfile)
    const {profile, loading, error} = userProfile
    //console.log("🚀 ~ file: Dashboard.js ~ line 15 ~ Dashboard ~ userProfile", userProfile)

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])

    return (
        loading && profile === null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
            <i className="fas fa-user"></i>{' '}Welcome {user && user.name}
            </p>
            {profile ? 
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className='my-2'>
                        <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                            <i className="fas fa-user-minus"></i> Delete my Account
                        </button>
                    </div>
                </Fragment> 
                : 
                <Fragment>
                    <p>You have not yet setup a profile. Please add some Info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                </Fragment>}
        </Fragment>
    )
}

export default Dashboard
