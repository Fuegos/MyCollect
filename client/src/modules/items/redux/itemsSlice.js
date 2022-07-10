import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import { 
    getItems,
    modifyItem,
    deleteItems,
    getItemsLast
} from '../../../api/axios/itemAxios'
import {  
    DELETE_COLLECTION_ITEMS,
    GET_COLLECTION_ITEMS, 
    GET_ITEMS_LAST, 
    MODIFY_COLLECTION_ITEM
} from '../../../api/routes/nameRoutes'
import { setCollection } from '../../collections/redux/collectionSlice'
import { resetItem } from './itemSlice'


export const getItemsAsync = createAsyncThunk(
    GET_COLLECTION_ITEMS.redux,
    async (collectionShortId, thunkAPI) => {
        const result = await catchError(thunkAPI, () => getItems(collectionShortId))
        if(result.items) {
            thunkAPI.dispatch(setCollection(result.collection))
            return result.items
        } else {
            return result
        }
        
    }
)

export const getItemsLastAsync = createAsyncThunk(
    GET_ITEMS_LAST.redux,
    async (limit, thunkAPI) => {
        return await catchError(thunkAPI, () => getItemsLast(limit))
    }
)

export const modifyItemAsync = createAsyncThunk(
    MODIFY_COLLECTION_ITEM.redux,
    async (item, thunkAPI) => {
        const result = await catchError(thunkAPI, () => modifyItem(item))
        if(result.payload) {
            thunkAPI.dispatch(resetItem())
        }
        return result
    }
)

export const deleteItemsAsync = createAsyncThunk(
    DELETE_COLLECTION_ITEMS.redux,
    async (itemIds, thunkAPI) => {
        return await catchError(thunkAPI, () => deleteItems(itemIds))
    }
)


export const itemsSlice = createSlice({ 
    name: 'items',
    initialState: {
        items: [],
        isLoading: false,
        isOpenedDialog: false,
        selectedItems: []
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.editableItem = {}
            state.isOpenedDialog = false
        },
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload
        },
        resetItems: (state, action) => {
            state.items = []
        },
        willLoading: (state, action) => {
            state.isLoading = true
        }
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getItemsAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [getItemsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getItemsLastAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getItemsLastAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getItemsLastAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [modifyItemAsync.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isOpenedDialog = false
            const index = state.items.map(i => i._id).indexOf(action.payload._id)
            if (index > -1) {
                state.items.splice(index, 1, action.payload)
            } else {
                state.items.push(action.payload)
            }
        },
        [modifyItemAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [modifyItemAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteItemsAsync.fulfilled]: (state, action) => {
            state.items = state.items.filter(i => !action.payload.includes(i._id))
        },
        [deleteItemsAsync.rejected]: (state, action) => {
        }
    }
})

export const { 
    openDialog,
    closeDialog,
    setSelectedItems,
    resetItems,
    willLoading
} = itemsSlice.actions

export default itemsSlice.reducer