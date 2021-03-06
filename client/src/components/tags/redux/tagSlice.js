import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import {  
    GET_TAGS
} from '../../../api/routes/nameRoutes'
import { getTags } from '../../../api/axios/itemAxios'


export const getTagsAsync = createAsyncThunk(
    GET_TAGS.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => getTags())
    }
)

export const tagsSlice = createSlice({ 
    name: 'tags',
    initialState: {
        isProccess: false,
        tags: []
    }, 
    reducers: {
        
    },
    extraReducers: {
        [getTagsAsync.fulfilled]: (state, action) => {
            state.tags = action.payload
            state.isProccess = false
        },
        [getTagsAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [getTagsAsync.rejected]: (state, action) => {
            state.isProccess = false
        }
    }
})

export const { 

} = tagsSlice.actions

export default tagsSlice.reducer