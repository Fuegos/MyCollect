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
import { resetCollection } from './collectionSlice'


export const modifyCollectionAsync = createAsyncThunk(
    MODIFY_COLLECTION.redux,
    async ({_id, collection, newImg}, thunkAPI) => {
        const result = await catchError(thunkAPI, () => modifyCollection(_id, collection, newImg))
        thunkAPI.dispatch(resetCollection())
        return result
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
        isLoading: false,
        isOpenedDialog: false
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.editableCollection = {}
            state.isOpenedDialog = false
        },
        resetCollections: (state, action) => {
            state.collections = []
        },
        willLoading: (state, action) => {
            state.isLoading = true
        }
    },
    extraReducers: {
        [modifyCollectionAsync.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isOpenedDialog = false
            const index = state.collections.map(c => c._id).indexOf(action.payload._id)
            if (index > -1) {
                state.collections.splice(index, 1, action.payload)
            } else {
                state.collections.push(action.payload)
            }
        },
        [modifyCollectionAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [modifyCollectionAsync.rejected]: (state, action) => {
            state.isLoading = false
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
            state.isLoading = false
        },
        [getCollectionsAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getCollectionsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getCollectionsBiggestAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
            state.isLoading = false
        },
        [getCollectionsBiggestAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getCollectionsBiggestAsync.pending]: (state, action) => {
            state.isLoading = true
        }
    }
})

export const { 
    openDialog, 
    closeDialog, 
    resetCollections,
    willLoading
} = collectionsSlice.actions

export default collectionsSlice.reducer