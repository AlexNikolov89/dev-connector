import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfileById } from '../../store/actions/profileAction'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({ match }) => {
    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const {profile, loading} = userProfile;
    //console.log("🚀 ~ file: Profile.js ~ line 17 ~ Profile ~ userProfile", userProfile)

    const auth = useSelector(state => state.auth)
    const {isAuthenticated, user} = auth;

    useEffect(() => {
        dispatch(getProfileById(match.params.id))
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                    <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                    {isAuthenticated && loading === false && auth.user._id === profile.user._id && (
                        <Link to='/edit-profile' className='btn btn-dark'>
                            Edit profile
                        </Link>
                    )}

                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>    
                            {profile.experience.length > 0 ? 
                                (
                                    <Fragment>
                                        {profile.experience.map(experience => {
                                            return <ProfileExperience key={experience._id} experience={experience} />
                                        })}
                                    </Fragment>
                                ) : (
                                    <h4>No experience credentials</h4>
                                )}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>    
                            {profile.education.length > 0 ? 
                                (
                                    <Fragment>
                                        {profile.education.map(education => {
                                            return <ProfileEducation key={education._id} education={education} />
                                        })}
                                    </Fragment>
                                ) : (
                                    <h4>No experience credentials</h4>
                                )}
                        </div>

                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default Profile
