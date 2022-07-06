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
    async (itemId, { rejectWithValue }) => {
        try {
            return await getLikes(itemId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const modifyLikeAsync = createAsyncThunk(
    MODIFY_LIKE.redux,
    async (itemId, { rejectWithValue }) => {
        try {
            return await modifyLike(itemId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const likeSlice = createSlice({ 
    name: 'like',
    initialState: {
        likes: [],
        item: {}
    }, 
    reducers: {
        
    },
    extraReducers: {
        [getLikesAsync.fulfilled]: (state, action) => {
            state.likes = action.payload.likes
            state.item = action.payload.item
        },
        [getLikesAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        },
        [modifyLikeAsync.fulfilled]: (state, action) => {
            if(state.likes.some(l => l._id === action.payload._id)) {
                state.likes = state.likes.filter(l => l._id !== action.payload._id)
            } else {
                state.likes.push(action.payload)
            }
        },
        [modifyLikeAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        }
    }
})

export const { 
    
} = likeSlice.actions

export default likeSlice.reducer