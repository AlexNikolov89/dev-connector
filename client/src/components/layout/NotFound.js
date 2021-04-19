import React, {Fragment} from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className='x-lare text-primary'>
                <i className="fas fa-exclamation-triangle"></i> Page not Found
            </h1>
            <p className='large'>Sorry, This page not exist!!</p>
        </Fragment>
    )
}

export default NotFound
