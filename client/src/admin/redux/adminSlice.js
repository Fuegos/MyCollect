import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const getUsersAsync = createAsyncThunk(
    'admin/users',
    async (_, { rejectWithValue }) => {
        try {
            return await (await axios.get('/api/admin/users')).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        isProccess: false,
        errorType: "",
        selectedUsers: []
    }, 
    reducers: {
        addSelectedUser: (state, action) => {
            state.selectedUsers.push(action.payload)
        },
        removeSelectedUser: (state, action) => {
            state.selectedUsers = state.selectedUsers.filter(u => u._id !== action.payload._id)
        },
        addAllSelectedUsers: (state, action) => {
            state.selectedUsers = state.users.map(u => u)
        },
        removeAllSelectedUsers: (state, action) => {
            state.selectedUsers = []
        }
    },
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.users = action.payload
        },
        [getUsersAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
            state.isProccess = false
        },
        [getUsersAsync.pending]: (state, action) => {
            state.isProccess = true
        }
    }
})

export const { addSelectedUser, removeSelectedUser, addAllSelectedUsers, removeAllSelectedUsers } = adminSlice.actions

export default adminSlice.reducer