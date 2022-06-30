import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getThemes,   
    getCollections,
    modifyCollection,
    deleteCollection
} from '../../axios/collectionAxios'
import { 
    DELETE_COLLECTION, 
    GET_COLLECTIONS,  
    GET_THEMES, 
    MODIFY_COLLECTION
} from '../../axios/routes/routes'


export const modifyCollectionAsync = createAsyncThunk(
    MODIFY_COLLECTION.redux,
    ({_id, collection, newImg}, { rejectWithValue }) => {
        try {
            return modifyCollection(_id, collection, newImg)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const deleteCollectionAsync = createAsyncThunk(
    DELETE_COLLECTION.redux,
    (collection, { rejectWithValue }) => {
        try {
            return deleteCollection(collection)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getThemesAsync = createAsyncThunk(
    GET_THEMES.redux,
    (_, { rejectWithValue }) => {
        try {
            return getThemes()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getCollectionsAsync = createAsyncThunk(
    GET_COLLECTIONS.redux,
    (_, { rejectWithValue }) => {
        try {
            return getCollections()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const collectionsSlice = createSlice({ 
    name: 'collections',
    initialState: {
        errorType: "",
        collections: [],
        themes: [],
        isProccess: false,
        isOpenedDialog: false,
        editableCollection: null
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.editableCollection = null
            state.isOpenedDialog = false
        },
        setEditableCollection: (state, action) => {
            state.editableCollection = action.payload
        }
    },
    extraReducers: {
        [modifyCollectionAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.isOpenedDialog = false
            state.editableCollection = null
            const index = state.collections.map(c => c._id).indexOf(action.payload._id)
            if (index > -1) {
                state.collections.splice(index, 1, action.payload)
            } else {
                state.collections.push(action.payload)
            }
        },
        [modifyCollectionAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [modifyCollectionAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [deleteCollectionAsync.fulfilled]: (state, action) => {
            state.collections = state.collections.filter(c => c._id !== action.payload._id)
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        }
    }
})

export const { 
    openDialog, 
    closeDialog, 
    setEditableCollection
} = collectionsSlice.actions

export default collectionsSlice.reducer