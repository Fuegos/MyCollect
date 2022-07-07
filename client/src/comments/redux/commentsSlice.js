import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { 
    getComments,
    addComment
} from '../../axios/commentAxios'
import {  
    GET_COMMENTS,
    ADD_COMMENT
} from '../../axios/routes/routes'


export const getCommentsAsync = createAsyncThunk(
    GET_COMMENTS.redux,
    async (itemShortId, thunkAPI) => {
        return await catchError(thunkAPI, () => getComments(itemShortId))
    }
)

export const addCommentAsync = createAsyncThunk(
    ADD_COMMENT.redux,
    async (comment, thunkAPI) => {
        return await catchError(thunkAPI, () => addComment(comment))
    }
)

export const commentsSlice = createSlice({ 
    name: 'comments',
    initialState: {
        isProccess: false,
        comments: [],
        item: {}
    }, 
    reducers: {
        getComment: (state, action) => {
            state.comments.push(action.payload)
        }
    },
    extraReducers: {
        [getCommentsAsync.fulfilled]: (state, action) => {
            state.comments = action.payload.comments
            state.item = action.payload.item
            state.isProccess = false
        },
        [getCommentsAsync.rejected]: (state, action) => {
            state.isProccess = false
        },
        [getCommentsAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [addCommentAsync.rejected]: (state, action) => {
        }
    }
})

export const { 
    getComment
} = commentsSlice.actions

export default commentsSlice.reducer