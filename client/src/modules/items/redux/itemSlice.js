import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../../api/tools/catchError'
import { getItem } from '../../../api/axios/itemAxios'
import { GET_ITEM } from '../../../api/routes/nameRoutes'
import { setComments } from '../../../modules/comments/redux/commentsSlice'
import { setLikes } from '../../../components/likes/redux/likeSlice'

export const getItemAsync = createAsyncThunk(
    GET_ITEM.redux,
    async (itemShortId, thunkAPI) => {
        const result = await catchError(
            thunkAPI, 
            () => getItem(itemShortId)
        )
        if(result.item){
            thunkAPI.dispatch(setLikes(result.likes))
            thunkAPI.dispatch(setComments(result.comments))
            return result.item
        } else {
            return result
        }   
    }
)

export const itemSlice = createSlice({ 
    name: 'item',
    initialState: {
        item: {},
        isLoading: false
    }, 
    reducers: {
        setItem: (state, action) => {
            state.item = action.payload
        },
        resetItem: (state, action) => {
            state.item = {}
        }
    },
    extraReducers: {
        [getItemAsync.fulfilled]: (state, action) => {
            state.item = action.payload
            state.isLoading = false
        },
        [getItemAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getItemAsync.rejected]: (state, action) => {
            state.isLoading = false
        }
    }
})

export const { 
    setItem,
    resetItem
} = itemSlice.actions

export default itemSlice.reducer