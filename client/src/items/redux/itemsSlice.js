import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getItems,
    modifyItem,
    getTags,
    deleteItems,
    getItemsLast
} from '../../axios/itemAxios'
import {  
    DELETE_COLLECTION_ITEMS,
    GET_COLLECTION_ITEMS, 
    GET_ITEMS_LAST, 
    GET_TAGS, 
    MODIFY_COLLECTION_ITEM
} from '../../axios/routes/routes'


export const getItemsAsync = createAsyncThunk(
    GET_COLLECTION_ITEMS.redux,
    async (collectionShortId, { rejectWithValue }) => {
        try {
            return await getItems(collectionShortId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getItemsLastAsync = createAsyncThunk(
    GET_ITEMS_LAST.redux,
    async (count, { rejectWithValue }) => {
        try {
            return await getItemsLast(count)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getTagsAsync = createAsyncThunk(
    GET_TAGS.redux,
    async (_, { rejectWithValue }) => {
        try {
            return await getTags()
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const modifyItemAsync = createAsyncThunk(
    MODIFY_COLLECTION_ITEM.redux,
    async (item, { rejectWithValue }) => {
        try {
            return await modifyItem(item)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const deleteItemsAsync = createAsyncThunk(
    DELETE_COLLECTION_ITEMS.redux,
    async (itemIds, { rejectWithValue }) => {
        try {
            return await deleteItems(itemIds)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const itemsSlice = createSlice({ 
    name: 'items',
    initialState: {
        errorType: "",
        items: [],
        isProccess: false,
        collection: {},
        settingFields: [],
        isOpenedDialog: false,
        editableItem: {},
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
        setEditableItem: (state, action) => {
            state.editableItem = action.payload
        },
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload
        }
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            state.items = action.payload.items
            state.collection = action.payload.collection
            state.settingFields= action.payload.collection.settingFields
            state.isProccess = false
        },
        [getItemsAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [getItemsAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [getItemsLastAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isProccess = false
        },
        [getItemsLastAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [getItemsLastAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [modifyItemAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.isOpenedDialog = false
            state.editableItem = {}
            const index = state.items.map(i => i._id).indexOf(action.payload._id)
            if (index > -1) {
                state.items.splice(index, 1, action.payload)
            } else {
                state.items.push(action.payload)
            }
        },
        [modifyItemAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [modifyItemAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [getTagsAsync.fulfilled]: (state, action) => {
            state.tags = action.payload
        },
        [getTagsAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        },
        [deleteItemsAsync.fulfilled]: (state, action) => {
            state.items = state.items.filter(i => !action.payload.includes(i._id))
        },
        [deleteItemsAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        }
    }
})

export const { 
    openDialog,
    closeDialog,
    setEditableItem,
    setSelectedItems
} = itemsSlice.actions

export default itemsSlice.reducer