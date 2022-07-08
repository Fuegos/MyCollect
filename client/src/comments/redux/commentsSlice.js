import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { 
    addComment
} from '../../axios/commentAxios'
import {  
    ADD_COMMENT
} from '../../axios/routes/routes'


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
        comments: []
    }, 
    reducers: {
        getComment: (state, action) => {
            state.comments.push(action.payload)
        },
        setComments: (state, action) => {
            state.comments = action.payload
        }
    },
    extraReducers: {
        [addCommentAsync.rejected]: (state, action) => {
        }
    }
})

export const { 
    getComment,
    setComments
} = commentsSlice.actions

export default commentsSlice.reducer