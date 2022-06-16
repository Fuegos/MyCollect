import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const signUpUserAsync = createAsyncThunk(
    'auth/user/sign/up',
    async (user, { rejectWithValue }) => {
        try {
            return await (await axios.post('/api/auth/sign/up', user)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const checkTokenUserAsync = createAsyncThunk(
    'auth/user/token',
    async (_, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            return await (await axios.get('/api/auth/token', token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const signInUserAsync = createAsyncThunk(
    'auth/user/sign/in',
    async (user, { rejectWithValue }) => {
        try {
            return await (await axios.get('/api/auth/sign/in', {
                params: {
                    email: user.email,
                    password: user.password
                }
            })).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const authUserSlice = createSlice({
    name: 'auth/user',
    initialState: {
        email: "",
        name: "",
        isAuth: false,
        errorType: "",
        isProccess: false
    }, 
    reducers: {
        clearErrorType: (state, action) => {
            state.errorType = ""
        },
        signOutUser: (state, action) => {
            localStorage.removeItem("token")
            state.isAuth = false
        }
    },
    extraReducers: {
        [signUpUserAsync.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAuth = true
            state.isProccess = false
        },
        [signUpUserAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
            state.isProccess = false
        },
        [signUpUserAsync.pending]: (state, action) => {
            state.isProccess = true
        },

        [checkTokenUserAsync.fulfilled]: (state, action) => {
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAuth = true
        },

        [signInUserAsync.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAuth = true
            state.isProccess = false
        },
        [signInUserAsync.rejected]: (state, action) => {
            state.errorType = action.payload.type
            state.isProccess = false
        },
        [signInUserAsync.pending]: (state, action) => {
            state.isProccess = true
        }
    }
})

export const { clearErrorType, signOutUser } = authUserSlice.actions

export default authUserSlice.reducer