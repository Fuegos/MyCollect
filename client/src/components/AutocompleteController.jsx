import React from "react"
import { Autocomplete, TextField, FormHelperText } from '@mui/material'
import { Controller } from "react-hook-form"

export default function AutocompleteController({ 
    name, 
    control, 
    defaultValue = null, 
    filterSelectedOptions = false,
    multiple = false,
    freeSolo = false,
    options, 
    getOptionLabel, 
    error,
    renderTags,
    isOptionEqualToValue,
    limitTags,
    ...rest
}) {
    return(
        <React.Fragment>
            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => 
                    <Autocomplete
                        {...field}
                        filterSelectedOptions={filterSelectedOptions}
                        multiple={multiple}
                        freeSolo={freeSolo}
                        onChange={(e, data) => field.onChange(data)}
                        aria-describedby={`error-${name}`}
                        options={options}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        limitTags={limitTags}
                        renderTags={renderTags}
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