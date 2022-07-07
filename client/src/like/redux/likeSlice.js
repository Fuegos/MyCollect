import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
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
    async (itemId, thunkAPI) => {
        return await catchError(thunkAPI, () => getLikes(itemId))
    }
)

export const modifyLikeAsync = createAsyncThunk(
    MODIFY_LIKE.redux,
    async (itemId, thunkAPI) => {
        return await catchError(thunkAPI, () => modifyLike(itemId))
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
        },
        [modifyLikeAsync.fulfilled]: (state, action) => {
            if(state.likes.some(l => l._id === action.payload._id)) {
                state.likes = state.likes.filter(l => l._id !== action.payload._id)
            } else {
                state.likes.push(action.payload)
            }
        },
        [modifyLikeAsync.rejected]: (state, action) => {
        }
    }
})

export const { 
    
} = likeSlice.actions

export default likeSlice.reducer