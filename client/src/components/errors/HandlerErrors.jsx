import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrorType } from '../../modules/authUsers/redux/authUsersSlice'
import ErrorSnackbar from './ErrorSnackbar'

export default function HandlerErrors() {
    const errors = useSelector(state => state.errors.errors)

    return (
        <React.Fragment>
            {errors.map(e => (
                <ErrorSnackbar key={e._id} error={e} />
            ))}
        </React.Fragment>
    )
}