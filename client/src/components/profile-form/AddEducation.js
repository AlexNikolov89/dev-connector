import React, { Fragment, useState } from 'react'
import { useDispatch} from 'react-redux'
import { addEducation } from '../../store/actions/profileAction'
import {Link, useHistory} from 'react-router-dom'

const AddEducation = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [fieldofstudy, setFieldofstudy] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [current, setCurrent] = useState('')
    const [description, setDescription] = useState('')

    const [toDateDisabled, setDateDisabled] = useState(false)


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(
          addEducation({
                school, 
                degree, 
                fieldofstudy,
                fromDate,
                toDate,
                current,
                description
            }))
            history.push('/dashboard')
    }


    
    return (
        <Fragment>
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any school
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={e => setSchool(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree"
              name="degree"
              value={degree}
              onChange={e => setDegree(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Field of study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={e => setFieldofstudy(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={fromDate}
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
              Current
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
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

export default AddEducation

