import React, { useEffect } from 'react'
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Box, 
    Stack,
    LinearProgress,
    Chip
} from '@mui/material'
import { FormattedMessage } from 'react-intl'
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, modifyItemAsync } from '../redux/itemsSlice'
import TextFieldController from '../../components/TextFieldController'
import AutocompleteController from '../../components/AutocompleteController'
import ItemField from './ItemField'
import { itemYupResolver } from '../validation/itemValidation'
import { getTagsAsync } from '../../tag/redux/tagSlice'


export default function ModifyItem() {
    const { 
        handleSubmit, 
        control, 
        formState: { errors }, 
        setValue, 
        clearErrors 
    } = useForm({
        resolver: itemYupResolver
    })

    const { fields } = useFieldArray({
        control,
        name: "fields"
    })

    const dispatch = useDispatch()
    const isOpenedDialog = useSelector(state => state.items.isOpenedDialog)
    const isProccess = useSelector(state => state.items.isProccess)
    const editableItem = useSelector(state => state.items.editableItem)
    const tags = useSelector(state => state.tags.tags)
    const settingFields = useSelector(state => state.items.settingFields)
    const collection = useSelector(state => state.items.collection)

    const modifyItem = data => {
        data.fields = data.fields.filter(f => f.value !== '' && f.value !== undefined && f.value !== null)
        console.log(data)
        dispatch(modifyItemAsync(data, collection._id))
    }

    useEffect(() => {
        dispatch(getTagsAsync())
    }, [])

    useEffect(() => {
        clearErrors()
        if(editableItem._id) {
            setValue("_id", editableItem._id)
            setValue("name", editableItem.name)
            setValue("tags", editableItem.tags)
            setValue("collectionRef", editableItem.collectionRef)
            
            setValue('fields', settingFields.map(f => {                
                const field = editableItem.fields.filter(ef => ef.settingField._id === f._id)[0]
                return {
                    value: field && field.value, 
                    settingField: f
                }
            }))
        } else {
            setValue("name", "")
            setValue("tags", [])
            setValue("collectionRef", collection)
            setValue('fields', settingFields.map(f => {return {value: undefined, settingField: f}}))
        }
        
    }, [editableItem])

    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => dispatch(closeDialog())}
            fullWidth
        >
            <form onSubmit={handleSubmit(modifyItem)} noValidate>
                <DialogTitle>
                    <FormattedMessage
                        id="collection.item.modify.header"
                        defaultMessage="Modify Item"
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
                                        id="collection.item.modify.label.name"
                                        defaultMessage="Name"
                                    />
                                }
                                variant="outlined"
                                fullWidth
                            />
                            <AutocompleteController 
                                name="tags"
                                control={control}
                                options={tags}
                                getOptionLabel={o => o.name}
                                error={errors.tags}
                                label={
                                    <FormattedMessage
                                        id="collection.item.modify.label.tags"
                                        defaultMessage="Tags"
                                    />
                                }
                                variant="outlined"
                                multiple={true}
                                freeSolo={true}
                                filterSelectedOptions={true}
                                limitTags={4}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip 
                                            variant="outlined" 
                                            label={option.name || option} 
                                            {...getTagProps({ index })} 
                                        />
                                    ))
                                }
                            />
                            {
                                fields.map((f, index) => 
                                    <ItemField 
                                        key={f.settingField._id} 
                                        index={index}
                                        control={control} 
                                        field={f} 
                                    />
                                )
                            }
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
                            id="collection.item.modify.button.confirm"
                            defaultMessage="Confirm"
                        />
                    </Button>
                }
                </DialogActions>
            </form>
        </Dialog>
    )
}