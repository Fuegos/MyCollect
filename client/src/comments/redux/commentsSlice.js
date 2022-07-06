import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
    async (itemShortId, { rejectWithValue }) => {
        try {
            return await getComments(itemShortId)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const addCommentAsync = createAsyncThunk(
    ADD_COMMENT.redux,
    async (comment, { rejectWithValue }) => {
        try {
            return await addComment(comment)
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const commentsSlice = createSlice({ 
    name: 'comments',
    initialState: {
        errorType: "",
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
            state.errorType = action.payload.type
        },
        [getCommentsAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [addCommentAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
        }
    }
})

export const { 
    getComment
} = commentsSlice.actions

export default commentsSlice.reducer