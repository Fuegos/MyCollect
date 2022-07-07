import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    changeUsersRole, 
    changeUsersStatus, 
    deleteUsers, 
    getUsers 
} from '../../axios/adminAxios'
import catchError from '../../axios/catchError'
import { 
    CHANGE_USERS_ROLE, 
    CHANGE_USERS_STATUS, 
    DELETE_USERS, 
    GET_USERS 
} from '../../axios/routes/routes'


export const getUsersAsync = createAsyncThunk(
    GET_USERS.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => getUsers())
    }
)

export const changeStatusUsersAsync = createAsyncThunk(
    CHANGE_USERS_STATUS.redux,
    async ({users, status}, thunkAPI) => {
        return await catchError(thunkAPI, () => changeUsersStatus(users, status))
    }
)

export const changeRoleUsersAsync = createAsyncThunk(
    CHANGE_USERS_ROLE.redux,
    async ({users, role}, thunkAPI) => {
        return await catchError(thunkAPI, () => changeUsersRole(users, role))
    }
)

export const deleteUsersAsync = createAsyncThunk(
    DELETE_USERS.redux,
    async (users, thunkAPI) => {
        return await catchError(thunkAPI, () => deleteUsers(users))
    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        isProccessUsers: false,
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
        }
    },
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            state.isProccessUsers = false
            state.users = action.payload
        },
        [getUsersAsync.rejected]: (state, action) => {
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
        },
        [deleteUsersAsync.pending]: (state, action) => {
            state.isProccessToolBar = true
        },
    }
})

export const { 
    addSelectedUser, 
    removeSelectedUser, 
    addAllSelectedUsers, 
    removeAllSelectedUsers, 
    clearErrorType 
} = adminSlice.actions

export default adminSlice.reducer