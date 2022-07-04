import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    getLikes,
    modifyLike
} from '../../axios/likeAxios'
import {  
    GET_LIKES,
    MODIFY_LIKE
} from '../../axios/routes/routes'


export const getLikesAsync = createAsyncThunk(
    GET_LIKES.redux,
    (item, { rejectWithValue }) => {
        try {
            return getLikes(item._id)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const modifyLikeAsync = createAsyncThunk(
    MODIFY_LIKE.redux,
    (item, { rejectWithValue }) => {
        try {
            return modifyLike(item)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const likeSlice = createSlice({ 
    name: 'like',
    initialState: {
        likes: [],
        item: null
    }, 
    reducers: {
        
    },
    extraReducers: {
        [getLikesAsync.fulfilled]: (state, action) => {
            state.likes = action.payload.likes
            state.item = action.payload.item
        },
        [modifyLikeAsync.fulfilled]: (state, action) => {
            state.likes = action.payload
        }
    }
})

export const { 
    
} = likeSlice.actions

export default likeSlice.reducer