import { Grid, IconButton, Alert, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'


export default function ErrorAlert(props) {
    const dispatch = useDispatch()

    const isError = props.errorMessage !== ""
    const message = props.errorMessage

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
                                dispatch(props.clearErrorMessage())
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {message}
                </Alert>
            </Collapse>
        </Grid>
    )
}