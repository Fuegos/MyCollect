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
import { useForm, useFieldArray } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { modifyItemAsync } from '../redux/itemsSlice'
import TextFieldController from '../../../components/controllers/TextFieldController'
import AutocompleteController from '../../../components/controllers/AutocompleteController'
import ItemField from './ItemField'
import { itemYupResolver } from '../validation/itemValidation'
import { getTagsAsync } from '../../../components/tags/redux/tagSlice'
import { ITEM_DIALOG } from '../../../components/dialogs/data/dialogs'
import { closeDialog } from '../../../components/dialogs/redux/dialogsSlice'
import { resetItem } from '../redux/itemSlice'


export default function ModifyItem() {
    const { 
        handleSubmit, 
        control, 
        formState: { errors }, 
        setValue, 
        clearErrors,
        reset 
    } = useForm({
        resolver: itemYupResolver
    })

    const { fields } = useFieldArray({
        control,
        name: "fields"
    })

    const dispatch = useDispatch()
    const isOpenedDialog = useSelector(state => state.dialogs.dialogs.includes(ITEM_DIALOG))
    const isLoading = useSelector(state => state.items.modifyIsLoading)
    const item = useSelector(state => state.item.item)
    const tags = useSelector(state => state.tags.tags)
    const settingFields = useSelector(state => state.collection.collection.settingFields)
    const collection = useSelector(state => state.collection.collection)

    const modifyItem = data => {
        data.fields = data.fields.filter(f => f.value !== '' && f.value !== undefined && f.value !== null)
        dispatch(modifyItemAsync(data, collection._id))
    }

    useEffect(() => {
        dispatch(getTagsAsync())
    }, [])

    useEffect(() => {
        clearErrors()
        if(item._id) {
            setValue("_id", item._id)
            setValue("name", item.name)
            setValue("tags", item.tags)
            setValue("collectionRef", item.collectionRef)
            setValue("owner", item.owner)
            
            setValue('fields', settingFields.map(f => {                
                const field = item.fields.filter(ef => ef.settingField._id === f._id)[0]
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
        
    }, [item])

    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => {
                dispatch(closeDialog(ITEM_DIALOG))
                dispatch(resetItem())
            }}
            fullWidth
        >
            <form onSubmit={handleSubmit(modifyItem)} noValidate>
                <DialogTitle>
                    <FormattedMessage
                        id="item.modify.header"
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
                                        id="item.modify.label.name"
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
                                        id="item.modify.label.tags"
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
                    isLoading ?
                    <Box sx={{ flex: '1 1 100%' }}>
                        <LinearProgress />
                    </Box> :
                    <Button 
                        type='submit'
                    >
                        <FormattedMessage
                            id="item.modify.button.confirm"
                            defaultMessage="Confirm"
                        />
                    </Button>
                }
                </DialogActions>
            </form>
        </Dialog>
    )
}