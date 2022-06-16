import { Grid, IconButton, Alert, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'


export default function ErrorAlert(props) {
    const dispatch = useDispatch()

    const isError = props.errorType !== ""
    const errorType = props.errorType

    return(
        isError &&
        <Grid item xs={12}>
            <Collapse in={isError}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(props.clearErrorType())
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <FormattedMessage
                        id={errorType}
                        defaultMessage="Wrong"
                    />
                </Alert>
            </Collapse>
        </Grid>
    )
}