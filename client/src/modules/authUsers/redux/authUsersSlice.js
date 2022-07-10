import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkUserToken, signInUser, signUpUser } from '../../../api/axios/authUserAxios'
import catchError from '../../../api/tools/catchError'
import { CHECK_USER_TOKEN, SIGN_IN_USER, SIGN_UP_USER } from '../../../api/routes/nameRoutes'


export const signUpUserAsync = createAsyncThunk(
    SIGN_UP_USER.redux,
    async (user, thunkAPI) => {
        return await catchError(thunkAPI, () => signUpUser(user))
    }
)

export const checkTokenUserAsync = createAsyncThunk(
    CHECK_USER_TOKEN.redux,
    async (_, thunkAPI) => {
        return await catchError(thunkAPI, () => checkUserToken())
    }
)

export const signInUserAsync = createAsyncThunk(
    SIGN_IN_USER.redux,
    async (user, thunkAPI) => {
        return await catchError(thunkAPI, async () => signInUser(user))
    }
)

export const authUserSlice = createSlice({
    name: 'auth/user',
    initialState: {
        _id: "",
        email: "",
        name: "",
        isAuth: false,
        isAdmin: false,
        isProccess: false
    }, 
    reducers: {
        signOutUser: (state, action) => {
            localStorage.removeItem("token")
            state.isAuth = false
            state._id = ""
            state.email = ""
            state.isAdmin = false
            state.name = ""
        }
    },
    extraReducers: {
        [signUpUserAsync.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
            state.isAuth = true
            state.isProccess = false
        },
        [signUpUserAsync.rejected]: (state, action) => {
            state.isProccess = false
        },
        [signUpUserAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [checkTokenUserAsync.fulfilled]: (state, action) => {
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
            state.isAuth = true
        },
        [signInUserAsync.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
            state.isAuth = true
            state.isProccess = false
        },
        [signInUserAsync.rejected]: (state, action) => {
            state.isProccess = false
        },
        [signInUserAsync.pending]: (state, action) => {
            state.isProccess = true
        }
    }
})

export const { signOutUser } = authUserSlice.actions

export default authUserSlice.reducer