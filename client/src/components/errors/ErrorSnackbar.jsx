import { Snackbar } from '@mui/material'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { clearError } from './redux/errorsSlice'
import MuiAlert from '@mui/material/Alert'
import React from 'react'

export default function ErrorSnackbar({ error }) {
    const dispatch = useDispatch()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    })

    return(
        <Snackbar
            open={true}
            autoHideDuration={20000}
            onClose={() => dispatch(clearError(error._id))}
        >
            <Alert 
                onClose={() => dispatch(clearError(error._id))} 
                severity="error" 
                sx={{ width: '100%' }}
            >
                <FormattedMessage
                    id={error.type}
                    defaultMessage="Wrong"
                />
            </Alert>
        </Snackbar>
    )
}