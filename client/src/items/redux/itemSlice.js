import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from '../../axios/catchError'
import { getItem } from '../../axios/itemAxios'
import { GET_ITEM } from '../../axios/routes/routes'
import { setComments } from '../../comments/redux/commentsSlice'
import { setLikes } from '../../like/redux/likeSlice'

export const getItemAsync = createAsyncThunk(
    GET_ITEM.redux,
    async (itemShortId, thunkAPI) => {
        const result = await catchError(thunkAPI, () => getItem(itemShortId))
        thunkAPI.dispatch(setLikes(result.likes))
        thunkAPI.dispatch(setComments(result.comments))
        return result.item
    }
)

export const itemSlice = createSlice({ 
    name: 'item',
    initialState: {
        item: {}
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
        },
    }
})

export const { 
    setItem,
    resetItem
} = itemSlice.actions

export default itemSlice.reducer