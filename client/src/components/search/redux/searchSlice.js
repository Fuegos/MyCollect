import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import { 
    search, searchByTag
} from '../../../api/axios/searchAxios'
import {  
    SEARCH, SEARCH_BY_TAG
} from '../../../api/routes/nameRoutes'


export const searchAsync = createAsyncThunk(
    SEARCH.redux,
    async (text, thunkAPI) => {
        return await catchError(thunkAPI, () => search(text))
    }
)

export const searchByTagAsync = createAsyncThunk(
    SEARCH_BY_TAG.redux,
    async (text, thunkAPI) => {
        return await catchError(thunkAPI, () => searchByTag(text))
    }
)

export const searchSlice = createSlice({ 
    name: 'search',
    initialState: {
        isLoading: false,
        result: [],
        text: ""
    }, 
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    },
    extraReducers: {
        [searchAsync.fulfilled]: (state, action) => {
            state.result = action.payload
            state.isLoading = false
        },
        [searchAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [searchAsync.rejected]: (state, action) => {
            state.isLoading = false
        },
        [searchByTagAsync.fulfilled]: (state, action) => {
            state.result = action.payload
            state.isLoading = false
        },
        [searchByTagAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [searchByTagAsync.rejected]: (state, action) => {
            state.isLoading = false
        }
    }
})

export const { 
    setText
} = searchSlice.actions

export default searchSlice.reducer