import { Grid, Button, LinearProgress, Box, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserAsync, clearErrorMessage } from '../redux/authUserSlice'
import ErrorAlert from '../../errors/ErrorAlert'
import { signUpYupResolver } from '../validation/authUserValidation'
import TextFieldController from '../../components/TextFieldController'

export default function SignUp() {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: signUpYupResolver
    })

    const dispatch = useDispatch()

    const defaultValues = {
        name: "",
        email: "",
        password: ""
    }

    const isProccess = useSelector(state => state.authUser.isProccess)

    const errorMessage = useSelector(state => state.authUser.errorMessage)

    const signUp = data => {
        dispatch(signUpUserAsync(data))
    }

    return (
        <form onSubmit={handleSubmit(signUp)} noValidate>
            <Box mx={10} mt={5}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom component="div">
                            New User
                        </Typography>
                    </Grid>
                    <ErrorAlert
                        errorMessage={errorMessage}  
                        clearErrorMessage={clearErrorMessage}
                    />
                    <Grid item xs={12}>
                        <TextFieldController 
                            name="name"
                            control={control}
                            defaultValue={defaultValues.name}
                            error={errors.name}
                            label="Name"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldController 
                            name="email"
                            control={control}
                            defaultValue={defaultValues.email}
                            error={errors.email}
                            label="Email"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldController 
                            name="password"
                            control={control}
                            defaultValue={defaultValues.password}
                            error={errors.password}
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            autoComplete="on"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isProccess ? 
                            <LinearProgress /> :
                            <Button 
                                type="submit"
                                variant="contained"
                            >
                                Confirm
                            </Button>  
                        }
                    </Grid>
                </Grid>
            </Box>
        </form>
    )
}