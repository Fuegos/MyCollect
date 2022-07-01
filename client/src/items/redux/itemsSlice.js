import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getItems
} from '../../axios/itemAxios'
import {  
    GET_COLLECTION_ITEMS
} from '../../axios/routes/routes'


export const getItemsAsync = createAsyncThunk(
    GET_COLLECTION_ITEMS.redux,
    (collection, { rejectWithValue }) => {
        try {
            return getItems(collection._id)
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
        collection: null
    }, 
    reducers: {
        
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            state.items = action.payload.items
            state.collection = action.payload.collection
            state.isProccess = false
        },
        [getItemsAsync.rejected]: (state, action) => {
            state.isProccess = false
        },
        [getItemsAsync.pending]: (state, action) => {
            state.isProccess = true
        }
    }
})

export const { 
    
} = itemsSlice.actions

export default itemsSlice.reducer