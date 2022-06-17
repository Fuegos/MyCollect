import { FormControlLabel, Switch } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { choseThemeMode } from '../redux/themeModeSlice'
import { FormattedMessage } from 'react-intl'

export default function SelectorThemeMode() {
    const { control, watch } = useForm()
    const dispatch = useDispatch()
    const defaultIsDark = useSelector(state => state.themeMode.isDark)

    useEffect(() => {
        const subscription = watch(value => dispatch(choseThemeMode(value)))
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <FormControlLabel 
            control={
                <Controller 
                    name='isDark'
                    control={control}
                    defaultValue={defaultIsDark}
                    render={({field}) => 
                        <Switch {...field} checked={field.value}  color="default" />  
                    }
                />
            } 
            label={
                <FormattedMessage
                    id="nav.theme"
                    defaultMessage="Dark mode"
                />
            } 
        />
    )
}