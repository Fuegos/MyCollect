import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { 
    getTypeFields, 
    getSettingFields, 
    modifySettingFields
} from '../../axios/collectionAxios'
import { 
    MODIFY_COLLECTION_SETTING_FIELDS,
    GET_COLLECTION_SETTING_FIELDS, 
    GET_TYPE_FIELDS
} from '../../axios/routes/routes'

export const getSettingFieldsAsync = createAsyncThunk(
    GET_COLLECTION_SETTING_FIELDS.redux,
    async (collectionId, thunkAPI) => {
        return await catchError(thunkAPI, () => getSettingFields(collectionId))
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
        return await catchError(thunkAPI, () => modifySettingFields(settingFields, collectionId))
    }
)

export const settingFieldsSlice = createSlice({ 
    name: 'settingFields',
    initialState: {
        isProccess: false,
        isOpenedDialog: false,
        settingFields: [],
        typeFields: [],
        collectionId: null
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.isOpenedDialog = false
        }
    },
    extraReducers: {
        [getTypeFieldsAsync.fulfilled]: (state, action) => {
            state.typeFields = action.payload
        },
        [getTypeFieldsAsync.rejected]: (state, action) => {
        },
        [getSettingFieldsAsync.fulfilled]: (state, action) => {
            state.settingFields = action.payload.settingFields
            state.collectionId = action.payload.collectionId
            state.isOpenedDialog = true
        },
        [getSettingFieldsAsync.rejected]: (state, action) => {
        },
        [modifySettingFieldsAsync.fulfilled]: (state, action) => {
            state.isOpenedDialog = false
            state.isProccess = false
            state.settingFields = []
        },
        [modifySettingFieldsAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [modifySettingFieldsAsync.rejected]: (state, action) => {
            state.isProccess = false
        }
    }
})

export const { 
    openDialog, 
    closeDialog
} = settingFieldsSlice.actions

export default settingFieldsSlice.reducer