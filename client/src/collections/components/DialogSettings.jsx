import React, { useEffect } from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Box, 
    Stack,
    LinearProgress,
    IconButton
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { FormattedMessage } from 'react-intl'
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, getTypeFieldsAsync, modifySettingFieldsAsync } from '../redux/settingFieldsSlice'
import { settingFieldYupResolver } from '../validation/settingFieldValidation'
import SettingField from './SettingField'


export default function DialogSettings() {
    const dispatch = useDispatch()

    const { 
        handleSubmit, 
        control, 
        formState: { errors }, 
        setValue, 
        clearErrors
    } = useForm({
        resolver: settingFieldYupResolver
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "settingFields"
    })

    const isOpenedDialog = useSelector(state => state.settingFields.isOpenedDialog)
    const isProccess = useSelector(state => state.settingFields.isProccess)
    const settingFields = useSelector(state => state.settingFields.settingFields)
    const typeFields = useSelector(state => state.settingFields.typeFields)
    const collection = useSelector(state => state.settingFields.collection)

    const modifySettingFields = data => {
        dispatch(modifySettingFieldsAsync(data))
    }

    useEffect(() => {
        dispatch(getTypeFieldsAsync())
    }, [])

    useEffect(() => {
        setValue('settingFields', settingFields)
        clearErrors()
    }, [settingFields])

    
    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => dispatch(closeDialog())}
            fullWidth
        >
            <form onSubmit={handleSubmit(modifySettingFields)} noValidate>
                <DialogTitle>
                    <FormattedMessage
                        id="collection.setting.fields.header"
                        defaultMessage="Setting Fields"
                    />
                </DialogTitle>
                <DialogContent>
                    <Box mt={2}>
                        <Stack 
                            direction='column' 
                            spacing={2}
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            {fields.map((f, index) => (
                                <SettingField
                                    key={index}
                                    index={index}
                                    settingField={f} 
                                    remove={remove}
                                    control={control}
                                    errors={errors}
                                    options={typeFields}
                                />
                            ))}
                            <IconButton
                                onClick={
                                    () => append({
                                        typeField: null,
                                        label: "",
                                        collectionRef: collection
                                    })
                                }
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                {
                    isProccess ?
                    <Box sx={{ flex: '1 1 100%' }}>
                        <LinearProgress />
                    </Box> :
                    <Stack direction='row' spacing={2}>
                        <Button
                            onClick={() => dispatch(closeDialog())}
                        >
                            <FormattedMessage
                                id="collection.setting.fields.button.cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                        <Button
                            type='submit'
                        >
                            <FormattedMessage
                                id="collection.setting.fields.button.save"
                                defaultMessage="Save"
                            />
                        </Button>
                    </Stack>
                }
                </DialogActions>
            </form>
        </Dialog>
    )
}