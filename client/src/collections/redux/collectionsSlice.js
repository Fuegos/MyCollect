import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
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
    async ({_id, collection, newImg}, thunkAPI) => {
        return await catchError(thunkAPI, () => modifyCollection(_id, collection, newImg))
    }
)

export const deleteCollectionAsync = createAsyncThunk(
    DELETE_COLLECTION.redux,
    async (collectionId, thunkAPI) => {
        return await catchError(thunkAPI, () => deleteCollection(collectionId))
    }
)

export const getThemesAsync = createAsyncThunk(
    GET_THEMES.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => getThemes())
    }
)

export const getCollectionsAsync = createAsyncThunk(
    GET_COLLECTIONS.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => getCollections())
    }
)

export const getCollectionsBiggestAsync = createAsyncThunk(
    GET_COLLECTIONS_BIGGEST.redux,
    async (limit, thunkAPI) => {
        return await catchError(thunkAPI, () => getCollectionsBiggest(limit))
    }
)


export const collectionsSlice = createSlice({ 
    name: 'collections',
    initialState: {
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
        },
        [deleteCollectionAsync.fulfilled]: (state, action) => {
            state.collections = state.collections.filter(c => c._id !== action.payload)
        },
        [deleteCollectionAsync.rejected]: (state, action) => {
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getThemesAsync.rejected]: (state, action) => {
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        },
        [getCollectionsAsync.rejected]: (state, action) => {
        },
        [getCollectionsBiggestAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        },
        [getCollectionsAsync.rejected]: (state, action) => {
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