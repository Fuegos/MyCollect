import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage } from 'react-intl'

const nameYup = Yup.string()
    .required(
        <FormattedMessage
            id="collections.validation.required.name"
            defaultMessage="Wrong"
        />
    )
const descriptionYup = Yup.string()
    .required(
        <FormattedMessage
            id="collections.validation.required.description"
            defaultMessage="Wrong"
        />
    )
const themeYup = Yup.object()
    .typeError(
        <FormattedMessage
            id="collections.validation.required.theme"
            defaultMessage="Wrong"
        />
    )
    

export const collectionYupResolver = yupResolver(
    Yup.object().shape({ 
        name: nameYup,
        description: descriptionYup,
        theme: themeYup
    })
)