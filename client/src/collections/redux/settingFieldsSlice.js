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

export const getSettingFieldsAsync = createAsyncThunk(
    GET_COLLECTION_SETTING_FIELDS.redux,
    async (collectionId, { rejectWithValue }) => {
        try {
            return await getSettingFields(collectionId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getTypeFieldsAsync = createAsyncThunk(
    GET_TYPE_FIELDS.redux,
    async (_, { rejectWithValue }) => {
        try {
            return await getTypeFields()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const modifySettingFieldsAsync = createAsyncThunk(
    MODIFY_COLLECTION_SETTING_FIELDS.redux,
    async ({settingFields, collectionId},{ rejectWithValue }) => {
        try {
            return await modifySettingFields(settingFields, collectionId)
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
            state.errorType = action.payload.type
        },
        [getSettingFieldsAsync.fulfilled]: (state, action) => {
            state.settingFields = action.payload.settingFields
            state.collectionId = action.payload.collectionId
            state.isOpenedDialog = true
        },
        [getSettingFieldsAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
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