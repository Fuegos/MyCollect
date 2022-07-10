import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage } from 'react-intl'

const nameYup = Yup.string()
    .required(
        <FormattedMessage
            id="autn.sign.validation.required.name"
            defaultMessage="Wrong"
        />
    )
const emailYup = Yup.string()
    .required(
        <FormattedMessage
            id="auth.sign.validation.required.email"
            defaultMessage="Wrong"
        />
    )
    .email(
        <FormattedMessage
            id="auth.sign.validation.valid.email"
            defaultMessage="Wrong"
        />
    )
const passwordYup = Yup.string()
    .required(
        <FormattedMessage
            id="auth.sign.validation.required.password"
            defaultMessage="Wrong"
        />
    )
    .min(
        3, 
        <FormattedMessage
            id="auth.sign.validation.min.password"
            defaultMessage="Wrong"
        />
    )

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