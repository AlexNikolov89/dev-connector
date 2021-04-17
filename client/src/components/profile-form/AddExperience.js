import React, { Fragment, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addExperience } from '../../store/actions/profileAction'
import {Link, useHistory} from 'react-router-dom'

const AddExperience = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [from, setFromDate] = useState('')
    const [to, setToDate] = useState('')
    const [current, setCurrent] = useState('')
    const [description, setDescription] = useState('')

    const [toDateDisabled, setDateDisabled] = useState(false)


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(
            addExperience({
                title, 
                company, 
                location, 
                from, 
                to, 
                current, 
                description
            }))
            history.push('/dashboard')
    }


    
    return (
        <Fragment>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from}
            onChange={e => setFromDate(e.target.value)} />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                onChange={e => setCurrent(e.target.value)}
                // TODO DISABLE BTN
              />{' '}
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={e => setToDate(e.target.value)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
        </Fragment>
    )
}

export default AddExperience