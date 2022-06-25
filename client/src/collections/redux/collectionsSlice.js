import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const createCollectionAsync = createAsyncThunk(
    'collection/add',
    async ({collection, fileImg}, { rejectWithValue }) => {
        try {
            const tokenUpload = {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            }

            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }

            if(fileImg) {
                const uploadData = new FormData()
                uploadData.append("file", fileImg, "file")
                collection.img = await (await axios.post('/api/collection/upload/img', uploadData, tokenUpload)).data.img
            }
            
            return await (await axios.post('/api/collection/add', collection, token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getThemesAsync = createAsyncThunk(
    'collection/themes',
    async (_, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            return await (await axios.get('/api/collection/themes', token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const getCollectionsAsync = createAsyncThunk(
    'collection/get',
    async(_, { rejectWithValue }) => {
        try {
            const token = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
            return await (await axios.get('/api/collections', token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const collectionsSlice = createSlice({ 
    name: 'collections',
    initialState: {
        errorType: "",
        collections: [],
        themes: [],
        isProccess: false,
        isOpenedDialog: false
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.isOpenedDialog = false
        }
    },
    extraReducers: {
        [createCollectionAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.isOpenedDialog = false
            state.collections.push(action.payload)
        },
        [createCollectionAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [createCollectionAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        }
    }
})

export const { openDialog, closeDialog } = collectionsSlice.actions

export default collectionsSlice.reducer