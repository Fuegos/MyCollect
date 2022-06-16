import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const nameYup = Yup.string()
    .required("Your name is required")
const emailYup = Yup.string()
    .required("Your email is required")
    .email("Email is invalid")
const passwordYup = Yup.string()
    .required("Your password is required")
    .min(3, "Password must be at least 3 characters")

export const signUpYupResolver = yupResolver(
    Yup.object().shape({ 
        name: nameYup,
        email: emailYup,
        password: passwordYup
    })
)

export const signInYupResolver = yupResolver(
    Yup.object().shape({ 
        email: emailYup,
        password: passwordYup
    })
)