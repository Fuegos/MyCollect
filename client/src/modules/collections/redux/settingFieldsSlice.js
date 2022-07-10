import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import { 
    getTypeFields, 
    getSettingFields, 
    modifySettingFields
} from '../../../api/axios/collectionAxios'
import { 
    MODIFY_COLLECTION_SETTING_FIELDS,
    GET_COLLECTION_SETTING_FIELDS, 
    GET_TYPE_FIELDS
} from '../../../api/routes/nameRoutes'
import { closeDialog, openDialog } from '../../../components/dialogs/redux/dialogsSlice'
import { SETTING_FIELDS_DIALOG } from '../../../components/dialogs/data/dialogs'

export const getSettingFieldsAsync = createAsyncThunk(
    GET_COLLECTION_SETTING_FIELDS.redux,
    async (collectionId, thunkAPI) => {
        return await catchError(
            thunkAPI, 
            () => getSettingFields(collectionId),
            () => thunkAPI.dispatch(openDialog(SETTING_FIELDS_DIALOG))
        ) 
    }
)

export const getTypeFieldsAsync = createAsyncThunk(
    GET_TYPE_FIELDS.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => getTypeFields())
    }
)

export const modifySettingFieldsAsync = createAsyncThunk(
    MODIFY_COLLECTION_SETTING_FIELDS.redux,
    async ({ settingFields, collectionId }, thunkAPI) => {
        return await catchError(
            thunkAPI, 
            () => modifySettingFields(settingFields, collectionId),
            () => thunkAPI.dispatch(closeDialog(SETTING_FIELDS_DIALOG))
        )
    }
)

export const settingFieldsSlice = createSlice({ 
    name: 'settingFields',
    initialState: {
        isLoading: false,
        settingFields: [],
        typeFields: [],
        collectionId: null
    }, 
    extraReducers: {
        [getTypeFieldsAsync.fulfilled]: (state, action) => {
            state.typeFields = action.payload
        },
        [getSettingFieldsAsync.fulfilled]: (state, action) => {
            state.settingFields = action.payload.settingFields
            state.collectionId = action.payload.collectionId
        },
        [modifySettingFieldsAsync.fulfilled]: (state, action) => {
            state.isLoading = false
            state.settingFields = []
        },
        [modifySettingFieldsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [modifySettingFieldsAsync.rejected]: (state, action) => {
            state.isLoading = false
        }
    }
})


export default settingFieldsSlice.reducer