import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getTags
} from '../../axios/itemAxios'
import {  
    GET_TAGS
} from '../../axios/routes/routes'


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

export const tagsSlice = createSlice({ 
    name: 'tags',
    initialState: {
        errorType: "",
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
            state.errorType = action.payload.type
            state.isProccess = false
        }
    }
})

export const { 

} = tagsSlice.actions

export default tagsSlice.reducer