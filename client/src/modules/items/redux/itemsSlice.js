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
import { closeDialog } from '../../../components/dialogs/redux/dialogsSlice'
import { ITEM_DIALOG } from '../../../components/dialogs/data/dialogs'


export const getItemsAsync = createAsyncThunk(
    GET_COLLECTION_ITEMS.redux,
    async (collectionShortId, thunkAPI) => {
        const result = await catchError(thunkAPI, () => getItems(collectionShortId))
        if(result.items) {
            thunkAPI.dispatch(setCollection(result.collection))
            thunkAPI.dispatch(resetItem())
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
        return await catchError(
            thunkAPI, 
            () => modifyItem(item),
            () => {
                thunkAPI.dispatch(closeDialog(ITEM_DIALOG))
                thunkAPI.dispatch(resetItem())
            }
        )
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
        getIsLoading: false,
        modifyIsLoading: false,
        selectedItems: []
    }, 
    reducers: {
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload
        },
        resetItems: (state, action) => {
            state.items = []
        },
        willLoading: (state, action) => {
            state.getIsLoading = true
        }
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.getIsLoading = false
        },
        [getItemsAsync.rejected]: (state, action) => {
            state.getIsLoading = false
        },
        [getItemsAsync.pending]: (state, action) => {
            state.getIsLoading = true
        },
        [getItemsLastAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.getIsLoading = false
        },
        [getItemsLastAsync.pending]: (state, action) => {
            state.getIsLoading = true
        },
        [getItemsLastAsync.rejected]: (state, action) => {
            state.getIsLoading = false
        },
        [modifyItemAsync.fulfilled]: (state, action) => {
            state.modifyIsLoading = false
            const index = state.items.map(i => i._id).indexOf(action.payload._id)
            if (index > -1) {
                state.items.splice(index, 1, action.payload)
            } else {
                state.items.push(action.payload)
            }
        },
        [modifyItemAsync.rejected]: (state, action) => {
            state.modifyIsLoading = false
        },
        [modifyItemAsync.pending]: (state, action) => {
            state.modifyIsLoading = true
        },
        [deleteItemsAsync.fulfilled]: (state, action) => {
            state.items = state.items.filter(i => !action.payload.includes(i._id))
        }
    }
})

export const { 
    setSelectedItems,
    resetItems,
    willLoading
} = itemsSlice.actions

export default itemsSlice.reducer