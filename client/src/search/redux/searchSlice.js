import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { 
    search
} from '../../axios/searchAxios'
import {  
    SEARCH
} from '../../axios/routes/routes'


export const searchAsync = createAsyncThunk(
    SEARCH.redux,
    async (text, thunkAPI) => {
        return await catchError(thunkAPI, () => search(text))
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
        }
    }
})

export const { 
    setText
} = searchSlice.actions

export default searchSlice.reducer