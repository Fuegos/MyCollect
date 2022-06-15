import { Grid, TextField, Button, FormHelperText, LinearProgress } from '@mui/material'
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { registrationUserAsync, clearErrorMessage } from '../redux/authUserSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import ErrorAlert from '../../errors/ErrorAlert'

export default function Registration() {

    const validationSchema = Yup.object().shape({ 
        name: Yup.string().required("Your name is required"),
        email: Yup.string()
            .required("Your email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Your password is required")
            .min(3, "Password must be at least 3 characters")
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const dispatch = useDispatch()

    const defaultValues = {
        name: "",
        email: "",
        password: ""
    }

    const isProccess = useSelector(state => state.authUser.isProccess)

    const errorMessage = useSelector(state => state.authUser.errorMessage)

    const submitRegistration = data => {
        dispatch(registrationUserAsync(data))
    }

    return (
        <form onSubmit={handleSubmit(submitRegistration)} noValidate>
            <Grid container rowSpacing={1}>
                <ErrorAlert
                    errorMessage={errorMessage}  
                    clearErrorMessage={clearErrorMessage}
                />
                <Grid item xs={12}>
                    <Controller 
                        name="name"
                        control={control}
                        defaultValue={defaultValues.name}
                        render={({field}) => 
                            <TextField 
                                {...field}
                                label="Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                aria-describedby="errorName"
                            />
                        }
                    />
                    {errors.name && <FormHelperText id="errorName">{errors.name.message}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                    <Controller 
                        name="email"
                        control={control}
                        defaultValue={defaultValues.email}
                        render={({field}) => 
                            <TextField 
                                {...field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                aria-describedby="errorEmail"
                            />
                        }
                    />
                    {errors.email && <FormHelperText id="errorEmail">{errors.email.message}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                    <Controller 
                        name="password"
                        control={control}
                        defaultValue={defaultValues.password}
                        render={({field}) => 
                            <TextField 
                                {...field}
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                error={!!errors.password}
                                aria-describedby="errorPassword"
                            />
                        }
                    />
                    {errors.password && <FormHelperText id="errorPassword">{errors.password.message}</FormHelperText>}
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
        </form>
    )
}