import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, modifyCollectionAsync, getThemesAsync } from '../redux/collectionsSlice'
import { collectionYupResolver } from '../validation/collectionValidation'
import AutocompleteController from '../../components/AutocompleteController'
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
    const isLoading = useSelector(state => state.collections.isLoading)
    const themes = useSelector(state => state.collections.themes)
    const collection = useSelector(state => state.collection.collection)

    const modifyCollection = data => {
        const newImg = data.img[0] && data.img[0].file
        const newCollection = {
            name: data.name,
            theme: data.theme,
            description: data.description,
            img: collection.img
        }

        dispatch(
            modifyCollectionAsync(
                { _id: collection._id, collection: newCollection, newImg }
            )
        )
    }

    useEffect(() => {
        dispatch(getThemesAsync())
    }, [])

    useEffect(() => {
        clearErrors()
        if(collection._id) {
            setValue("name", collection.name)
            setValue("theme", collection.theme)
            setValue("description", collection.description)
            setValue("owner", collection.owner)
        } else {
            setValue("name", "")
            setValue("theme", null)
            setValue("description", "")
        }
        
        setValue("img", [])
    }, [collection])

    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => dispatch(closeDialog())}
            fullWidth
        >
            <form onSubmit={handleSubmit(modifyCollection)} noValidate>
                <DialogTitle>
                    <FormattedMessage
                        id="collection.modify.header"
                        defaultMessage="Modify Collection"
                    />
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
                                        id="collection.modify.label.name"
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
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                label={
                                    <FormattedMessage
                                        id="collection.modify.label.theme"
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
                                        id="collection.modify.label.description"
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
                    isLoading ?
                    <Box sx={{ flex: '1 1 100%' }}>
                        <LinearProgress />
                    </Box> :
                    <Button 
                        type='submit'
                    >
                        <FormattedMessage
                            id="collection.modify.button.confirm"
                            defaultMessage="Confirm"
                        />
                    </Button>
                }
                </DialogActions>
            </form>
        </Dialog>
    )
}