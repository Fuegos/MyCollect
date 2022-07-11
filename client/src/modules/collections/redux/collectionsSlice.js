import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import { 
    getThemes,   
    getCollections,
    modifyCollection,
    deleteCollection,
    getCollectionsBiggest
} from '../../../api/axios/collectionAxios'
import { 
    DELETE_COLLECTION, 
    GET_COLLECTIONS,  
    GET_COLLECTIONS_BIGGEST,  
    GET_THEMES, 
    MODIFY_COLLECTION
} from '../../../api/routes/nameRoutes'
import { resetCollection } from './collectionSlice'
import { COLLECTION_DIALOG } from '../../../components/dialogs/data/dialogs'
import { closeDialog } from '../../../components/dialogs/redux/dialogsSlice'


export const modifyCollectionAsync = createAsyncThunk(
    MODIFY_COLLECTION.redux,
    async ({_id, collection, newImg}, thunkAPI) => {
        return await catchError(
            thunkAPI, 
            () => modifyCollection(_id, collection, newImg),
            () => {
                thunkAPI.dispatch(resetCollection())
                thunkAPI.dispatch(closeDialog(COLLECTION_DIALOG))
            }
        )
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
        return await catchError(
            thunkAPI, 
            () => getCollections(),
            () => thunkAPI.dispatch(resetCollection())
        )
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
        getIsLoading: false,
        modifyIsLoading: false
    }, 
    reducers: {
        resetCollections: (state, action) => {
            state.collections = []
        },
        willLoading: (state, action) => {
            state.getIsLoading = true
        }
    },
    extraReducers: {
        [modifyCollectionAsync.fulfilled]: (state, action) => {
            state.modifyIsLoading = false
            const index = state.collections.map(c => c._id).indexOf(action.payload._id)
            if (index > -1) {
                state.collections.splice(index, 1, action.payload)
            } else {
                state.collections.push(action.payload)
            }
        },
        [modifyCollectionAsync.pending]: (state, action) => {
            state.modifyIsLoading = true
        },
        [modifyCollectionAsync.rejected]: (state, action) => {
            state.modifyIsLoading = false
        },
        [deleteCollectionAsync.fulfilled]: (state, action) => {
            state.collections = state.collections.filter(c => c._id !== action.payload)
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
            state.getIsLoading = false
        },
        [getCollectionsAsync.rejected]: (state, action) => {
            state.getIsLoading = false
        },
        [getCollectionsAsync.pending]: (state, action) => {
            state.getIsLoading = true
        },
        [getCollectionsBiggestAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
            state.getIsLoading = false
        },
        [getCollectionsBiggestAsync.rejected]: (state, action) => {
            state.getIsLoading = false
        },
        [getCollectionsBiggestAsync.pending]: (state, action) => {
            state.getIsLoading = true
        }
    }
})

export const { 
    resetCollections,
    willLoading
} = collectionsSlice.actions

export default collectionsSlice.reducer