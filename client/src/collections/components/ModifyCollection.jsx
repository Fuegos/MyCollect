import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Box, 
    Stack,
    LinearProgress
} from '@mui/material'
import TextFieldController from '../../components/TextFieldController'
import { FormattedMessage } from 'react-intl'
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, modifyCollectionAsync, getThemesAsync } from '../redux/collectionsSlice';
import { collectionYupResolver } from '../validation/collectionValidation';
import AutocompleteController from '../../components/AutocompleteController';
import { DropzoneAreaBase } from "mui-file-dropzone"
import { PhotoCamera } from '@mui/icons-material'


export default function ModifyCollection() {
    const { 
        handleSubmit, 
        control, 
        formState: { errors }, 
        setValue, 
        clearErrors 
    } = useForm({
        resolver: collectionYupResolver
    })
    const dispatch = useDispatch()
    const isOpenedDialog = useSelector(state => state.collections.isOpenedDialog)
    const isProccess = useSelector(state => state.collections.isProccess)
    const themes = useSelector(state => state.collections.themes)
    const editableCollection = useSelector(state => state.collections.editableCollection)

    const modifyCollection = data => {
        const newImg = data.img[0] && data.img[0].file
        const collection = {
            name: data.name,
            theme: data.theme,
            description: data.description,
            img: editableCollection && editableCollection.img
        }

        dispatch(modifyCollectionAsync({ _id: editableCollection && editableCollection._id, collection, newImg }))
    }

    useEffect(() => {
        dispatch(getThemesAsync())
    }, [])

    useEffect(() => {
        clearErrors()
        if(editableCollection) {
            setValue("name", editableCollection.name)
            setValue("theme", editableCollection.theme)
            setValue("description", editableCollection.description)
        } else {
            setValue("name", "")
            setValue("theme", null)
            setValue("description", "")
        }
        
        setValue("img", [])
    }, [editableCollection])

    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => dispatch(closeDialog())}
            fullWidth
        >
            <form onSubmit={handleSubmit(modifyCollection)} noValidate>
                <DialogTitle>
                    Add collection
                </DialogTitle>
                <DialogContent>
                    <Box mx={2} mt={2}>
                        <Stack 
                            direction="column"
                            spacing={2}
                        >
                            <TextFieldController 
                                name="name"
                                control={control}
                                error={errors.name}
                                label={
                                    <FormattedMessage
                                        id="collections.label.name"
                                        defaultMessage="Name"
                                    />
                                }
                                variant="outlined"
                                fullWidth
                            />
                            <AutocompleteController 
                                name="theme"
                                control={control}
                                options={themes}
                                getOptionLabel={o => o.title}
                                error={errors.theme}
                                label={
                                    <FormattedMessage
                                        id="collections.label.theme"
                                        defaultMessage="Theme"
                                    />
                                }
                                variant="outlined"
                            />
                            <TextFieldController 
                                name="description"
                                control={control}
                                error={errors.description}
                                label={
                                    <FormattedMessage
                                        id="collections.label.description"
                                        defaultMessage="Description"
                                    />
                                }
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                            />
                            <Controller 
                                name='img'
                                control={control}
                                render={({field}) =>
                                    <DropzoneAreaBase
                                        {...field}
                                        Icon={PhotoCamera}
                                        acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
                                        filesLimit={1}
                                        onAdd={file => field.onChange(file)}
                                        fileObjects={field.value}
                                        showAlerts={false}
                                        onDelete={() => field.onChange([])}
                                    /> 
                                }
                            />
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                {
                    isProccess ?
                    <Box sx={{ flex: '1 1 100%' }}>
                        <LinearProgress />
                    </Box> :
                    <Button 
                        type='submit'
                    >
                        <FormattedMessage
                            id="collections.button.confirm"
                            defaultMessage="Confirm"
                        />
                    </Button>
                }
                </DialogActions>
            </form>
        </Dialog>
    )
}