import React from "react"
import { TextField, FormHelperText } from '@mui/material'
import { Controller } from "react-hook-form"

export default function TextFieldController({ name, control, defaultValue = "", error, ...rest}) {

    return(
        <React.Fragment>
            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => 
                    <TextField 
                        {...field}
                        {...rest}
                        error={!!error}
                        aria-describedby={`error-${name}`}
                    />
                }
            />
            {
                error && 
                <FormHelperText id={`error-${name}`}>
                    {error.message}
                </FormHelperText>
            }
        </React.Fragment>
    )
}