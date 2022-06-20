import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const getUsersAsync = createAsyncThunk(
    'admin/users',
    async (_, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            return await (await axios.get('/api/admin/users', token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const changeStatusUsersAsync = createAsyncThunk(
    'admin/users/change/status',
    async ({users, status}, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            await axios.put(`/api/admin/users/status/${status}`, users, token)
            return { users, status }
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const changeRoleUsersAsync = createAsyncThunk(
    'admin/users/change/role',
    async ({users, role}, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            await axios.put(`/api/admin/users/role/${role}`, users, token)
            return { users, role }
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const deleteUsersAsync = createAsyncThunk(
    'admin/users/delete',
    async (users, { rejectWithValue }) => {
        try {
            const headers = {
                    "x-access-token": localStorage.getItem("token")
            }
            await axios.delete(`/api/admin/users`, {data: users, headers})
            return users
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        isProccessUsers: false,
        errorType: "",
        selectedUsers: [],
        isProccessToolBar: false
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
        },
        clearErrorType: (state, action) => {
            state.errorType = ""
        }
    },
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            state.isProccessUsers = false
            state.users = action.payload
        },
        [getUsersAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
            state.isProccessUsers = false
        },
        [getUsersAsync.pending]: (state, action) => {
            state.isProccessUsers = true
        },
        [changeStatusUsersAsync.fulfilled]: (state, action) => {
            state.isProccessToolBar = false
            state.users = state.users.map(u => {
                if(action.payload.users.some(p => p._id === u._id)) {
                    u.status = action.payload.status
                }
                return u
            })
            state.selectedUsers = []
        },
        [changeStatusUsersAsync.rejected]: (state, action) => {
            state.isProccessToolBar = false
            state.errorType = action.payload.type
        },
        [changeStatusUsersAsync.pending]: (state, action) => {
            state.isProccessToolBar = true
        },
        [changeRoleUsersAsync.fulfilled]: (state, action) => {
            state.isProccessToolBar = false
            state.users = state.users.map(u => {
                if(action.payload.users.some(p => p._id === u._id)) {
                    u.role = action.payload.role
                }
                return u
            })
            state.selectedUsers = []
        },
        [changeRoleUsersAsync.rejected]: (state, action) => {
            state.isProccessToolBar = false
            state.errorType = action.payload.type
        },
        [changeRoleUsersAsync.pending]: (state, action) => {
            state.isProccessToolBar = true
        },
        [deleteUsersAsync.fulfilled]: (state, action) => {
            state.isProccessToolBar = false
            state.users = state.users.filter(
                u => action.payload.every(p => p._id !== u._id)
            )
            state.selectedUsers = []
        },
        [deleteUsersAsync.rejected]: (state, action) => {
            state.isProccessToolBar = false
            state.errorType = action.payload.type
        },
        [deleteUsersAsync.pending]: (state, action) => {
            state.isProccessToolBar = true
        },
    }
})

export const { addSelectedUser, removeSelectedUser, addAllSelectedUsers, removeAllSelectedUsers, clearErrorType } = adminSlice.actions

export default adminSlice.reducer