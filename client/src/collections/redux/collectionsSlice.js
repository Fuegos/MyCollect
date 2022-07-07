import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getThemes,   
    getCollections,
    modifyCollection,
    deleteCollection,
    getCollectionsBiggest
} from '../../axios/collectionAxios'
import { 
    DELETE_COLLECTION, 
    GET_COLLECTIONS,  
    GET_COLLECTIONS_BIGGEST,  
    GET_THEMES, 
    MODIFY_COLLECTION
} from '../../axios/routes/routes'


export const modifyCollectionAsync = createAsyncThunk(
    MODIFY_COLLECTION.redux,
    async ({_id, collection, newImg}, { rejectWithValue }) => {
        try {
            return await modifyCollection(_id, collection, newImg)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const deleteCollectionAsync = createAsyncThunk(
    DELETE_COLLECTION.redux,
    async (collectionId, { rejectWithValue }) => {
        try {
            return await deleteCollection(collectionId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getThemesAsync = createAsyncThunk(
    GET_THEMES.redux,
    async (_, { rejectWithValue }) => {
        try {
            return await getThemes()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getCollectionsAsync = createAsyncThunk(
    GET_COLLECTIONS.redux,
    async (_, { rejectWithValue }) => {
        try {
            return await getCollections()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getCollectionsBiggestAsync = createAsyncThunk(
    GET_COLLECTIONS_BIGGEST.redux,
    async (limit, { rejectWithValue }) => {
        try {
            return await getCollectionsBiggest(limit)
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
        editableCollection: {}
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.editableCollection = {}
            state.isOpenedDialog = false
        },
        setEditableCollection: (state, action) => {
            state.editableCollection = action.payload
        },
        resetCollections: (state, action) => {
            state.collections = []
        }
    },
    extraReducers: {
        [modifyCollectionAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.isOpenedDialog = false
            state.editableCollection = {}
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
            state.collections = state.collections.filter(c => c._id !== action.payload)
        },
        [deleteCollectionAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getThemesAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        },
        [getCollectionsAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        },
        [getCollectionsBiggestAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        },
        [getCollectionsAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        }
    }
})

export const { 
    openDialog, 
    closeDialog, 
    setEditableCollection,
    resetCollections
} = collectionsSlice.actions

export default collectionsSlice.reducer