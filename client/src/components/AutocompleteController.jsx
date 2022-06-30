import React from "react"
import { Autocomplete, TextField, FormHelperText } from '@mui/material'
import { Controller } from "react-hook-form"

export default function AutocompleteController({ name, control, defaultValue = null, options, getOptionLabel, error, ...rest}) {
    return(
        <React.Fragment>
            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => 
                    <Autocomplete
                        {...field}
                        onChange={(_, data) => field.onChange(data)}
                        aria-describedby={`error-${name}`}
                        options={options}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => 
                            <TextField 
                                {...params}
                                {...rest}
                                error={!!error}
                            />
                        }
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