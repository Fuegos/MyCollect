import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Grid, Autocomplete, TextField } from '@mui/material'
import TextFieldController from '../../components/TextFieldController'
import { FormattedMessage } from 'react-intl'
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, createCollectionAsync, getThemesAsync } from '../redux/collectionsSlice';
import { collectionYupResolver } from '../validation/collectionValidation';
import AutocompleteController from '../../components/AutocompleteController';


export default function ModifyCollection() {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: collectionYupResolver
    })
    const dispatch = useDispatch()
    const isOpenedDialog = useSelector(state => state.collections.isOpenedDialog)
    const themes = useSelector(state => state.collections.themes)
    const defaultValues = {
        name: "",
        description: "",
        theme: ""
    }

    const modifyCollection = data => {
        console.log(data)
        dispatch(createCollectionAsync(data))
    }

    useEffect(() => {
        dispatch(getThemesAsync())
    }, [])

    return (
        
            <Dialog open={isOpenedDialog} onClose={() => dispatch(closeDialog())}>
            <form onSubmit={handleSubmit(modifyCollection)} noValidate>
                <DialogTitle>
                    Add collection
                </DialogTitle>
                <DialogContent>
                    <Box mx={10} mt={5}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                                <TextFieldController 
                                    name="name"
                                    control={control}
                                    defaultValue={defaultValues.name}
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
                            </Grid>
                            <Grid item xs={12}>
                                <AutocompleteController 
                                    name="theme"
                                    control={control}
                                    options={themes}
                                    getOptionLabel={o => o.name}
                                    error={errors.theme}
                                    label={
                                        <FormattedMessage
                                            id="collections.label.theme"
                                            defaultMessage="Theme"
                                        />
                                    }
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldController 
                                    name="description"
                                    control={control}
                                    defaultValue={defaultValues.description}
                                    error={errors.description}
                                    label={
                                        <FormattedMessage
                                            id="collections.label.description"
                                            defaultMessage="Description"
                                        />
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        type='submit'
                        onClick={() => dispatch(closeDialog())}
                    >
                        <FormattedMessage
                            id="collections.button.confirm"
                            defaultMessage="Confirm"
                        />
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        
    )
}