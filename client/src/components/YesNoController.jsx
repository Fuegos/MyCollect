import React from "react"
import { 
    Typography, 
    FormControlLabel, 
    Switch,
    Stack 
} from '@mui/material'
import { Controller } from "react-hook-form"
import { FormattedMessage } from 'react-intl'

export default function YesNoController({ name, control, defaultValue = false, label, ...rest}) {

    return(
        <Stack
            direction='row'
            spacing={2}
            justifyContent='flex-start'
            alignItems="center"
        >
            <Typography variant="subtitle1" >
                {label}
            </Typography>
            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => 
                    <FormControlLabel 
                        {...field}
                        control={
                            <Switch 
                                {...rest}
                            />
                        } 
                        label={
                            field.value ? 
                                <FormattedMessage
                                    id="component.yesno.yes"
                                    defaultMessage="Yes"
                                /> : 
                                <FormattedMessage
                                    id="component.yesno.no"
                                    defaultMessage="No"
                                />
                        } 
                    />
                }
            />
        </Stack>
    )
}