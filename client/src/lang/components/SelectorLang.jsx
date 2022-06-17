import { MenuItem, Select } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Flag from 'react-world-flags'
import { langCodes } from '../data/dataLangs'
import { choseLanguage } from '../redux/langSlice'


export default function SelectorLand() {
    const { control, watch } = useForm()
    const dispatch = useDispatch()
    const defaultLang = useSelector(state => state.lang.lang)

    useEffect(() => {
        const subscription = watch(value => dispatch(choseLanguage(value)))
        return () => subscription.unsubscribe()
    }, [watch])


    return (
        <Controller 
            name='lang'
            control={control}
            defaultValue={defaultLang}
            render={({field}) => 
                <Select
                    displayEmpty
                    {...field}
                >
                    {langCodes.map(
                        l => <MenuItem 
                            key={l.value} 
                            value={l.value}
                        >
                            <Flag 
                                code={l.code} 
                                width='30'
                            />
                        </MenuItem>
                    )}
                </Select>
            }
        /> 
    )
}