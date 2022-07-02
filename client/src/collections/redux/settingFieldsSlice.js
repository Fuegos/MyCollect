import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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


export const getTypeFieldsAsync = createAsyncThunk(
    GET_TYPE_FIELDS.redux,
    async (_, { rejectWithValue }) => {
        try {
            return getTypeFields()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getSettingFieldsAsync = createAsyncThunk(
    GET_COLLECTION_SETTING_FIELDS.redux,
    async (collection, { rejectWithValue }) => {
        try {
            return getSettingFields(collection)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const modifySettingFieldsAsync = createAsyncThunk(
    MODIFY_COLLECTION_SETTING_FIELDS.redux,
    ({settingFields, collection},{ rejectWithValue }) => {
        try {
            return modifySettingFields(settingFields, collection)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const settingFieldsSlice = createSlice({ 
    name: 'settingFields',
    initialState: {
        errorType: "",
        isProccess: false,
        isOpenedDialog: false,
        settingFields: [],
        typeFields: [],
        collection: null
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
        [getSettingFieldsAsync.fulfilled]: (state, action) => {
            state.settingFields = action.payload.settingFields
            state.collection = action.payload.collection
            state.isOpenedDialog = true
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
            state.errorType = action.payload.type
        }
    }
})

export const { 
    openDialog, 
    closeDialog
} = settingFieldsSlice.actions

export default settingFieldsSlice.reducer