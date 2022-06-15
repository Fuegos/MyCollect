import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const registrationUserAsync = createAsyncThunk(
    'auth/user/registration',
    async (user, { rejectWithValue }) => {
        try {
            return await (await axios.post('/api/auth/registration', user)).data
        } catch(e) {
            return rejectWithValue({ message: e.response.data.message})
        }
    }
)

export const authUserSlice = createSlice({
    name: 'auth/user',
    initialState: {
        email: "",
        name: "",
        token: localStorage.getItem("token"),
        isAuth: false,
        errorMessage: "",
        isProccess: false
    }, 
    reducers: {
        clearErrorMessage: (state, action) => {
            state.errorMessage = ""
        }
    },
    extraReducers: {
        [registrationUserAsync.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.email = action.payload.email
            state.name = action.payload.name
            state.token = action.payload.token
            state.isAuth = true
            state.isProccess = false
        },
        [registrationUserAsync.rejected]: (state, action) => {
            state.errorMessage = action.payload.message
            state.isProccess = false
        },
        [registrationUserAsync.pending]: (state, action) => {
            state.isProccess = true
        }
    }
})

export const { clearErrorMessage } = authUserSlice.actions

export default authUserSlice.reducer