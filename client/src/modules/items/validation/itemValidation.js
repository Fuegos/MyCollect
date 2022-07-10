import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage } from 'react-intl'

const nameYup = Yup.string()
    .required(
        <FormattedMessage
            id="item.validation.required.name"
            defaultMessage="Wrong"
        />
    )
const tagsYup = Yup.array()
    .min(
        1,
        <FormattedMessage
            id="item.validation.min.tags"
            defaultMessage="Wrong"
        />
    )
    

export const itemYupResolver = yupResolver(
    Yup.object().shape({ 
        name: nameYup,
        tags: tagsYup
    })
)