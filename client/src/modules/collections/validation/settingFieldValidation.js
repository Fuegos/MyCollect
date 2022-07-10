import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage } from 'react-intl'

const labelYup = Yup.string()
    .required(
        <FormattedMessage
            id="setting.field.validation.required.label"
            defaultMessage="Wrong"
        />
    )
const typeFieldYup = Yup.object()
    .typeError(
        <FormattedMessage
            id="setting.field.validation.required.type.field"
            defaultMessage="Wrong"
        />
    )
    

export const settingFieldYupResolver = yupResolver(
    Yup.object().shape({
        settingFields: Yup.array().of(
            Yup.object().shape({ 
                label: labelYup,
                typeField: typeFieldYup
            })
        )
    })
    
)