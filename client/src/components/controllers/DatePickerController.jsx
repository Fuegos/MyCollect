import React from "react"
import { 
    TextField
} from '@mui/material'
import { Controller } from "react-hook-form"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSelector } from "react-redux"
import { langLocaleDates } from "../langs/data/dataLangs";

export default function DatePickerController({ name, control, defaultValue = null, label, ...rest}) {
    const lang = useSelector(state => state.langs.lang)

    return(
        <Controller 
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => 
                <LocalizationProvider 
                    dateAdapter={AdapterDateFns} 
                    adapterLocale={langLocaleDates[lang]}
                >
                    <DatePicker
                        {...field}
                        label={label}
                        renderInput={params => 
                            <TextField 
                                {...params}
                                {...rest} 
                            />
                        }
                    />
                </LocalizationProvider>
            }
        />
    )
}