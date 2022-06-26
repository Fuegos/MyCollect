import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const modifyCollectionAsync = createAsyncThunk(
    'collection/modify',
    async ({_id, collection, newImg}, { rejectWithValue }) => {
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

            const headers = {
                "x-access-token": localStorage.getItem("token")
            }

            if(newImg) {
                if(collection.img) {
                    await axios.delete('/api/collection/delete/img', {data: collection.img, headers})
                }
                const uploadData = new FormData()
                uploadData.append("file", newImg, "file")
                collection.img = await (await axios.post('/api/collection/upload/img', uploadData, tokenUpload)).data
            }
            
            return await (await axios.post('/api/collection/modify', {_id, collection}, token)).data
        } catch(e) {
            return rejectWithValue({ type: e.response.data.type})
        }
    }
)

export const deleteCollectionAsync = createAsyncThunk(
    'collection/delete',
    async(collection, { rejectWithValue }) => {
        try {
            const headers = {
                "x-access-token": localStorage.getItem("token")
            }
            await axios.delete('/api/collection/delete', { data: collection, headers})
            return collection
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
        isOpenedDialog: false,
        editableCollection: null
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.isOpenedDialog = true
        },
        closeDialog: (state, action) => {
            state.editableCollection = null
            state.isOpenedDialog = false
        },
        setEditableCollection: (state, action) => {
            state.editableCollection = action.payload
        }
    },
    extraReducers: {
        [modifyCollectionAsync.fulfilled]: (state, action) => {
            state.isProccess = false
            state.isOpenedDialog = false
            state.editableCollection = null
            const index = state.collections.map(c => c._id).indexOf(action.payload._id)
            if (index > -1) {
                state.collections.splice(index, 1, action.payload)
            } else {
                state.collections.push(action.payload)
            }
        },
        [modifyCollectionAsync.pending]: (state, action) => {
            state.isProccess = true
        },
        [modifyCollectionAsync.rejected]: (state, action) => {
            state.isProccess = false
            state.errorType = action.payload.type
        },
        [deleteCollectionAsync.fulfilled]: (state, action) => {
            state.collections = state.collections.filter(c => c._id !== action.payload._id)
        },
        [getThemesAsync.fulfilled]: (state, action) => {
            state.themes = action.payload
        },
        [getCollectionsAsync.fulfilled]: (state, action) => {
            state.collections = action.payload
        }
    }
})

export const { openDialog, closeDialog, setEditableCollection } = collectionsSlice.actions

export default collectionsSlice.reducer