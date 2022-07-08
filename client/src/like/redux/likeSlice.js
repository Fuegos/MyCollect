import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { 
    modifyLike
} from '../../axios/likeAxios'
import {  
    MODIFY_LIKE
} from '../../axios/routes/routes'


export const modifyLikeAsync = createAsyncThunk(
    MODIFY_LIKE.redux,
    async (itemId, thunkAPI) => {
        return await catchError(thunkAPI, () => modifyLike(itemId))
    }
)


export const likeSlice = createSlice({ 
    name: 'like',
    initialState: {
        likes: []
    }, 
    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload
        }
    },
    extraReducers: {
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
    setLikes
} = likeSlice.actions

export default likeSlice.reducer